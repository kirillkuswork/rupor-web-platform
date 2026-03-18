import { FC } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

type Props = {
  errorMsg: string;
  className?: string
};

export const ErrorMessage: FC<Props> = ({ errorMsg, className }) => {
  const { t } = useTranslation();
  return <div className={clsx('text-red-alert text-paragraph-l-m font-normal', className)}>{t(errorMsg)}</div>;
};
