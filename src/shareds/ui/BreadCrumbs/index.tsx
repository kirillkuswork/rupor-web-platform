import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { BreadCrumbs as Crumbs } from 'rupor-ui-kit';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';

export type Route = {
  text: string;
  href: string;
};

type Props = {
  routes: Route[];
  className?: string;
  dti?: string;
  id?: number | string;
};

export const BreadCrumbs = ({
  routes, className, dti, id,
}: Props) => {
  const { t } = useTranslation();

  const routeItem = useCallback((route: Route) => (
    <Link href={route.href} passHref key={route.text}>
      <Crumbs.Route
        data-testid={`${dti}-${route.text}${id ? `_${id}` : ''}`}
        className="dark:hover:text-white/20"
      >
        {t(route.text)}
        <Crumbs.IconRight
          data-testid={`${dti}-icon${id ? `_${id}` : ''}`}
          className="mx-2"
        />
      </Crumbs.Route>
    </Link>
  ), []);

  const { Element: Routes } = arrayRender({ items: routes, renderItem: routeItem, listKey: 'text' });

  return (
    <Crumbs.Wrapper className={className}>
      <Routes />
    </Crumbs.Wrapper>
  );
};
