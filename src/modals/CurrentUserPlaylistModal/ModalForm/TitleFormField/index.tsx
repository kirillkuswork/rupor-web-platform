import { InputCommon } from '@/shareds/ui';
import { FC, memo } from 'react';

import { Control } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

type TitleFormFieldComponentProps = {
  control: Control;
  dti?: string
  id?: string
};

const TitleFormFieldComponent: FC<TitleFormFieldComponentProps> = ({
  control,
  dti,
  id,
}) => {
  const { t } = useTranslation();

  return (
    <InputCommon
      data-testid={`${dti}-input${id}`}
      control={control}
      label={t('Title_Form_Field_Component_Label_Name')}
      className="mb-4"
      required
      name="title"
      maxLettersCount={100}
      showLettersCountThreshold={10}
    />
  );
};

export const TitleFormField = memo(TitleFormFieldComponent);
