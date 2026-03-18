import React, { FC, useCallback, useMemo } from 'react';

import Link from 'next/link';

import {
  BlockHeaderInner, FaqCard, formatCount, RightArrowIcon, ShowMoreCard,
} from 'rupor-ui-kit';

import { Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { IFAQCategory, IFAQCategoryQuestion } from '@/redux/services/faq/responseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useTranslation } from 'next-i18next';

const articlesLimit = 6;

export const CategoriesList: FC<IFAQCategory> = ({
  name, id: categoryId, questions, meta,
}) => {
  const { t } = useTranslation();
  const genitiveCaseArticlesCount = [t('Articles_Count_Option_4'), t('Articles_Count_Option_2'), t('Articles_Count_Option_2')];
  const articlesCount = [t('Articles_Count_Option_1'), t('Articles_Count_Option_2'), t('Articles_Count_Option_3')];
  const articlesAmount = Number(meta?.total) || 0;

  const questionItem = useCallback((question: IFAQCategoryQuestion) => (
    <Link
      key={question.id}
      href={`${APP_PATHS_PAGES.info}/${categoryId}/${question.id}`}
    >
      <FaqCard
        className="px-6 py-6 cursor-pointer"
        title={question.question || ''}
      />
    </Link>
  ), []);

  const items = useMemo(() => (articlesAmount > articlesLimit
    ? questions?.slice(0, articlesLimit - 1)
    : questions), [articlesAmount, articlesLimit, questions]);

  const { Element: FAQCards } = arrayRender({
    items,
    renderItem: questionItem,
  });

  return (
    <Paper className="pb-0.5 sm:p-4 sm:pb-0.5 sm:mb-4">
      <BlockHeaderInner.Container>
        <Link href={`${APP_PATHS_PAGES.info}/${categoryId}`}>
          <BlockHeaderInner.TitleWrapper className="cursor-pointer faq-bread-crumbs-hover">
            <BlockHeaderInner.Title className="mr-3 text-paragraph-xl">
              {name}
            </BlockHeaderInner.Title>
            <BlockHeaderInner.Subtitle className="mr-3">
              <RightArrowIcon className="w-5" />
            </BlockHeaderInner.Subtitle>
            <BlockHeaderInner.Subtitle className="font-semibold text-paragraph-m-s">
              {formatCount(articlesAmount, articlesCount)}
            </BlockHeaderInner.Subtitle>
          </BlockHeaderInner.TitleWrapper>
        </Link>
      </BlockHeaderInner.Container>
      <Paper className="grid flex-wrap grid-cols-2 gap-6 !p-0 !pt-5 sm:gap-4 sm:grid-cols-1 sm:mb-4">
        <FAQCards />
        {questions && articlesAmount > articlesLimit && (
        <Link href={`${APP_PATHS_PAGES.info}/${categoryId}`}>
          <ShowMoreCard.Container
            className="cursor-pointer"
            title={t('Faq_Show_More_Articles', { articles: formatCount(articlesAmount - 5, genitiveCaseArticlesCount) })}
          >
            <ShowMoreCard.Button />
          </ShowMoreCard.Container>
        </Link>
        )}
      </Paper>
    </Paper>
  );
};
