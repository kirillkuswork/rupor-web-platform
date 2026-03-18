import { FC, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { NavBar } from 'rupor-ui-kit';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useActions } from '@/shareds/hooks/useActions';
import { headerActions } from '@/redux/actions/headerActions';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import useIsMobile from '@/shareds/hooks/useIsMobile';

type Props = LinkProps & {
  isOpen?: boolean;
  icon: JSX.Element;
  title: string;
  as?: string
};

const { Item } = NavBar;

const ACTIVE_NESTED_ROUTES = [
  APP_PATHS_PAGES.info,
  APP_PATHS_PAGES.saved,
  APP_PATHS_PAGES.categories,
  APP_PATHS_PAGES.subscriptions,
  APP_PATHS_PAGES.channels,
];

const MenuItem: FC<Props> = ({
  title, icon, href, isOpen,
  ...props
}) => {
  const { asPath, isReady } = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setIsLeftMenuOpen } = useActions(headerActions);
  const { isLeftMenuThin } = useSelector(selectors.headerSelector);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = new URL(props.as || href as string, window.location.href)
      .pathname;

    // Using URL().pathname to get rid of query and hash
    const activePathname = new URL(asPath, window.location.href).pathname;

    const compare = (_linkPathname: string) => {
      // проверка, находимся ли мы на странице каналов при клике из подписок
      if (activePathname.includes(APP_PATHS_PAGES.channelsSuggestions) && _linkPathname === APP_PATHS_PAGES.subscriptions) {
        return setIsActive(true);
      }

      if (!ACTIVE_NESTED_ROUTES.some((route) => activePathname.includes(route))) {
        return setIsActive(_linkPathname === activePathname);
      }
      // Если на роутах /info/[id], info/[id]/[id]
      // /categories/[id], categories/[id]/[id]
      // и /playlist/saved/[id], то нужно подсвечивать этот роут
      // доп проверка, что не находимся на странице предложений каналов,
      // чтобы избежать двойной подсветки пунктов меню
      if (ACTIVE_NESTED_ROUTES.includes(_linkPathname)) {
        return setIsActive(activePathname.includes(_linkPathname) && !activePathname.includes(APP_PATHS_PAGES.channelsSuggestions));
      }

      return setIsActive(false);
    };
    compare(linkPathname);
  }, [
    asPath,
    isReady,
    href,
    props.as,
  ]);

  const handleClick = () => {
    setIsLeftMenuOpen(false);
  };

  return (
    <Link
      {...props}
      href={href}
      passHref
      onClick={handleClick}
    >
      <Item
        className={clsx(isLeftMenuThin && !isMobile && '!px-0')}
        selected={isActive}
        icon={icon}
        label={t(title)}
      />
    </Link>
  );
};
export default MenuItem;
