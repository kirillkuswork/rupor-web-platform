import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { EmptyContainer, Paper } from '@/shareds';
import { Categories } from '@/features';
import { useLazyGetCategoriesQuery } from '@/redux/services/categories';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { ICategoryWithVideos } from '@/redux/services/categories/baseTypes';
import { useTranslation } from 'next-i18next';
import withAuthProtection from '@/hoc/withAuthProtection';
import { ICategoriesResponse } from '@/redux/services/categories/responseModel';
import { scrollTo } from '@/shareds/lib/utils/scrollTo';
import nextI18NextConfig from '../../next-i18next.config';

const CategoriesPage = memo(() => {
  const [data, setData] = useState<ICategoriesResponse>();

  const [fetchData, { isFetching, isError }] = useLazyGetCategoriesQuery();
  const isReady = !isFetching && !isError;
  const { t } = useTranslation();

  const categoriesList = useCallback(
    (category: ICategoryWithVideos) => (
      <Categories.CategoryItem
        key={category.id}
        itemClassName="w-[264px]"
        {...category}
      />
    ),
    [],
  );

  const { Element: CategoriesList } = arrayRender({
    items: data?.categories,
    renderItem: categoriesList,
  });

  const initialLoading = () => {
    fetchData({ preloadVideos: 10 }).then((res) => {
      if (res.isSuccess) setData(res.data);
    });
  };

  useEffect(() => {
    scrollTo(0, false);
    initialLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper className="py-10 md:p-4 md:mb-4">
        <Categories.Header />
      </Paper>

      {isReady && <CategoriesList />}

      {isError && (
        <Paper>
          <EmptyContainer
            isPage={false}
            text={t('Categories_Page_Empty_Container_Text')}
            subtitleText={t('Categories_Page_Empty_Container_Subtitle_Text')}
            errorHandler={{
              refetch: initialLoading,
              isError,
            }}
          />
        </Paper>
      )}

      {isFetching && <Categories.LoadingCategory />}
    </>
  );
});

CategoriesPage.displayName = 'CategoriesPage';

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

export default withAuthProtection(CategoriesPage);
