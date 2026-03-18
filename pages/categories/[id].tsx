import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Paper } from '@/shareds';
import { scrollTo } from '@/shareds/lib/utils/scrollTo';
import { useGetCategoriesQuery } from '@/redux/services/categories';
import { CategoryChannels } from '@/features';
import { Header } from '@/features/CategoryById/Header';
import { VideoRecommendationsList } from '@/widgets/VideoRecommendationsList';
import withAuthProtection from '@/hoc/withAuthProtection';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';

const CategoryById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const categoryId = Number(id);

  const { data, isFetching } = useGetCategoriesQuery({ preloadVideos: 0 });

  const category = data?.categories?.find((item) => item.id === categoryId);

  useEffect(() => {
    scrollTo(0, false);
  }, [categoryId]);

  return (
    <>
      <Header
        categoryId={categoryId}
        isFetching={isFetching}
        categoryTitle={t(category?.title ?? '')}
      />
      <CategoryChannels dti="category-channels" categoryId={categoryId} />
      <Paper className="md:p-4 !bg-black">
        <VideoRecommendationsList categoryId={categoryId} />
      </Paper>
    </>
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

export default withAuthProtection(CategoryById);
