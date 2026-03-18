import { FC, memo, useMemo } from 'react';

import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';

import { IVideoCardWithDetailsProps, VideoCardWithDetails } from '@/entities/Video';
import { Splider } from 'rupor-ui-kit/dist';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';

interface IMobileSlider {
  videos: IVideoCardWithDetailsProps[];
  isLoading?: boolean;
}

export const MobileSlider:FC<IMobileSlider> = memo(({ videos, isLoading }) => {
  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

  const slides = useMemo(() => videos.map((video: IVideoCardWithDetailsProps) => (
    <VideoCardWithDetails
      className="w-[264px]"
      key={video.videoId}
      getVideoActions={actions}
      isShowChannelLogo={false}
      {...video}
    />
  )), [videos]);

  return (
    <div className="overflow-hidden mt-4" style={{ maxWidth: '90vw' }}>
      <Splider
        gap={16}
        slides={
          isLoading ? renderSkeletons({ template: 'card', limit: 5 }) : slides
        }
      />
    </div>
  );
});

MobileSlider.displayName = 'MobileSlider';
