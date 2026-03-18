import React, { FC, useCallback } from 'react';

import Link from 'next/link';
import { FaqCard } from 'rupor-ui-kit';

import { Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { IFAQAnswer } from '@/redux/services/faq/responseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';

interface ICategoryList {
  categoryId: string;
  questions: IFAQAnswer[];
}

export const CategoryList: FC<ICategoryList> = ({ questions, categoryId }) => {
  const questionItem = useCallback((question: IFAQAnswer) => (
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

  const { Element: QuestionList } = arrayRender({ items: questions, renderItem: questionItem });

  return (
    <Paper className="grid flex-wrap grid-cols-2 gap-6 sm:p-4 sm:gap-4 sm:grid-cols-1 sm:mb-4">
      <QuestionList />
    </Paper>
  );
};
