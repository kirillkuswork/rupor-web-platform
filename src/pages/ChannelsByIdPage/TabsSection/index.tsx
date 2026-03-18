import { useMemo } from 'react';

import AllVideoTab from './AllVideoTab';
import { TabValue } from './constants';

type Props = {
  tabName: TabValue;
  channelId: string;
};
// TODO по необходимости вернуть возможность менять тип отображения, когда дизайнеры определятся
export const TabsContent = ({ tabName, channelId }: Props) => {
  const tabContent = useMemo(() => {
    switch (tabName) {
      // case 'playlists':
      //   return (
      //     <PlaylistsTab
      //       channelId={channelId}
      //     // gridType={gridType}
      //     />
      //   );
      default:
        return (
          <AllVideoTab channelId={channelId} />
        );
    }
  }, [tabName, channelId]);

  return tabContent;
};
