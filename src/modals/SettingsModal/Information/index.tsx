import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { supportEmail } from '@/shareds/constants/paths';
import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';

import { useSettingsModal } from '@/app/providers/SettingsProvider';

import { otpConsts } from '@/features/Otp';

import { InformationContent } from '@/features';
import { changeUserInfoLocales } from '@/modals/SettingsModal/consts';
import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';

export const Information: FC = () => {
  const { t } = useTranslation();
  const { modalParams, closeModal } = useSettingsModal();

  const { blockedTime: blockedTimeInMinutes } = modalParams;

  const handleOnSubmit = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const time = getMinutesLeft(blockedTimeInMinutes);

  const description = blockedTime({ text: 'Auth_Modal_Exhausted_Email_Attempt_Error', time, t });
  const locale = changeUserInfoLocales;

  return (
    <InformationContent
      className="!mt-9 !mb-4"
      description={t(description, {
        attempts: otpConsts.ATTEMPTS_COUNT,
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
