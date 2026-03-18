import { Paper } from '@/shareds';
import { VideoRecommendationsList } from '@/widgets/VideoRecommendationsList';

const HomePage = () => (
  <div className="flex items-center justify-center">
    <Paper className="w-full md:!p-4 !bg-black">
      <VideoRecommendationsList dti="homepage" />
    </Paper>
  </div>
);

export default HomePage;
