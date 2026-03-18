import {
  FC, memo, ReactNode, useCallback,
} from 'react';

import clsx from 'clsx';
import { Button, EmptyPage } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type Props = {
  id?: string
  text?: string;
  subtitleText?: string;
  button?: ReactNode;
  height?: number;
  isPage?: boolean;
  errorHandler?: {
    refetch: () => void;
    isError: boolean;
  };
  dti?: string;
};

export const EmptyContainer: FC<Props> = memo(({
  id,
  text,
  subtitleText,
  height,
  button,
  isPage = true,
  errorHandler,
  dti,
}) => {
  const {
    isError,
    refetch,
  } = errorHandler || {};
  const handleRefetch = useCallback(() => refetch?.(), [refetch]);
  const { t } = useTranslation();

  return (
    <div className={clsx(
      'flex justify-center items-center w-full',
      { 'h-full': isPage },
    )}
    >
      <div
        style={{ height: height || '100%' }}
        className={clsx(
          'flex flex-col justify-center items-center',
        )}
      >
        <EmptyPage.Title data-testid={`${dti}-empty-title${id ? `_${id}` : ''}`} className="text-center">{t(text!)}</EmptyPage.Title>
        {subtitleText && <EmptyPage.Subtitle data-testid={`${dti}-empty-subtitle${id ? `_${id}` : ''}`} className="!pb-0 whitespace-pre-line">{t(subtitleText)}</EmptyPage.Subtitle>}
        {(button || isError) && (
        <div className={clsx(text ? 'mt-6' : 'mt-0')}>
          {!!button && button}
          {isError && (
          <Button
            onClick={handleRefetch}
            size="medium"
          >
            {t('Empty_Container_Try_Again')}
          </Button>
          )}
        </div>
        )}
      </div>
    </div>
  );
});

EmptyContainer.displayName = 'EmptyContainer';
