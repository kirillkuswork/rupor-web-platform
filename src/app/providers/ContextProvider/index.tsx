import React, { FC, PropsWithChildren } from 'react';
import { CreateUserPlaylistModalContextProvider } from '@/modals/CreateUserPlaylistModal';
import { ChooseUserPlaylistModalContextProvider } from '@/modals/ChoosePlaylistModal';
import { AddReportModalContextProvider } from '@/modals/AddReportModal';
import { DialogModalContextProvider } from '@/modals/DialogModal';
import { ShareVideoModalContextProvider } from '@/modals/ShareVideoModal';
import { IntegrateVideoModalContextProvider } from '@/modals/IntegrateVideoModal';
import { AuthModalProvider } from 'rupor-common';
import {
  useLazyConfirmQuery,
  useLazyLoginQuery,
  useLazyRegDeclareQuery,
  useLazyResetConfirmQuery,
  useLazyResetDeclareQuery,
} from '@/redux/services/auth';
import { useLazyGetMeInfoQuery } from '@/redux/services/users';

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => (
  <AuthModalProvider
    useLazyLoginQuery={useLazyLoginQuery}
    useLazyGetMeInfoQuery={useLazyGetMeInfoQuery}
    useLazyRegDeclareQuery={useLazyRegDeclareQuery}
    useLazyResetDeclareQuery={useLazyResetDeclareQuery}
    useLazyResetConfirmQuery={useLazyResetConfirmQuery}
    useLazyConfirmQuery={useLazyConfirmQuery}
  >
    <CreateUserPlaylistModalContextProvider>
      <ChooseUserPlaylistModalContextProvider>
        <AddReportModalContextProvider>
          <DialogModalContextProvider>
            <ShareVideoModalContextProvider>
              <IntegrateVideoModalContextProvider>
                {children}
              </IntegrateVideoModalContextProvider>
            </ShareVideoModalContextProvider>
          </DialogModalContextProvider>
        </AddReportModalContextProvider>
      </ChooseUserPlaylistModalContextProvider>
    </CreateUserPlaylistModalContextProvider>
  </AuthModalProvider>
);
