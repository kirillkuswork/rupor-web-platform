import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { IRequestErrors, TErrorCodes } from '@/shareds/types/requestError';
import { ErrorComponent } from '../ErrorComponent';

interface IErrorWrapper {
  errorData?: IRequestErrors;
}

export const ErrorWrapper: FC<PropsWithChildren<IErrorWrapper>> = ({ errorData, children }) => {
  const router = useRouter();

  const priorityOrder: {
    code: TErrorCodes
    component?: JSX.Element
    action?: () => null
  }[] = [
    { code: 'channels.deleted', component: <ErrorComponent /> },
    { code: 'channel.not_found', action: () => { router.push('/404'); return null; } },
  ];

  if (!errorData?.errors) return children;

  const errorMap = Object.fromEntries(
    errorData.errors.map((error) => [error.code, true]),
  );

  const matchedError = priorityOrder.find(({ code }) => errorMap[code]);

  if (matchedError) {
    return matchedError.component ?? matchedError.action?.();
  }

  return children;
};
