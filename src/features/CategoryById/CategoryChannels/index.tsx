import { FC, memo, useEffect } from 'react';

import { useGetChannelsQuery } from '@/redux/services/channels';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { Order } from '@/shareds/types/sortOrder';
import { ChannelsSlider } from './ChannelsSlider';

interface ICategoryChannels {
  categoryId: number;
  categoryTitle?: string;
  href?: string;
  dti?: string
}

export const CategoryChannels: FC<ICategoryChannels> = memo(({
  categoryId,
  categoryTitle,
  href,
  dti,
}) => {
  const { data, isFetching, refetch } = useGetChannelsQuery({
    category: categoryId,
    limit: 0,
    sortCreatedAt: Order.SortOrderDesc,
  });
  const { isAuth } = useSelector(selectors.userSelector);

  const channels = data?.channels;

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <ChannelsSlider
      dti={dti}
      channels={channels}
      isLoading={isFetching}
      categoryId={categoryId}
      categoryTitle={categoryTitle}
      href={href}
    />
  );
});

CategoryChannels.displayName = 'CategoryChannels';
