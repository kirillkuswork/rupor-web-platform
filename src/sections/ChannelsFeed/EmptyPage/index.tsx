import React from 'react';

import { useTranslation } from 'next-i18next';
import { EmptyContainer, Paper } from '@/shareds';
import { BlockHeaderInner, Button } from 'rupor-ui-kit';

export const EmptyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <Paper className="py-10 mb-6 sm:mb-4 md:py-4">
        <BlockHeaderInner.Container className="justify-between">
          <BlockHeaderInner.TitleWrapper>
            <BlockHeaderInner.Title className="!mr-6 text-headline-s">
              {t('Common_channels')}
            </BlockHeaderInner.Title>
          </BlockHeaderInner.TitleWrapper>
        </BlockHeaderInner.Container>
      </Paper>
      <Paper className="h-full mb-6">
        <EmptyContainer
          text={t('Empty_Page_Empty_Container_Text')}
          subtitleText={t('Empty_Page_Empty_Container_Subtitle_Text')}
          button={(
            <Button
              type="button"
              onClick={() => {}}
              size="medium"
              className="mx-2 my-0"
            >
              {t('Empty_Page_Empty_Container_Button')}
            </Button>
          )}
        />
      </Paper>
    </div>
  );
};
