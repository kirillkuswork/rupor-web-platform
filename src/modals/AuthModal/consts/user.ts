import { z } from 'zod';
// eslint-disable-next-line import/no-cycle
import { nameValidation, emailValidation } from '@/shareds/constants/zod';

export const NON_EMPTY_ZOD_RESOLVER_VALUE = 1;

export const ATTEMPTS_COUNT = 3;

const passwordRegex = /^(?=.{6,100}$)[A-Za-z0-9~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+$/;

const passwordValidation = z
  .string()
  .min(6, 'Auth_Modal_Password_Min_Length_Error')
  .max(100, 'Auth_Modal_Password_Max_Length_Error')
  .regex(passwordRegex, 'Auth_Modal_Password_Regex_Error');

const passwordRefine = 'Auth_Modal_Password_Do_Not_Match_Error';

export const registrationSchema = z
  .object({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordRefine,
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const recoverySchema = z.object({
  email: emailValidation,
});

export const resetPasswordSchema = z.object({
  password: passwordValidation,
  confirmPassword: passwordValidation,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordRefine,
    path: ['confirmPassword'],
  });

export const registrationLocalesEmail = {
  title: 'Modal_Information_Confirm_Title_Email',
  description: 'Modal_Information_Confirm_Description_Attempts_Email',
  info: 'Modal_Information_Confirm_Description_Reg_Email',
  submitBtnTitle: 'Modal_Information_Confirm_SubmitBtn_Reg_Email',
};
