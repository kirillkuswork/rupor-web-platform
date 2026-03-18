import React, { FC, useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlockHeaderInner, PageIcon } from 'rupor-ui-kit';

import { Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { IFAQAnswer } from '@/redux/services/faq/responseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useTranslation } from 'next-i18next';

interface IOtherArticles {
  questions: IFAQAnswer[];
}

export const OtherArticles: FC<IOtherArticles> = ({ questions }) => {
  const router = useRouter();
  const { category } = router.query;
  const { t } = useTranslation();

  const questionItem = useCallback((question: IFAQAnswer) => (
    <Link
      key={question.id}
      href={`${APP_PATHS_PAGES.info}/${category}/${question.id}`}
    >
      <div className="flex items-start gap-4 cursor-pointer">
        <PageIcon className="text-white-40" />
        <span className="w-full font-normal text-paragraph-lm">
          {question.question}
        </span>
      </div>
    </Link>
  ), [category]);

  const { Element: QuestionsList } = arrayRender({
    items: questions,
    renderItem: questionItem,
    listKey: 'id',
  });

  return (
    <Paper className="sticky top-0 flex-col pt-4 mb-0 h-min">
      <BlockHeaderInner.Title className="mb-6 text-paragraph-xl">
        {t('Faq_Other_Articles_Title')}
      </BlockHeaderInner.Title>
      <div className="flex flex-col gap-y-5">
        <QuestionsList />
      </div>
    </Paper>
  );
};
