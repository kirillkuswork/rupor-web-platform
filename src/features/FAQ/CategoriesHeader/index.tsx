import React, { FC } from 'react';

import { BlockHeaderInner, formatCount } from 'rupor-ui-kit';

import { BreadCrumbs, Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useTranslation } from 'next-i18next';

interface ICategoriesHeader {
  title?: string;
  itemsCount: number;
}

const routes = [
  {
    text: 'FAQ',
    href: APP_PATHS_PAGES.info,
  },
];

export const CategoriesHeader: FC<ICategoriesHeader> = ({
  title = '',
  itemsCount,
}) => {
  const { t } = useTranslation();

  const articlesCount = [t('Articles_Count_Option_1'), t('Articles_Count_Option_2'), t('Articles_Count_Option_3')];

  return (
    <Paper className="pt-6 pb-6 sm:p-4 sm:mb-4">
      <BreadCrumbs className="mt-0 mb-0" routes={routes} />
      <BlockHeaderInner.TitleWrapper className="mt-1.5 flex">
        <BlockHeaderInner.Title className="text-headline-s sm:text-headline-xs sm:mr-3">
          {title}
        </BlockHeaderInner.Title>
        <BlockHeaderInner.Subtitle className="text-paragraph-m-s sm:mr-0">
          {formatCount(itemsCount, articlesCount)}
        </BlockHeaderInner.Subtitle>
      </BlockHeaderInner.TitleWrapper>
    </Paper>
  );
};
