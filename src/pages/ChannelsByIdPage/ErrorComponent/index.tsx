import {
  Button, Paper,
} from 'rupor-ui-kit';

import { EmptyContainer } from '@/shareds/ui';
import Link from 'next/link';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';

export const ErrorComponent = () => (
  <Paper className="h-full mb-0">
    <EmptyContainer
        // TODO: translate
      text="Канал недоступен"
      subtitleText="Канал был удален автором"
      isPage
      button={(
        <Link href={APP_PATHS_PAGES.home} passHref>
          <Button className="text-center" variant="primary">На главную</Button>
        </Link>
        )}
    />
  </Paper>
);
