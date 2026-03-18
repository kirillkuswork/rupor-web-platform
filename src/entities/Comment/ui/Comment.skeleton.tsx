import { Skeleton } from 'rupor-ui-kit';
import { HFlex, VFlex } from '@/shareds/ui/Flex';

export const CommentSkeleton = () => (
  <HFlex maxHeight={false} align="start" gap="8">
    <Skeleton className="w-[24px] h-[24px] squircle" />
    <VFlex maxHeight={false} align="start" gap="8">
      <Skeleton className="w-[140px] h-[25px] rounded" />
      <Skeleton className="w-full h-[75px] rounded" />
    </VFlex>
  </HFlex>
);
