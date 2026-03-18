import { getTranslatedDti } from '@/shareds/helpers/getTranslatedDti';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { Checkbox } from 'rupor-ui-kit/dist';
import { FormSubmitData } from '../../model/types/formSubmitData';

interface ICheckboxFormFieldProps<ComplainType extends string> {
  id: ComplainType;
  description: string;
  name: keyof FormSubmitData<ComplainType>;
  control: Control;
  title: string;
  isLoading: boolean;
  register: UseFormRegister<FormSubmitData<ComplainType>>;
  dataTestId: string;
}

export const CheckboxFormField = <ComplainType extends string>(
  props: ICheckboxFormFieldProps<ComplainType>,
) => {
  const {
    id: value,
    description: title,
    name,
    control,
    isLoading,
    dataTestId,
    register,
  } = props;

  const { isMobile } = useIsMobile();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value: selectedOptions } }) => (
        <div
          className="mb-3"
          data-testid={`${dataTestId}-checkbox_${getTranslatedDti(title)}`}
        >
          <Checkbox
            size={isMobile ? 'medium' : 'large'}
            checked={(selectedOptions || [])?.includes(value)}
            value={value}
            disabled={isLoading}
            {...register(name)}
          >
            {title}
          </Checkbox>
        </div>
      )}
    />
  );
};
