/* eslint-disable react/no-unused-prop-types */
import {
  memo,
  useCallback,
} from 'react';

import { useRouter } from 'next/router';
import { TabsBase } from 'rupor-ui-kit';

import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useTranslation } from 'next-i18next';
import { Tab, tabs, TabValue } from '../constants';

type Props = {
  tabName: TabValue;
  channelId: string;
  dti?: string
};

type TabItemProps = {
  title?: string;
  value?: string;
};

export const TabsGroup = memo(({
  tabName,
  channelId,
  dti,
}: Props) => {
  const router = useRouter();
  const handleChange = useCallback((key: string) => {
    const foundTab = tabs.filter((item: Tab) => key === item.value)[0];
    if (foundTab) router.replace(`/channels/${channelId}/${foundTab.url}`);
  }, [channelId, router]);
  const { t } = useTranslation();

  const TabItem = useCallback(({ title, value }: TabItemProps) => (
    <TabsBase.Item
      data-testid={`${dti}-${value}_${channelId}`}
      key={value}
      option="general"
      value={value || ''}
    >
      {t(title!)}
    </TabsBase.Item>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), []);

  const { Element: TabList } = arrayRender({
    items: tabs,
    renderItem: TabItem,
  });

  return (
    <TabsBase.Group
      onChange={handleChange}
      value={tabName}
    >
      <TabList />
    </TabsBase.Group>
  );
});

TabsGroup.displayName = 'TabsGroup';
