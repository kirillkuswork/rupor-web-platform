import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useLazyGetFAQCategoriesQuery } from '@/redux/services/faq';

import { FAQ } from '@/features/FAQ';
import {
  IFAQCategory,
} from '@/redux/services/faq/responseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

const FAQPage = () => {
  const { i18n } = useTranslation();
  const [fetchFAQCategories, { data }] = useLazyGetFAQCategoriesQuery();

  useEffect(() => {
    fetchFAQCategories(i18n.language);
  }, [i18n.language]);

  const categoriesList = useCallback(
    (category: IFAQCategory) => <FAQ.CategoriesList key={category.id} {...category} />,
    [],
  );

  const { Element: CategoriesList } = arrayRender({ items: data?.categories, renderItem: categoriesList });

  return (
    !!data?.categories.length && (
    <>
      <FAQ.Header />
      <CategoriesList />
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

export default FAQPage;
