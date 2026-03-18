import {
  FC, useCallback,
} from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  Button,
  EmptyPage,
  Paper,
} from 'rupor-ui-kit';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useAuthModal } from 'rupor-common';

type Props = {
  subtitleText?: string;
  authButtonText?: string;
  isFullscreen?: boolean;
  dti?: string;
};

export const IsNotAuthorized: FC<Props> = ({
  subtitleText = 'Not_Authorized_Subtitle',
  isFullscreen = false,
  authButtonText = 'Not_Authorized_Auth',
  dti = '',
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { openModal } = useAuthModal();
  const handelOnClick = useCallback(() => {
    openModal('login');
  }, [openModal]);

  const content = (
    <EmptyPage.Wrapper data-testid={`${dti ? `${dti}-` : ''}not-auth-wrapper`} className="bg-shark text-[14px] rounded-b-xl rounded-t-xl">
      <EmptyPage.Title data-testid={`${dti ? `${dti}-` : ''}not-auth-title`}>{t('Not_Authorized_Title')}</EmptyPage.Title>
      <EmptyPage.Subtitle data-testid={`${dti ? `${dti}-` : ''}not-auth-subtitle`}>{t(subtitleText)}</EmptyPage.Subtitle>
      <EmptyPage.Buttons className="items-center flex !flex-row">
        <Button
          data-testid={`${dti ? `${dti}-` : ''}not-auth-home-button`}
          variant="tertiary"
          size="small"
          className="mr-3"
          style={{ display: 'inline-block' }}
          onClick={() => push(APP_PATHS_PAGES.home)}
        >
          {t('Not_Authorized_Main')}
        </Button>
        <Button
          data-testid={`${dti ? `${dti}-` : ''}not-auth-sign-in-button`}
          size="small"
          style={{ display: 'inline-block' }}
          onClick={handelOnClick}
        >
          {t(authButtonText)}
        </Button>
      </EmptyPage.Buttons>
    </EmptyPage.Wrapper>
  );

  return isFullscreen ? (
    <div className="bg-dynamic-primary h-[100vh] w-full p-6 md:p-4 fixed z-50">
      <Paper className="flex-auto flex items-center justify-center h-full">
        {content}
      </Paper>
    </div>
  ) : (
    content
  );
};

IsNotAuthorized.displayName = 'IsNotAuthorized';
