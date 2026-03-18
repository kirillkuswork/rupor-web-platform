import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import {
  BookMarkIcon,
  CategoryIcon,
  ClipsIcon,
  ClockIcon,
  ExclamationMark,
  HelpIcon,
  HistoryIcon,
  HouseIcon,
  IdeasIcon,
  InfoIcon,
  SubscriptionsIcon,
  TvIcon,
} from 'rupor-ui-kit';

export const mainSection = [
  {
    href: APP_PATHS_PAGES.home,
    icon: <HouseIcon height={20} />,
    title: 'Menu_main',
  },
  {
    href: APP_PATHS_PAGES.categories,
    icon: <CategoryIcon height={20} />,
    title: 'Menu_category',
  },
  {
    href: APP_PATHS_PAGES.subscriptions,
    icon: <SubscriptionsIcon height={20} />,
    title: 'Menu_subscription',
  },
  {
    href: APP_PATHS_PAGES.channels,
    title: 'Common_channels',
    icon: <ClipsIcon height={20} />,
  },
];

export const mainSectionNotAuth = [
  {
    href: APP_PATHS_PAGES.home,
    icon: <HouseIcon />,
    title: 'Menu_main',
  },
  {
    href: APP_PATHS_PAGES.categories,
    icon: <CategoryIcon />,
    title: 'Menu_category',
  },
];

export const channelsSectionNotAuth = [
  {
    href: '/channels',
    title: 'Common_channels',
    icon: <ClipsIcon />,
  },
];

export const tvSection = [
  {
    href: APP_PATHS_PAGES.tvBattle,
    icon: <TvIcon color="#FC203C" />,
    title: 'Menu_tvbattle',
  },
  {
    href: APP_PATHS_PAGES.kickStarter,
    icon: <IdeasIcon color="#FC203C" />,
    title: 'Menu_kickstarter',
  },
];

export const playlistSection = [
  {
    href: APP_PATHS_PAGES.watchLater,
    icon: <ClockIcon height={20} />,
    title: 'Menu_watch_later_long',
  },
  {
    href: APP_PATHS_PAGES.saved,
    icon: <BookMarkIcon height={20} />,
    title: 'Menu_saves',
  },
  {
    href: APP_PATHS_PAGES.history,
    icon: <HistoryIcon height={20} />,
    title: 'Menu_history',
  },
];

export const miscSection = [
  {
    href: APP_PATHS_PAGES.info,
    icon: <HelpIcon height={20} />,
    title: 'Menu_FAQ',
  },
  {
    href: APP_PATHS_PAGES.contact,
    icon: <InfoIcon height={20} />,
    title: 'Menu_legal_information',
  },
];

export const testSection = [
  {
    icon: <ExclamationMark />,
    title: 'Menu_bugreport',
  },
];
