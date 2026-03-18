import React, { useEffect } from 'react';
import { FAQ } from '@/features/FAQ';
import { GetServerSideProps } from 'next';
import { useLazyGetFAQCategoryByIdQuery } from '@/redux/services/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from '../../../next-i18next.config';

const FAQCategoriesPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { i18n } = useTranslation();

  const [fetchFAQCategoryById, { data }] = useLazyGetFAQCategoryByIdQuery();
  const questions = data?.questions || [];
  const categoryId = category! as string;

  useEffect(() => {
    fetchFAQCategoryById({
      categoryId,
      code: i18n.language,
    });
  }, [category, i18n.language]);

  return (
    !!questions.length && (
      <>
        <FAQ.CategoriesHeader
          title={data?.name}
          itemsCount={Number(data?.meta?.total)}
        />
        <FAQ.CategoryList categoryId={categoryId} questions={questions} />
        <FAQ.Footer />
      </>
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

export default FAQCategoriesPage;
