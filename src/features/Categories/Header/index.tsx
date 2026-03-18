import React from 'react';

import { useTranslation } from 'next-i18next';
import { BlockHeaderInner } from 'rupor-ui-kit';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <BlockHeaderInner.Container split>
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.Title
          data-testid="categories-header-title"
          className="text-headline-s md:text-headline-xs"
        >
          {t('Category_Page_Header')}
        </BlockHeaderInner.Title>
      </BlockHeaderInner.TitleWrapper>
    </BlockHeaderInner.Container>
  );
};
