import {
  FC,
  memo,
} from 'react';

import { useTranslation } from 'next-i18next';
import { SwitcherTooltip } from 'rupor-ui-kit';

type Props = {
  isVisible: boolean;
};

export const Spinner: FC<Props> = memo(({
  isVisible,
}) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="flex items-center justify-center mt-2"
    >
      <SwitcherTooltip
        className="mr-3"
        loading
      />

      <div
        className="text-paragraph-l-m font-semibold"
      >
        {t('Modal_OTP_Spinner_Title')}
      </div>
    </div>
  );
});

Spinner.displayName = 'Spinner';
