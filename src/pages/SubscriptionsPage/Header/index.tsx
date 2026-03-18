import React, { FC } from 'react';

import { useTranslation } from 'next-i18next';
import { BlockHeaderInner } from 'rupor-ui-kit';

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <BlockHeaderInner.Container>
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.Title
          data-testid="subscriptions-header-title"
          className="text-headline-s md:text-headline-xs"
        >
          {t('Menu_subscription')}
        </BlockHeaderInner.Title>
      </BlockHeaderInner.TitleWrapper>
    </BlockHeaderInner.Container>
  );
};
