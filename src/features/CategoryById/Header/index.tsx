import { BlockHeaderInner, Skeleton } from 'rupor-ui-kit';
import { BreadCrumbs, Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';

const routes = [
  {
    text: 'Category_Page_Header',
    href: APP_PATHS_PAGES.categories,
  },
];

interface IHeader {
  categoryId?: number
  categoryTitle?: string
  isFetching?: boolean
}

export const Header = ({ categoryId, isFetching, categoryTitle }: IHeader) => (
  <Paper className="pt-3.5 md:py-4.5 md:px-4 md:mb-4">
    <BreadCrumbs
      id={categoryId}
      dti="category-breadcrumbs"
      className="md:my-0 md:mb-[5px]"
      routes={routes}
    />
    <BlockHeaderInner.Title className="text-headline-s">
      {isFetching ? <Skeleton className="h-8 max-w-[200px] rounded" /> : categoryTitle}
    </BlockHeaderInner.Title>
  </Paper>
);
