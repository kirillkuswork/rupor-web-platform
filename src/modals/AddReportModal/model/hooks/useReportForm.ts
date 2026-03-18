import { useForm } from 'react-hook-form';
import { FormSubmitData } from '@/modals/AddReportModal/model/types/formSubmitData';
import { useFormResolver } from '@/modals/AddReportModal/model/hooks/useFormResolver';
import { useValidationBlacklist } from '@/shareds/hooks/useValidationBlacklist';
import { useEffect, useState } from 'react';

export const checkboxAnotherTypeList = [
  'PROBLEM_TYPE_VIDEO_ANOTHER',
  'VIDEO_COMPLAINT_ANOTHER',
];

export const useReportForm = <ComplainType extends string>() => {
  const [isAnotherTypeChecked, setIsAnotherTypeChecked] = useState(false);
  const {
    control,
    reset,
    formState,
    register,
    setFocus,
    setError,
    resetField,
    clearErrors,
    trigger,
    getValues,
  } = useForm<FormSubmitData<ComplainType>>({
    resolver: useFormResolver(),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      complaints: [],
      description: '',
    },
  });

  const { errors } = formState;

  const {
    disabledSubmit,
    handleSubmit: handleSubmitForm,
    loadingSubmit,
    handleBlur,
    handleChange,
  } = useValidationBlacklist({
    fieldNames: ['description'],
    setError,
    errors,
    clearErrors,
    trigger,
    getValues,
  });

  useEffect(() => {
    resetField('complaints');
    resetField('description');

    register('complaints', {
      onChange: (event) => {
        clearErrors();
        if (!checkboxAnotherTypeList.includes(event.target.value)) {
          return;
        }

        if (event.target.checked) {
          setFocus('description', { shouldSelect: true });
          setIsAnotherTypeChecked(true);
        } else {
          setIsAnotherTypeChecked(false);
        }
      },
    });
  }, [reset, setFocus, register, resetField, clearErrors]);

  return {
    isAnotherTypeChecked,
    setError,
    control,
    register,
    handleChange,
    handleBlur,
    handleSubmitForm,
    formState,
    disabledSubmit,
    loadingSubmit,
  };
};
