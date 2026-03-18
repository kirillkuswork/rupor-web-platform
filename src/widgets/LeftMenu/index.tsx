import { memo } from 'react';
import { useActions } from '@/shareds/hooks/useActions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { headerActions } from '@/redux/actions/headerActions';
import { NavBar } from './NavBar';
import MenuSection from './MenuSection';
import { mainSection, miscSection, playlistSection } from './constants';

export const LeftMenu = () => {
  const { setIsLeftMenuOpen } = useActions(headerActions);
  const { isMobileSearchOpen, isLeftMenuOpen } = useSelector(selectors.headerSelector);
  const handleToggleMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);

  return (
    <NavBar.Main
      isOpen={isLeftMenuOpen}
      onClose={handleToggleMenu}
    >
      {!isMobileSearchOpen && (
        <NavBar.Container>
          <NavBar.Wrapper>
            <MenuSection sections={mainSection} />
            <MenuSection sections={playlistSection} />
            <MenuSection sections={miscSection} />
          </NavBar.Wrapper>
        </NavBar.Container>
      )}
    </NavBar.Main>
  );
};

export default memo(LeftMenu);
