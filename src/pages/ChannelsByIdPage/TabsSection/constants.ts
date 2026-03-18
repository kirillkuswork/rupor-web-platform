export type TabValue = 'home' | 'playlists';

export type TabUrl = '' | 'playlists';

export type Tab = {
  title: string,
  value: TabValue,
  url: TabUrl,
};

export const tabs: Tab[] = [
  {
    title: 'Tabs_Group_Tab_Title',
    value: 'home',
    url: '',
  },
  // {
  //     title: 'Плейлисты',
  //     value: 'playlists',
  //     url: 'playlists',
  // },
];
