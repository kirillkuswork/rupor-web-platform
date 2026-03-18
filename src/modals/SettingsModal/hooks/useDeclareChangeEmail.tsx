import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useSettingsModal } from '@/app/providers/SettingsProvider';
import { getAxiosErrors } from '@/shareds/lib/helpers/getAxiosErrors';
import { IChangeCredentialsDeclareRequest } from '@/redux/services/users/requestModel';
import { useLazyUserCredentialsDeclareQuery } from '@/redux/services/users';
import { UseDeclareErrorCode } from '@/modals/AuthModal/Content/Otp/types';

export const useDeclareChangeEmail = (params: IChangeCredentialsDeclareRequest) => {
  const [declare, { isFetching }] = useLazyUserCredentialsDeclareQuery();
  const { modalParams, updateModalParams } = useSettingsModal();
  const load = useCallback(async () => {
    try {
      const declareData = await declare(params);

      const confirmCodeId = declareData.data?.confirmCodeId;
      const attemptsConfirm = declareData.data?.attempts;
      const expiredTime = declareData.data?.expired;

      if (confirmCodeId) {
        updateModalParams({
          ...modalParams,
          confirmCodeId,
          attemptsConfirm,
          confirmError: '',
          attemptsDeclare: modalParams.attemptsDeclare! - 1,
          expiredTime,
        });
      }
    } catch (axiosError) {
      const errors = getAxiosErrors<UseDeclareErrorCode>(
        axiosError as AxiosError,
      );
      const error = errors[0];

      return error;
    }

    return '';
  }, [declare, modalParams, params, updateModalParams]);

  return {
    load,
    isLoading: isFetching,
  };
};
