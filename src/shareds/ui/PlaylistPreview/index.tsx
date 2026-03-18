import {
  FC,
  memo,
} from 'react';

import Image from 'next/image';
import { ADAPTIVE_SIZE } from '@/shareds/constants/elements';

type Props = {
  imageURL: string;
  alt?: string;
};

export const PlaylistPreview: FC<Props> = memo(({
  imageURL,
  alt,
}) => {
  if (!imageURL) {
    return null;
  }

  return (
    <div className="relative h-10 rounded w-18">
      <Image
        src={imageURL}
        className="rounded"
        fill
        style={{
          objectFit: 'cover',
        }}
        sizes={`(max-width: ${ADAPTIVE_SIZE}px) 100vw, 100vw`}
        alt={alt || ''}
      />
    </div>
  );
});

PlaylistPreview.displayName = 'PlaylistPreview';
