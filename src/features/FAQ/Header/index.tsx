import React from 'react';

import { BlockHeaderInner } from 'rupor-ui-kit';
import { Paper } from '@/shareds';
import { useTranslation } from 'next-i18next';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Paper className="py-10 sm:p-4 sm:mb-4">
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.Title className="text-headline-s sm:text-headline-xs">
          {t('Faq_Header_Title')}
        </BlockHeaderInner.Title>
      </BlockHeaderInner.TitleWrapper>
    </Paper>
  );
};
