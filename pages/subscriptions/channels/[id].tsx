import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { store } from '@/redux/store/store';
import { categoryApi } from '@/redux/services';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { ICategoryWithVideos } from '@/redux/services/categories/baseTypes';
import { ChannelPageByCategoryPage } from '@/pages';
import withAuthProtection from '@/hoc/withAuthProtection';
import { useGetCategoriesQuery } from '@/redux/services/categories';
import { appEnv } from '@/shareds/constants/environments';
import nextI18NextConfig from '../../../next-i18next.config';

interface ISubscriptionsChannelPageById {
  category?: ICategoryWithVideos;
  id?: string;
}

const routes = [
  {
    text: 'Menu_subscription',
    href: APP_PATHS_PAGES.subscriptions,
  },
  {
    text: 'Channel_Page_By_Category_Page_Route_Search',
    href: APP_PATHS_PAGES.channelsSuggestions,
  },
];

const SubscriptionsChannelPageById = ({ id, category: propsCategory }: ISubscriptionsChannelPageById) => {
  const { data: categoriesData } = useGetCategoriesQuery({ preloadVideos: 0 });
  const currentCategory = categoriesData?.categories?.find((item: ICategoryWithVideos) => item?.id === Number(id));

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

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const categoriesResult = await store.dispatch(categoryApi.endpoints.getCategories.initiate({ preloadVideos: 0 }));
  const categories = categoriesResult.data?.categories || [];

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

export default withAuthProtection(SubscriptionsChannelPageById);
