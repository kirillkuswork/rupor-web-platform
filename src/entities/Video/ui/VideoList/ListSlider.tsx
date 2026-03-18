import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import { Splider } from 'rupor-ui-kit';
import { SpliderApi } from 'rupor-ui-kit/dist/components/Splider/Splider.types';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { VideoCardWithDetails } from '@/entities/Video/ui/VideoCardWithDetails';
import { IVideoCardWithDetailsProps, TGetActions } from '../../model/types/videoCardWithDetailsProps';

interface IListSliderProps {
  className?: string;
  itemClassName?: string
  data?: IVideoCardWithDetailsProps[]
  sliderApiHandler?: (data: SpliderApi) => void
  isLoading?: boolean
  getVideoActions?: TGetActions;
  index?: number;
  contentListId?: string;
}

export const ListSlider = (props: IListSliderProps) => {
  const {
    className, data, sliderApiHandler, isLoading, itemClassName, getVideoActions, index, contentListId,
  } = props;

  const { elementsArray: slides } = arrayRender({
    items: data,
    additionalProps: {
      className: itemClassName,
      parentIndex: index,
      contentListId: contentListId,
      getVideoActions,
    },
    renderItem: VideoCardWithDetails,
    listKey: 'videoId',
  });

  if (!slides?.length) {
    return;
  }

  return (
    <Splider
      onGetApi={sliderApiHandler}
      className={className}
      slides={
      isLoading
        ? renderSkeletons({ template: 'card', limit: 10, className: itemClassName })
        : slides
      }
    />
  );
};
