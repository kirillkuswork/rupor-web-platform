import { Loader } from '@/shareds';
import { memo } from 'react';

export const ComplainsLoader = memo(() => (
  <div className="h-[220px]">
    <Loader />
  </div>
));

ComplainsLoader.displayName = 'ComplainsLoader';
