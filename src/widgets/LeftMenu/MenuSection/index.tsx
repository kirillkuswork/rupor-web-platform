import { NavBar } from 'rupor-ui-kit';

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import MenuItem from './MenuItem';

type SectionT = {
  href: string
  icon: JSX.Element
  title: string
  shortTitle?: string
};

type Props = {
  sections: SectionT[]
};

const { Section } = NavBar;

const MenuSection: FC<Props> = ({
  sections,
}) => {
  const { isLeftMenuThin } = useSelector(selectors.headerSelector);

  return (
    <Section>
      {sections.map(({
        icon, title, href, shortTitle,
      }) => (
        <MenuItem
          data-testid={`menu-item-${title}`}
          key={title}
          icon={icon}
          href={href}
          title={!isLeftMenuThin ? title : shortTitle ?? title}
        />
      ))}
    </Section>
  );
};
export default MenuSection;
