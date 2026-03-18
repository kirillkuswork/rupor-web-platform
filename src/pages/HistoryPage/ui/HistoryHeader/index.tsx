import { Paper } from '@/shareds/ui';
import {
  BlockHeaderInner,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { HistoryHeaderDropdown } from './HistoryHeaderDropdown';

const Title = () => {
  const { t } = useTranslation();

  return (
    <BlockHeaderInner.TitleWrapper>
      <BlockHeaderInner.Title data-testid="history-views-header-title" className="text-headline-s md:text-headline-xs">
        {t('History_Header_Title')}
      </BlockHeaderInner.Title>
    </BlockHeaderInner.TitleWrapper>
  );
};

export const HistoryHeader = ({ hasDropdown = true }: { hasDropdown?: boolean }) => (
  <Paper data-testid="history-views-header-wrapper" className="px-6 py-10 md:!p-4">
    <BlockHeaderInner.Container className="justify-between">
      <Title />
      {hasDropdown && <HistoryHeaderDropdown dti="history-views-header-dropdown" />}
    </BlockHeaderInner.Container>
  </Paper>
);
