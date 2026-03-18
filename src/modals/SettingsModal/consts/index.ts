import { z } from 'zod';
import { emailValidation } from '@/shareds/constants/zod';

const passwordRegex = /^(?=.{6,100}$)[A-Za-z0-9~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+$/;

const passwordValidation = z
  .string()
  .min(6, 'Auth_Modal_Password_Min_Length_Error')
  .max(100, 'Auth_Modal_Password_Max_Length_Error')
  .regex(passwordRegex, 'Auth_Modal_Password_Regex_Error');

const passwordRefine = 'Auth_Modal_Password_Do_Not_Match_Error';

export const changeEmailSchema = z.object({
  email: emailValidation,
});

export const changePasswordSchema = z.object({
  password: passwordValidation,
  confirmPassword: passwordValidation,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordRefine,
    path: ['confirmPassword'],
  });

export const changeUserInfoLocales = {
  info: 'Modal_Information_Confirm_Description_Reg_Phone',
  submitBtnTitle: 'Common_understandably',
};
