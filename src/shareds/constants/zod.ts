// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodRawShape } from 'zod';

import { t } from 'i18next';

export const USER_NAME_LENGTH_MIN = 2;
export const USER_NAME_LENGTH_MAX = 30;

export const validation = (validationSchema: ZodRawShape) => zodResolver(z.object(validationSchema));

export const nameValidation = z
  .string()
  .min(USER_NAME_LENGTH_MIN, 'Auth_Modal_Name_Min_Length_Error')
  .max(USER_NAME_LENGTH_MAX, 'Auth_Modal_Name_Max_Length_Error')
  .refine(
    (val) => val === val.trim(),
    'Modal_Registration_Error_Name_Incorrect',
  );

export const emailValidation = z
  .string()
  .min(1, 'Auth_Modal_Email_Empty_Error')
  .max(256, 'Auth_Modal_Email_Max_Length_Error')
  .refine((val) => (val.match(/@/g) || []).length === 1, {
    message: 'Auth_Modal_Email_Regex_Error',
  })
  .refine((val) => {
    const [local, domain] = val.split('@');
    if (!local || !domain) return false;

    if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+$/.test(local)) {
      return false;
    }

    if (/^[.-]|[.-]$/.test(domain)) {
      return false;
    }

    const domainParts = domain.split('.');
    if (domainParts.length < 2) return false;

    if (!domainParts.every((part) => /^[A-Za-z0-9-]+$/.test(part))) {
      return false;
    }

    return !/[.-]$/.test(domain);
  }, {
    message: 'Auth_Modal_Email_Regex_Error',
  });

export const zString = z.string().trim();

export const faqCommentValidation = zString
  .min(1, t('Zod_Faq_Comment_Validation_Message'))
  .max(1000, t('Zod_Faq_Comment_Validation_Limit'))
  .optional();
