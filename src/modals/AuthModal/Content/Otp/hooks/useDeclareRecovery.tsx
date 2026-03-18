import { useLazyResetDeclareQuery } from '@/redux/services/auth';
import { useCallback } from 'react';
import { useAuthModal } from '@/providers/AuthModalProvider';
import { getAxiosErrors } from '@/modals/AuthModal/utils/getAxiosErrors';
import { AxiosError } from 'axios';
import { INewResetDeclareRequest } from '@/redux/services/auth/requestModel';
import { UseDeclareErrorCode } from '@/modals/AuthModal/Content/Otp/types';

export const useDeclareRecovery = (params: INewResetDeclareRequest) => {
  const [declare, { isFetching }] = useLazyResetDeclareQuery();
  const { modalParams, updateModalParams } = useAuthModal();
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
