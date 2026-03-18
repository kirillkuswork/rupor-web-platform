import { FC, ReactNode } from 'react';

import { useTranslation } from 'next-i18next';
import { EmptyContainer } from '@/shareds/ui';

type Props = {
  mainText?: string;
  subtitleText?: string;
  button?: ReactNode;
  height?: number;
  isPage?: boolean;
};

export const AutoGridVideoCardNotFound: FC<Props> = ({
  mainText,
  subtitleText,
  button,
  height = 300,
  isPage = false,
}) => {
  const { t } = useTranslation();
  const text = mainText || t('Video_not_found_anything');

  return (
    <EmptyContainer
      text={text}
      subtitleText={subtitleText}
      button={button}
      height={height}
      isPage={isPage}
    />
  );
};

export default AutoGridVideoCardNotFound;
