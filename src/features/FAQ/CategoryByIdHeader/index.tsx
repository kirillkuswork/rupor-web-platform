import React, { FC, useMemo } from 'react';
import { BlockHeaderInner } from 'rupor-ui-kit';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { BreadCrumbs, Paper } from '@/shareds';
import { IFAQCategory } from '@/redux/services/faq/responseModel';

interface ICategoryByIdHeader {
  title: string;
  category: IFAQCategory;
}

export const CategoryByIdHeader: FC<ICategoryByIdHeader> = ({
  title,
  category,
}) => {
  const routes = useMemo(
    () => [
      {
        text: 'FAQ',
        href: APP_PATHS_PAGES.info,
      },
      {
        text: category?.name || '',
        href: `${APP_PATHS_PAGES.info}/${category?.id}`,
      },
    ],
    [category],
  );

  return (
    <Paper className="pt-6 pb-6 sm:p-4 sm:mb-4">
      <BreadCrumbs className="mt-0 mb-0" routes={routes} />
      <BlockHeaderInner.TitleWrapper className="mt-1.5">
        <BlockHeaderInner.Title className="text-headline-s sm:text-headline-xs">
          {title}
        </BlockHeaderInner.Title>
      </BlockHeaderInner.TitleWrapper>
    </Paper>
  );
};
