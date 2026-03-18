import { FC, memo } from 'react';

import clsx from 'clsx';
import { Button } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import useIsMobile from '@/shareds/hooks/useIsMobile';

type Props = {
  isChange?: boolean;
  onReset?: () => void;
  disabled: boolean;
  isLoading?: boolean;
};

export const ButtonGroup: FC<Props> = memo(({
  isChange = false,
  onReset: handleReset,
  disabled,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useIsMobile();

  if (!isChange) return;

  return (
    <div
      className={clsx('flex mt-6 w-full', { 'flex-col-reverse': isMobile })}
    >
      <Button
        label={t('Button_Group_Button_Cancel')}
        variant="tertiary"
        type="reset"
        onClick={handleReset}
        fullWidth
        className={clsx({ 'mt-4': isMobile })}
      />

      <Button
        label={t('Button_Group_Button_Save')}
        type="submit"
        className={clsx({ 'ml-3': !isMobile })}
        disabled={disabled || isLoading}
        fullWidth
        loading={isLoading}
      />
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
