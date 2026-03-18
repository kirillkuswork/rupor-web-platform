import { useTranslation } from 'next-i18next';
import { Control, UseFormRegister } from 'react-hook-form';
import { FormSubmitData } from '../../model/types/formSubmitData';
import { TextArea } from './TextArea';

interface IDescriptionFormFieldProps<ComplainType extends string> {
  control: Control;
  isLoading: boolean;
  register: UseFormRegister<FormSubmitData<ComplainType>>;
  required: boolean;
  name: keyof FormSubmitData<ComplainType>;
  dataTestId: string;
}

export const DESCRIPTION_MAX_LETTERS_COUNT = 1000;

export const DescriptionFormField = <ComplainType extends string>(props: IDescriptionFormFieldProps<ComplainType>) => {
  const {
    control,
    isLoading,
    name,
    dataTestId,
    register,
    required,
  } = props;

  const { t } = useTranslation();

  return (
    <TextArea
      control={control}
      label={t('Modal_Complain_Problem_Description')}
      className="mt-10 sm:mt-6"
      maxLettersCount={DESCRIPTION_MAX_LETTERS_COUNT}
      rows={4}
      disabled={isLoading}
      required={required}
      name={name}
      register={register}
      data-testid={dataTestId}
    />
  );
};
