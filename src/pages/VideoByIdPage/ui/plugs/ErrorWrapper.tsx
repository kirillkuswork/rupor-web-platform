import { FC, PropsWithChildren } from 'react';
import { IRequestErrors, TErrorCodes } from '@/shareds/types/requestError';
import { ChannelWasDeleted } from './variants/ChannelWasDeleted';
import { VideoDeleted } from './variants/VideoDeleted';
import { VideoNotExist } from './variants/VideoNotExist';

interface IErrorWrapper {
  errorData?: IRequestErrors;
}

export const ErrorWrapper: FC<PropsWithChildren<IErrorWrapper>> = ({ errorData, children }) => {
  const priorityOrder: {
    code: TErrorCodes
    component?: JSX.Element
    action?: () => null
  }[] = [
    { code: 'channels.deleted', component: <ChannelWasDeleted /> },
    { code: 'video.not_found', component: <VideoNotExist /> },
    { code: 'video.deleted', component: <VideoDeleted /> },
    { code: 'video.id_invalid', component: <VideoNotExist /> },
    { code: 'video.not_published', component: <VideoNotExist /> },
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
