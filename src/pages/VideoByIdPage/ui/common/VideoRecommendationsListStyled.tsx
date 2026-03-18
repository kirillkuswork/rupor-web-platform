import { VideoRecommendationsList } from '@/widgets/VideoRecommendationsList';

export const VideoRecommendationsListStyled = () => (
  <>
    <div className="h-6 w-full rounded-t-xl bg-dynamic-secondary" />
    <VideoRecommendationsList
      cardVariant="horizontal"
      className="mb-6 p-6 rounded-b-xl bg-dynamic-secondary"
      dti="recommendations-list"
    />
  </>
);
