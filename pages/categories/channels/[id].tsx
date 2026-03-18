import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { store } from '@/redux/store/store';
import { categoryApi } from '@/redux/services';
import { useGetCategoriesQuery } from '@/redux/services/categories';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { ICategoryWithVideos } from '@/redux/services/categories/baseTypes';
import { useMemo } from 'react';
import { ChannelPageByCategoryPage } from '@/pages';
import withAuthProtection from '@/hoc/withAuthProtection';
import { appEnv } from '@/shareds/constants/environments';
import nextI18NextConfig from '../../../next-i18next.config';

interface ICategoriesChannelPageById {
  category?: ICategoryWithVideos;
  id?: string;
}

const CategoriesChannelPageById = ({ id, category: propsCategory }: ICategoriesChannelPageById) => {
  const { t } = useTranslation();
  const { data: categoriesData } = useGetCategoriesQuery({ preloadVideos: 0 });

  const currentCategory = categoriesData?.categories?.find((item: ICategoryWithVideos) => item?.id === Number(id));

  const routes = useMemo(
    () => [
      {
        text: 'Category_Page_Header',
        href: APP_PATHS_PAGES.categories,
      },
      {
        text: currentCategory?.title ? t(currentCategory.title) : '',
        href: `${APP_PATHS_PAGES.categories}/${id}`,
      },
    ],
    [currentCategory, id, t],
  );

  // используем актуальные данные из хука, если они есть, иначе из props
  const categoryData = currentCategory || propsCategory;

  return (
    <ChannelPageByCategoryPage
      routes={routes}
      id={id}
      category={categoryData}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id: categoryId } = params as { id: string };

  const categoryResult = await store.dispatch(categoryApi.endpoints.getCategories.initiate({ preloadVideos: 0 }));

  const category = categoryResult?.data?.categories?.find((item) => item?.id === Number(categoryId));

  return {
    props: {
      ...(await serverSideTranslations(
        locale as string,
        ['common'],
        nextI18NextConfig,
        nextI18NextConfig.i18n.locales,
      )),
      id: categoryId,
      category: category || null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const categoriesResult = await store.dispatch(categoryApi.endpoints.getCategories.initiate({ preloadVideos: 0 }));
  const categories = categoriesResult.data?.categories ?? [];

  const paths = locales.map((locale) => categories.map((category) => ({
    params: { id: String(category.id) },
    locale,
  })))
    .flat();

  if (appEnv.PRODUCTION) {
    return {
      paths,
      fallback: 'blocking',
    };
  }

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default withAuthProtection(CategoriesChannelPageById);
