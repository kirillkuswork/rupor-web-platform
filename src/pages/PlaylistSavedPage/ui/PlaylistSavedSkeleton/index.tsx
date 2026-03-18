import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import { Paper } from '@/shareds/ui';
import { memo } from 'react';

import {
  Skeleton,
  Splider,
} from 'rupor-ui-kit';

export const PlaylistSavedSkeleton = memo(() => (
  <Paper className="overflow-hidden min-h-[340px]">
    <div className="mb-6">
      <Skeleton
        className="w-20 md:w-[131px] h-3 rounded-full"
        animation
      />
    </div>
    <div>
      <Splider
        slides={renderSkeletons({ template: 'card', limit: 10 })}
      />
    </div>
  </Paper>
));

PlaylistSavedSkeleton.displayName = 'PlaylistSavedSkeleton';
