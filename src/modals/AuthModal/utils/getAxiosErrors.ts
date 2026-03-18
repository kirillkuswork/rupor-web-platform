import { AxiosError } from 'axios';

export const getAxiosErrors = <T>(error: AxiosError): T[] => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  error?.response?.data?.errors.map((axiosError) => axiosError.code) || []
);
