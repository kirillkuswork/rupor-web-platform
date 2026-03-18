import { ComponentProps, useMemo, useState } from 'react';

import { IPlaylist, IVideo } from '@/redux/services/video/baseModel';
import { TDropdownType } from '@/shareds/types/dropdown';
import { mapVideoProps, VideoCard, VideoCardWithDetails } from '@/entities/Video';
import { Paper, SpliderNavigation } from '@/shareds/ui';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import { getPlaylistName, getPlaylistUpdateDate } from '@/shareds/lib/helpers/playlist';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { SpliderApi } from 'rupor-ui-kit/dist/components/Splider/Splider.types.js';
import { Splider } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { PlaylistHeader } from './PlaylistHeader.tsx';
import { PlaylistEmpty } from './PlaylistEmpty';

type Props = {
  playlist: IPlaylist;
  dropDownType?: TDropdownType;
  isLoading: boolean;
  redirectURL?: string;
  emptyText?: string;
  isAvatarShown?: boolean;
  disabledVideoProps?: (keyof ComponentProps<typeof VideoCard>)[];
  dti?: string;
  index?: number;
  contentListId?: string;
};

export const Playlist = ({
  playlist,
  dropDownType,
  isLoading,
  redirectURL = '',
  emptyText,
  isAvatarShown = true,
  disabledVideoProps = [],
  dti,
  index,
  contentListId,
}: Props) => {
  const [sliderApi, handleSliderApi] = useState<SpliderApi>();
  const { videos } = playlist as { videos: IVideo[] };
  const videosLength = playlist.totalVideos || 0;
  const { t } = useTranslation();

  const amountOfVideoStr = t('Playlist_Amount_Of_Video_Str', { videosLength });
  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'moveToAnotherPlaylist', 'addReportToVideo'] });
  const actionsAllSaved = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

  const sliders = useMemo(
    () => (videos || [])?.map((video, i) => (
      <VideoCardWithDetails
        key={video?.id}
        className="w-[300px] md:!w-[269px]"
        publishedAt={video?.createdAt}
        isShowChannelLogo={isAvatarShown}
        getVideoActions={playlist.type === 'saved' ? actionsAllSaved : actions}
        playlistId={playlist?.id}
        {...mapVideoProps([video])[0]}
        dti={dti}
        index={i+1}
        parentIndex={index}
        contentListId={contentListId}
      />
    )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabledVideoProps, dropDownType, isAvatarShown, playlist.id, videos],
  );

  const isSlidersEmpty = !sliders.length;

  return (
    <Paper
      data-testid={`${dti}-wrapper_${playlist.id}`}
      className="md:!p-4 py-4.5 md:!px-4 overflow-hidden min-h-[319px] md:!min-h-fit"
    >
      <div className="mb-4.5 flex justify-between md:!justify-start md:!items-center">
        <PlaylistHeader
          dti={dti}
          playlistId={playlist.id!}
          redirectURL={redirectURL}
          title={playlist.type === 'saved' ? t('Saved_Playlist_Name') : getPlaylistName(playlist)}
          amountOfVideo={amountOfVideoStr}
          updateAt={getPlaylistUpdateDate(playlist.updatedAt!, t!)}
        />
        {sliders.length > 4 && <SpliderNavigation {...sliderApi} />}
      </div>
      <div>
        {isSlidersEmpty && <PlaylistEmpty dti={dti} emptyText={emptyText} />}
        {!!sliders.length && (
          <Splider
            onGetApi={handleSliderApi}
            slides={
              isLoading
                ? renderSkeletons({ template: 'card', limit: 10 })
                : sliders
            }
          />
        )}
      </div>
    </Paper>
  );
};
