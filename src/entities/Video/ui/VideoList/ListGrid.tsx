import { FC, RefObject, useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Skeleton } from 'rupor-ui-kit';
import { isBrowser } from '@/shareds/lib/utils/isBrowser';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import {
  IVideoCardWithDetailsProps,
  TGetActions,
  TVideoCardVariants,
} from '../../model/types/videoCardWithDetailsProps';
import { VideoCardWithDetails } from '../VideoCardWithDetails';
import { useGetRequiredSkeletonsCount } from '../../model/hooks/useGetTotalCardsCount';

interface IListGridProps {
  data?: IVideoCardWithDetailsProps[];
  hasNextPage?: boolean;
  isLoading?: boolean;
  scrollElement?: RefObject<HTMLDivElement>;
  className?: string;
  itemClassName?: string;
  /* Колбек, который выполнится, когда virtuoso доходит до конца списка */
  onEndReached?: () => void;
  cardVariant?: TVideoCardVariants;
  getVideoActions?: TGetActions;
  NotFoundComponent?: FC<object>;
  dti?: string;
  limit?: number;
  contentListId?: string;
}

// Перечень страниц, для которых нужно передавать isShowWatchLaterButton
const pagesWithWatchLaterButton = ['/video'];

export const ListGrid = (props: IListGridProps) => {
  const {
    hasNextPage,
    isLoading,
    data: videos,
    scrollElement,
    className = '',
    itemClassName: itemClassNameExternal = '',
    cardVariant = 'vertical',
    onEndReached,
    getVideoActions,
    NotFoundComponent,
    dti,
    limit,
    contentListId,
  } = props;
  const router = useRouter();
  const currentPath = router.pathname;
  const shouldShowWatchLaterButton = useMemo(() => pagesWithWatchLaterButton.some((path) => currentPath.includes(path)), [currentPath]);

  const { isMobile } = useIsMobile();

  // TODO: Переделать на контекст с useRef, привязка к скроллу page-container может быть много где
  const container = isBrowser
    ? scrollElement?.current ?? document?.getElementById('page-container')
    : null;

  const { requiredSkeletonsCount } = useGetRequiredSkeletonsCount({
    elementsLength: videos?.length,
    container,
  });

  const videosLength = videos?.length ?? 0;

  const isInitialLoading = !videosLength && isLoading;

  const isNextPageLoading = videosLength && hasNextPage && isLoading;

  const elementsCount = () => {
    if (isInitialLoading || isNextPageLoading) {
      if (limit) return videosLength + limit;
      return videosLength + requiredSkeletonsCount;
    }

    return videosLength;
  };

  const listItemRenderHandler = (index: number) => {
    const videoData = videos?.[index];

    const isSkeleton = (isNextPageLoading && !videoData) || isInitialLoading;

    if (isSkeleton) {
      return (
        <Skeleton
          data-testid={`${dti}-skeleton-${index}`}
          key={index}
          template={cardVariant === 'vertical' ? 'card' : 'horizontalCard'}
        />
      );
    }

    if (videoData) {
      return (
        <VideoCardWithDetails
          key={videoData.videoId}
          dti={dti}
          {...videoData}
          index={index + 1}
          getVideoActions={getVideoActions}
          variant={cardVariant}
          isShowWatchLaterButton={shouldShowWatchLaterButton || isMobile}
          contentListId={contentListId}
        />
      );
    }
  };

  const itemClassName = clsx(
    'flex-1 whitespace-nowrap pb-2',
    itemClassNameExternal,
  );

  if (!videos?.length && !isLoading && NotFoundComponent) {
    return <NotFoundComponent />;
  }

  return (
    <VirtuosoGrid
      customScrollParent={container!}
      totalCount={elementsCount()}
      overscan={1000}
      style={{ height: '100%', width: '100%', overflowY: 'hidden' }} // overflowY hidden for windows scroll blink fix
      listClassName={clsx('auto-grid', className)}
      itemContent={listItemRenderHandler}
      id="grid-container"
      itemClassName={itemClassName}
      endReached={onEndReached}
    />
  );
};
