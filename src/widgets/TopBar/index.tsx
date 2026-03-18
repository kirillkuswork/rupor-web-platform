import { memo, useCallback } from 'react';
import {
  Button, Overlay, RutubeFullLogo, SearchIcon,
} from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { headerActions } from '@/redux/actions/headerActions';
import { isNewAuthMode } from '@/shareds/lib/utils/isNewAuthMode';
import { LanguageSwitcher, MainSearch } from '@/features';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import Link from 'next/link';
import { NavBar } from '@/widgets/LeftMenu/NavBar';
import clsx from 'clsx';
import { useSendYmMetrics, useAuthModal } from 'rupor-common';
import { DynamicIncognitoIcon } from './IncognitoTopBar/DynamicIncognitoIcon';
import WithAuthContentHeader from './WithAuthContentHeader';
import AuthContentHeader from './AuthContentHeader';
import { Header } from './Header';
import { IncognitoTopBar } from './IncognitoTopBar';

export const TopBar = () => {
  const { isIncognitoMode } = useSelector(selectors.appSelector);
  const { isAuth } = useSelector(selectors.userSelector);
  const { isMobileSearchOpen, isResultsDropdownShown, isLeftMenuOpen } = useSelector(selectors.headerSelector);
  const { setIsMobileSearchOpen } = useActions(headerActions);
  const { isMobile } = useIsMobile();
  const { openModal } = useAuthModal();
  const { setIsLeftMenuOpen } = useActions(headerActions);
  const handleToggleMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);
  const { sendYmMetric } = useSendYmMetrics();

  const handleSearchMenuOpen = useCallback(() => {
    sendYmMetric({ // метрика 2.3.3 	Клик по поисковой строке на всех страницах. Анастасия Комарова (30.06.2025 13:05):
      // Анастасия Комарова(30.06.2025 13:13):
      //   в рутубе все- таки по клику на лупу событие отправляется

      // Анастасия Комарова(30.06.2025 13: 16):
      // > Елена Никитина(30.06.2025 13: 16): можно - тогда когда строка откроется и на нее нажимают то уже не отправлять ?
      // да
      event_group: 'event',
      event_category: 'search',
      event_label: 'poiskovaya_stroka',
      event_name: 'search-element_click-telefon_ili_pochta',
      event_action: 'element_click',
    });
    if (isNewAuthMode() && !isAuth) {
      openModal('login');
    } else {
      setIsMobileSearchOpen(true);
    }
  }, [isAuth, openModal, setIsMobileSearchOpen]);

  return (
    <>
      <div className={clsx(
        'flex items-center fixed top-0 z-[40] gap-[10px]',
        isMobile ? 'h-header-height-mobile left-[16px] w-[95px]' : 'h-header-height left-[35px] w-[148px]',
      )}
      >
        <NavBar.BurgerButton onClick={handleToggleMenu} />
        <Link
          href={APP_PATHS_PAGES.home}
          passHref
          className={clsx(isMobile ? 'w-[67px]' : 'w-[148px]')}
        >
          <RutubeFullLogo
            data-testid="navbar-logo"
          />
        </Link>
      </div>
      <div><IncognitoTopBar /></div>
      <Header.Wrapper className={clsx(
        isMobile ? 'right-[16px] left-[16px]' : 'right-[24px] left-[24px]',
        // Костыль, тк при открытом поиске должен накладываться оверлей
        isResultsDropdownShown ? 'z-[40]' : 'z-[5]',
      )}
      >
        {/* // Элемент, чтобы выровнять другие элементы в header с учетом лого */}
        <div className="w-navbar-width" />
        <div className={clsx('flex items-center w-full')}>
          {isIncognitoMode && <DynamicIncognitoIcon />}
          <Header.Search>
            <div className="flex justify-center text-center cl-dynamic-primary md:hidden">
              {isResultsDropdownShown && !isMobile && <Overlay />}
              <MainSearch />
            </div>
          </Header.Search>
          <Header.Icons className={clsx('flex align-center', isMobile ? 'gap-[10px]' : 'gap-[24px]')}>
            {!isMobileSearchOpen && (
            <Button
              className="hidden cursor-pointer md:block !p-0"
              variant="quaternary"
              onClick={handleSearchMenuOpen}
              id="search"
            >
              <SearchIcon
                className="cl-dynamic-interface-primary"
                height={20}
                width={20}
              />
            </Button>
            )}
            <LanguageSwitcher />
            {isAuth ? <AuthContentHeader /> : <WithAuthContentHeader />}
          </Header.Icons>
        </div>
      </Header.Wrapper>
    </>
  );
};

export default memo(TopBar);
