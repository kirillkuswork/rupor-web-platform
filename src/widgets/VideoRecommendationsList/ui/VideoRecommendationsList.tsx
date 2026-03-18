import { AutoGridVideoCardNotFound, TVideoCardVariants, VideoList } from '@/entities/Video';
import { EmptyContainer, Paper } from '@/shareds';
import { RefObject } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useGetVideoActions } from '../model/hooks/useGetVideoActions';
import { useVideoRecommendationsList } from '../model/hooks/useVideoRecommendationsList';

interface IErrorComponentProps {
  onError: () => void;
  isError: boolean;
}

// TODO:: Сделать preloaded state
interface IVideoRecommendationsListProps {
  limit?: number
  categoryId?: number
  cardVariant?: TVideoCardVariants
  scrollElement?: RefObject<HTMLDivElement>
  errorComponent?: (props: IErrorComponentProps) => JSX.Element
  notFoundComponent?: () => JSX.Element
  className?: string
  dti?: string
}

const BaseErrorComponent = ({ onError, isError }: IErrorComponentProps) => (
  <Paper>
    <EmptyContainer
      text="Base_Error_Component_Empty_Container_Text"
      subtitleText="Video_error"
      height={300}
      errorHandler={{ refetch: onError, isError }}
    />
  </Paper>
);

const BaseNotFoundComponent = () => (
  <Paper>
    <AutoGridVideoCardNotFound />
  </Paper>
);

export const VideoRecommendationsList = (props: IVideoRecommendationsListProps) => {
  const {
    limit = 40,
    categoryId,
    // Либо вместо компонентов сделать ручки наверх
    // Пока хз как лучше
    errorComponent: ErrorComponent = BaseErrorComponent,
    notFoundComponent: NotFoundComponent = BaseNotFoundComponent,
    cardVariant = 'vertical',
    scrollElement,
    className,
    dti,
  } = props;

  const { authVersion } = useSelector(selectors.userSelector);
  const { isMobile } = useIsMobile();

  const adaptiveLimit = isMobile ? limit : 100;

  const {
    isError, isFetching, videos, onEndReached, fetchVideoList, isLastPage,
  } = useVideoRecommendationsList({ limit: adaptiveLimit, categoryId });

  if (isError) {
    return <ErrorComponent onError={fetchVideoList} isError={isError} />;
  }

  if (!videos.length && !isFetching) {
    return <NotFoundComponent />;
  }

  return (
    <VideoList.Grid
      key={authVersion}
      data={videos}
      hasNextPage={!isLastPage}
      isLoading={isFetching}
      onEndReached={onEndReached}
      cardVariant={cardVariant}
      scrollElement={scrollElement}
      className={className}
      getVideoActions={useGetVideoActions}
      dti={dti || ''}
      limit={adaptiveLimit}
    />
  );
};
