// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { nameValidation } from '@/shareds/constants/zod';

export type UserInfoFormValues = {
  name?: string;
};

export type UserContactsFormValues = {
  email?: string;
};

export const userInfoResolver = zodResolver(
  z.object({
    name: nameValidation,
  }),
);
