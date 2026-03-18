import { Button, SaveIcon } from 'rupor-ui-kit';
import { useAddVideoToSavedOption } from '@/features/AddVideoToPlaylist';
import { IVideoCardWithDetailsProps } from '@/entities/Video';

interface IAddVideoToSavedPlaylistProps {
  videoData: IVideoCardWithDetailsProps;
  dti?: string;
}

export const AddVideoToSavedPlaylist = (
  props: IAddVideoToSavedPlaylistProps,
) => {
  const { videoData, dti = '' } = props;

  const { onClick } = useAddVideoToSavedOption({ videoData });

  const dataTestId = dti
    ? `${dti}-additional-icon-3_${videoData.videoId}`
    : `additional-icon-3_${videoData.videoId}`;

  return (
    <Button
      data-testid={dataTestId}
      variant="quaternary"
      className="w-8 flex items-center justify-center"
      onClick={onClick}
    >
      <SaveIcon
        isFilled={videoData.saved}
      />
    </Button>
  );
};
