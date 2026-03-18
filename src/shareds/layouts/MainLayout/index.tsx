import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MainLayout as Layout } from 'rupor-ui-kit';
import { useSelector } from 'react-redux';
import { useActions } from '@/shareds/hooks/useActions';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { selectors } from '@/redux/selectors';
import clsx from 'clsx';
import { headerActions } from '@/redux/actions/headerActions';
import { MainSearch } from '@/features';
import { LeftMenu, TopBar } from '@/widgets';
import { IMainLayoutProps } from './types';
import { ROUTES_WITH_THIN_MENU } from './constants';

const {
  Page,
  Main,
} = Layout;

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  const { isLeftMenuThin, isMobileSearchOpen } = useSelector(selectors.headerSelector);
  const { setIsLeftMenuThin, setIsMobileSearchOpen, setIsResultsDropdownShown } = useActions(headerActions);
  const { isMobile } = useIsMobile();
  const isSearchResultsPage = pathname.includes('search-results');

  useEffect(() => {
    const segment = pathname?.split('/')?.[1];
    setIsLeftMenuThin(ROUTES_WITH_THIN_MENU?.includes(`/${segment}`));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setIsMobileSearchOpen(false);
    setIsResultsDropdownShown(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <Page
      id="page-container"
      className={clsx(isMobileSearchOpen && !isSearchResultsPage && 'md:grid-rows-[auto]', 'h-screen overflow-y-auto')}
      thinAside={isLeftMenuThin}
    >
      {isMobileSearchOpen && isMobile ? <MainSearch /> : <TopBar />}
      <LeftMenu />
      <Main>
        {children}
        <div id="popover" />
      </Main>
    </Page>
  );
};

export default MainLayout;
