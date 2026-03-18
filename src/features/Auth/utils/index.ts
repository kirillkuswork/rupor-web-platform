import { AxiosError } from 'axios';
import { CORRECT_PHONE_NUMBER_REGEX, ONLY_PHONE_SYMBOLS_REGEX } from '../consts';

export const getIsPhone = (value: string) => !value.replace(ONLY_PHONE_SYMBOLS_REGEX, '');

export const getIsCorrectPhoneNumber = (value: string) => CORRECT_PHONE_NUMBER_REGEX.test(value);

export const getAxiosErrors = <T>(error: AxiosError): T[] => (
  // @ts-ignore
  error?.response?.data?.errors.map((axiosError) => axiosError.code) || []
);
