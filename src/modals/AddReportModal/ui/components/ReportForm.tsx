import { useTranslation } from 'next-i18next';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useReportForm } from '@/modals/AddReportModal/model/hooks/useReportForm';
import { Button } from 'rupor-ui-kit/dist';
import { FormSubmitData } from '../../model/types/formSubmitData';
import { CheckboxFormField } from './CheckboxItem';
import { ComplainsLoader } from './ComplainsLoader';
import { DescriptionFormField } from './DescriptionFormField';

interface TComplainType<ComplainType extends string> {
  id?: ComplainType;
  description?: string;
}

interface IReportFormProps<ComplainType extends string> {
  onSubmit: (valuesForm: FormSubmitData<ComplainType>) => void;
  complains?: TComplainType<ComplainType>[];
  isLoading: boolean;
  isButtonLoading: boolean;
  dti: string;
}

export const ReportForm = <ComplainType extends string>(
  props: IReportFormProps<ComplainType>,
) => {
  const {
    onSubmit: onSubmitHandler, complains, isLoading, dti, isButtonLoading,
  } = props;

  const { t } = useTranslation();

  const {
    isAnotherTypeChecked,
    formState,
    register,
    handleSubmitForm,
    handleBlur,
    handleChange,
    disabledSubmit,
    control,
    setError,
  } = useReportForm<ComplainType>();

  const onSubmit = async (valuesForm: FormSubmitData<ComplainType>) => {
    if (isAnotherTypeChecked && !valuesForm.description?.trim()) {
      setError('description', {
        message: t('Modal_Complain_Error_Description_Empty'),
      });
    } else {
      onSubmitHandler(valuesForm);
    }
  };

  const { elementsArray } = arrayRender({
    items: complains,
    renderItem: CheckboxFormField<ComplainType>,
    additionalProps: {
      control,
      name: 'complaints',
      isLoading: false,
      register,
      dataTestId: dti,
    },
    listKey: 'id',
  });

  return (
    <form
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmitForm(onSubmit)}
    >
      {isLoading ? <ComplainsLoader /> : elementsArray}

      {!!formState.errors.complaints && (
        <span className="font-normal text-paragraph-s text-red-alert">
          {formState.errors.complaints.message}
        </span>
      )}

      <DescriptionFormField
        control={control}
        isLoading={isLoading}
        required={isAnotherTypeChecked}
        name="description"
        register={register}
        dataTestId={`${dti}-description-field`}
      />

      <div className="flex justify-between sm:mt-8 mt-12 md:flex-col flex-row">
        <Button
          dti={`${dti}-submit`}
          type="submit"
          label={t('Modal_Complain_Content_Button_Title')}
          disabled={
            isButtonLoading || isLoading || !!formState.errors.complaints || disabledSubmit
          }
          loading={isLoading || isButtonLoading}
          fullWidth
        />
      </div>
    </form>
  );
};
