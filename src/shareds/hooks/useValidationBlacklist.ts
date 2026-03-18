/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
  UseFormTrigger,
  UseFormGetValues,
  FieldPath,
  FieldErrors,
  Path,
} from 'react-hook-form';

// eslint-disable-next-line import/no-cycle

import { BLACK_LIST_ERROR, CHECK_ERROR_DELAY, INITIAL_BLACK_LIST_ERROR } from '@/shareds/constants/blackList';
import useDebouncedCallback from '@/shareds/hooks/useDebounceCallback';
import { blackListService } from '@/redux/services/blackListService';
// import { blackListService } from '@/redux/services/blackListService';
// TODO добавить ручку блжклиста
// import { blacklistApi } from '@/api';

export function getCheckFormErrorsFn<TFieldValues extends FieldValues = FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  clearErrors: UseFormClearErrors<TFieldValues>,
) {
  return async (data: { value: string, name: keyof TFieldValues }[], checkInBlackList: any) => {
    const fields = data
      .filter(({ value }) => !!value)
      .map(({ value, name }) => ({ value, key: name as string }));

    if (!fields.length) {
      // убираем ошибки блеклиста, если поле пустое
      clearErrors(data.map(({ name }) => name) as Path<TFieldValues>[]);

      return null;
    }

    const { words: forbiddenWords } = await checkInBlackList({ fields }).unwrap();

    const errors = Object.assign({}, ...await Promise.all(Object.keys(forbiddenWords).map(
      async (name) => {
        if (forbiddenWords[name]?.value?.length) {
          await setError(
            name as FieldPath<TFieldValues>,
            {
              type: INITIAL_BLACK_LIST_ERROR,
              message: JSON.stringify(forbiddenWords[name].value),
            },
          );

          return { [name]: forbiddenWords[name].value };
        }

        return {};
      },
    ))) as Record<keyof TFieldValues, string[]>;

    if (Object.keys(errors).length) {
      return errors;
    }

    clearErrors(data.map(({ name }) => name) as Path<TFieldValues>[]);

    return null;
  };
}

type ValidationBlacklistParams<TFieldValues extends FieldValues> = {
  fieldNames: Array<keyof TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  getValues: UseFormGetValues<TFieldValues>;
};

type ReqItem = {
  cb: Promise<any>;
  val: string | null
};

type ReqRef<TFieldValues> = Record<keyof TFieldValues, ReqItem>;

export function useValidationBlacklist<TFieldValues extends FieldValues = FieldValues>({
  fieldNames = [],
  setError,
  clearErrors,
  errors,
  trigger,
  getValues,
}: ValidationBlacklistParams<TFieldValues>) {
  const [checkInBlackList] = blackListService.useLazyCheckInBlackListQuery();
  const reqRef = useRef<ReqRef<TFieldValues>>({} as ReqRef<TFieldValues>);
  const [loadingSubmit, setLoading] = useState<boolean>(false);
  const checkErrors = useMemo(
    () => getCheckFormErrorsFn(setError, clearErrors),
    [clearErrors, setError],
  );

  const checkError = useCallback(
    async (name: string, value: string) => {
      setLoading(true);
      await checkErrors([{ name, value }], checkInBlackList).finally(() => setLoading(false));
    },
    [checkErrors, checkInBlackList],
  );

  const handleChangeDebounce = useDebouncedCallback((event: any) => {
    const { value, name } = event.target;
    if (fieldNames.includes(name)) {
      reqRef.current = {
        ...reqRef.current,
        [name]: { val: value, cb: checkError(name, value) },
      };
    }
  }, CHECK_ERROR_DELAY);

  const handleChange = useCallback(
    (event: any) => {
      setLoading(true);
      const { name } = event.target;
      if (!fieldNames.includes(name)) {
        clearErrors(name);
      }
      handleChangeDebounce(event);
    },
    [clearErrors, JSON.stringify(fieldNames), handleChangeDebounce],
  );

  function handleSubmit <TRes>(
    fc: (val: TFieldValues) => Promise<TRes>,
    ignoreBaseValidation = false,
  ) {
    return async (event: any) => {
      event?.preventDefault();
      setLoading(true);
      try {
        handleChangeDebounce.cancel();
        const localErrors = await Promise.all(fieldNames.map(
          (name) => (reqRef.current ? reqRef.current[name].cb : () => null),
        ));
        const values = getValues();
        const localNormalizeErrors = localErrors.reduce((res, curr) => {
          if (!curr) {
            return res;
          }
          const [name] = Object.keys(curr);
          const [value] = Object.values(curr);

          return { ...res, [name]: value };
        }, {});

        let hasBaseValidationErrors = false;

        if (ignoreBaseValidation) {
          Object.keys(localNormalizeErrors).forEach((fieldName) => setError(
            fieldName as FieldPath<TFieldValues>,
            {
              type: BLACK_LIST_ERROR,
              message: JSON.stringify(localNormalizeErrors[fieldName]),
            },
          ));
        } else {
          hasBaseValidationErrors = (
            await Promise.all(Object.keys(values).map((fieldName) => {
              if (localNormalizeErrors[fieldName]) {
                setError(
                  fieldName as FieldPath<TFieldValues>,
                  {
                    type: BLACK_LIST_ERROR,
                    message: JSON.stringify(localNormalizeErrors[fieldName]),
                  },
                );

                return Promise.resolve(true);
              }

              // Promise<false> === (Error)
              return trigger(fieldName as FieldPath<TFieldValues>);
            }))).some((it) => !it);
        }

        if (Object.keys(localNormalizeErrors).length || hasBaseValidationErrors) {
          return;
        }

        await fc(values);
      } finally {
        setLoading(false);
      }
    };
  }

  const handleBlur = useCallback((event: any) => {
    handleChangeDebounce.cancel();
    const { value, name } = event.target;
    // при блюре в реф записываются только значения не прошедшие проверку
    if (fieldNames.includes(name) && reqRef.current[name].val !== value) {
      reqRef.current = {
        ...reqRef.current,
        [name]: { val: value, cb: checkError(name, value) },
      };
    }
  }, [checkError, JSON.stringify(fieldNames), handleChangeDebounce]);

  useEffect(() => {
    const initialFields = fieldNames
      .reduce((res, curr) => Object.assign(res, { [curr]: { val: '', cb: null } }), {});

    if (reqRef.current) {
      reqRef.current = initialFields as ReqRef<TFieldValues>;
    }

    return handleChangeDebounce.cancel;
  }, [JSON.stringify(fieldNames), handleChangeDebounce.cancel]);

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    disabledSubmit: !!Object.values(errors).length,
    loadingSubmit,
  };
}
