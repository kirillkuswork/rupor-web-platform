import React, { useMemo } from 'react';

import { BlockHeaderInner } from 'rupor-ui-kit';

import { EmptyContainer, Paper } from '@/shareds';
import { PaperProps } from 'rupor-ui-kit/dist/components/Paper/Paper.types';
import { CommonCredentialServiceTypes } from '@/features/Auth/consts';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useTranslation } from 'next-i18next';
import { useCurrentCredentialsQuery } from '@/redux/services/users';
import SettingForm from './ui/SettingForm';
import { Loading } from './ui/Loading';

const Wrapper = ({ children }: { children: PaperProps['children'] }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <Paper className="py-10 md:py-4.5 md:px-4">
        <BlockHeaderInner.Title className="text-headline-s md:text-headline-xs">
          {t('Settings_Page_Wrapper_Title')}
        </BlockHeaderInner.Title>
      </Paper>

      <Paper className="h-full md:p-4 !mb-0">{children}</Paper>
    </div>
  );
};

const SettingsPage = () => {
  const { user } = useSelector(selectors.userSelector);
  const { t } = useTranslation();

  const {
    data: credentials,
    isFetching: isLoading,
    isError,
    refetch,
  } = useCurrentCredentialsQuery();

  const { email } = useMemo(
    () => ({
      email:
        credentials?.items?.find(
          ({ service }) => service === CommonCredentialServiceTypes.Email,
        )?.value || '',
    }),
    [credentials],
  );

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <EmptyContainer
          text={t('Settings_Page_Empty_Container_Error_Text')}
          errorHandler={{
            refetch,
            isError,
          }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SettingForm
        defaultValues={{
          name: user?.name || '',
          email,
        }}
      />
    </Wrapper>
  );
};

export default SettingsPage;
