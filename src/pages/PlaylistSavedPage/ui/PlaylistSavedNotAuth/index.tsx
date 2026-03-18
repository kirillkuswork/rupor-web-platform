import { BlockHeaderInner } from 'rupor-ui-kit';
import { IsNotAuthorized, Paper } from '@/shareds/ui';
import { PlaylistSavedTitle } from '../PlaylistSavedTitle';

export const PlaylistSavedNotAuth = () => (
  <div className="flex flex-col h-full">
    <Paper className="md:py-0">
      <BlockHeaderInner.Container>
        <PlaylistSavedTitle />
      </BlockHeaderInner.Container>
    </Paper>
    <IsNotAuthorized dti="saved-playlist" subtitleText="Watch_Later_Unauthorized_Subtitle_Text" />
  </div>
);
