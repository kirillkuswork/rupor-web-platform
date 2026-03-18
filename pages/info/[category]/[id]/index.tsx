import React, { useEffect } from 'react';
import { FAQ } from '@/features';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { GetServerSideProps } from 'next';
import {
  useLazyGetFAQAnswerQuery,
  useLazyGetFAQCategoryByIdQuery,
} from '@/redux/services/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { scrollTo } from '@/shareds/lib/utils/scrollTo';
import nextI18NextConfig from '../../../../next-i18next.config';

const FAQCategoryByIdPage = () => {
  const { isMobile } = useIsMobile();
  const router = useRouter();
  const { category, id: questionId } = router.query;
  const { i18n } = useTranslation();

  const [fetchFAQCategoryById, { data }] = useLazyGetFAQCategoryByIdQuery();
  const [fetchFAQAnswers, { data: answers }] = useLazyGetFAQAnswerQuery();
  const questions = data?.questions || [];
  const categoryData = data!;
  const categoryId = category! as string;

  useEffect(() => {
    fetchFAQCategoryById({
      categoryId: categoryId as string,
      code: i18n.language,
    });
  }, [categoryId, i18n.language]);

  useEffect(() => {
    fetchFAQAnswers({
      id: questionId as string,
      code: i18n.language,
    });
  }, [questionId, i18n.language]);

  useEffect(() => {
    scrollTo(0, false);
  }, [answers]);

  const filteredQuestions = questions?.filter(
    (question) => String(question.id) !== questionId,
  );

  return (
    !!questions.length
    && !!answers && (
      <div className="flex-col">
        <FAQ.CategoryByIdHeader
          title={answers?.question || ''}
          category={categoryData}
        />
        <div
          className={clsx(
            isMobile ? 'flex-col' : 'flex-row',
            'relative flex justify-between h-full gap-6 sm:gap-4',
          )}
        >
          <div className="flex-col w-full sm:flex-col">
            <FAQ.Article answer={answers?.answer} />
            <FAQ.Footer />
          </div>
          <FAQ.OtherArticles questions={filteredQuestions} />
        </div>
      </div>
    )
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale as string,
      ['common'],
      nextI18NextConfig,
      nextI18NextConfig.i18n.locales,
    )),
  },
});

export default FAQCategoryByIdPage;
