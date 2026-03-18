import React, { memo } from 'react';

import {
  BlockHeaderInner,
  Skeleton,
} from 'rupor-ui-kit';

import { Paper } from '@/shareds';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';

const SkeletonsByDate = () => (
  <Paper>
    <BlockHeaderInner.Title>
      <Skeleton style={{
        width: 200,
        height: 30,
        marginBottom: 22,
        borderRadius: 16,
      }}
      />
    </BlockHeaderInner.Title>
    <div className="auto-grid">
      {renderSkeletons({ template: 'card', limit: 20 })}
    </div>
  </Paper>
);

export default memo(SkeletonsByDate);
