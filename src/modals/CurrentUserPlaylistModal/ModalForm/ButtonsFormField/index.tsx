import { FC, memo } from 'react';

import { Button } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type ButtonsFormFieldProps = {
  submitButtonTitle: string;
  isLoading: boolean;
  isDisabled: boolean;
  onReset: () => void;
  dti?: string
  id?: string
};

export const ButtonsFormField: FC<ButtonsFormFieldProps> = memo(({
  submitButtonTitle,
  onReset: handleReset,
  isLoading,
  isDisabled,
  dti,
  id,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex justify-between mt-12 md:flex-col-reverse flex-row"
    >
      <Button
        data-testid={`${dti}-reset-button${id}`}
        type="reset"
        label={t('Buttons_Form_Field_Button_Cancel')}
        variant="tertiary"
        className="mr-4"
        onClick={handleReset}
        fullWidth
      />

      <Button
        data-testid={`${dti}-submit-button${id}`}
        type="submit"
        label={submitButtonTitle}
        className="md:mb-4"
        disabled={isDisabled}
        loading={isLoading}
        fullWidth
      />
    </div>
  );
});

ButtonsFormField.displayName = 'ButtonsFormField';
