import { HFlex, TGapTypes } from '@/shareds/ui/Flex';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import { VideoCardWithDetails } from '../VideoCardWithDetails';
import { IVideoCardWithDetailsProps } from '../../model/types/videoCardWithDetailsProps';

export interface IListHorizontalProps {
  data?: IVideoCardWithDetailsProps[]
  isLoading?: boolean
  columnCount?: number
  gap?: TGapTypes
  className?: string
  itemClassName?: string
  index?: number
  contentListId?: string
}

export const ListHorizontal = (props: IListHorizontalProps) => {
  const {
    data,
    isLoading,
    columnCount = 3,
    className,
    itemClassName,
    gap = '8',
    index,
    contentListId,
  } = props;

  const { elementsArray: videoCardList } = arrayRender({
    items: data,
    renderItem: VideoCardWithDetails,
    additionalProps: {
      parentIndex: index,
      contentListId: contentListId,
      className: itemClassName,
    },
    limit: columnCount,
    listKey: 'videoId',
  });

  const skeletonsList = renderSkeletons({
    template: 'card',
    className: itemClassName,
    limit: columnCount,
  });

  return (
    <HFlex gap={gap} className={className}>
      {isLoading ? skeletonsList : videoCardList}
    </HFlex>
  );
};
