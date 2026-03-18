import { PlaylistPreview } from '@/shareds/ui/PlaylistPreview';
import { FC, memo } from 'react';

type Props = {
  previewImageURL?: string;
};

export const NotificationPlaylistActionsPreviewDesktop: FC<Props> = memo(({ previewImageURL }) => {
  if (!previewImageURL) {
    return <div className="flex justify-center h-10 rounded w-18 dark:bg-black/40" />;
  }

  return <PlaylistPreview imageURL={previewImageURL} />;
});

NotificationPlaylistActionsPreviewDesktop.displayName = 'NotificationPlaylistActionsPreviewDesktop';
