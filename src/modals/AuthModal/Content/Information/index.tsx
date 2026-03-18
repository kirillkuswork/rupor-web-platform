import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthModal } from '@/providers/AuthModalProvider';
import { supportEmail } from '@/shareds/constants/paths';
import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { InformationContent } from '@/features';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';
import {
  ATTEMPTS_COUNT,
  registrationLocalesEmail,
} from '../../consts/user';

export const Information: FC = () => {
  const { t } = useTranslation();
  const { modalParams, openModal } = useAuthModal();

  const { blockedTime: blockedTimeInMinutes, type } = modalParams;

  const handleOnSubmit = useCallback(() => {
    if (type === 'resetConfirmationInfo') {
      return openModal('recovery');
    }
    return openModal('registration');
  }, [type, openModal]);

  const time = getMinutesLeft(blockedTimeInMinutes);
  const description = blockedTime({ text: 'Auth_Modal_Exhausted_Email_Attempt_Error', time, t });
  const locale = registrationLocalesEmail;

  return (
    <InformationContent
      description={t(description, {
        attempts: ATTEMPTS_COUNT,
      })}
      info={formatInformationText(
        t(locale.info, {
          supportEmail,
        }),
      )}
      submitBtnTitle={t(locale.submitBtnTitle)}
      onSubmit={handleOnSubmit}
    />
  );
};
