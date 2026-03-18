import { z } from 'zod';
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';

const DESCRIPTION_MAX_LETTERS_COUNT = 1000;

export const useFormResolver = () => {
  const { t } = useTranslation();

  return zodResolver(
    z.object({
      complaints: z.string().array().nonempty(t('Modal_Complain_Error_Empty') as string),
      description: z
        .string()
        .max(DESCRIPTION_MAX_LETTERS_COUNT, t('Modal_Complain_Error_Description_Max', {
          maxLength: DESCRIPTION_MAX_LETTERS_COUNT,
        }) as string)
        .nullable(),
    }).required(),
  );
};
