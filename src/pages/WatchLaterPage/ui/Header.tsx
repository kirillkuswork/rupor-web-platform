import { BlockHeaderInner } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type Props = {
  totalItems?: number;
};

export const WatchLaterHeader = ({ totalItems = 0 }: Props) => {
  const { t } = useTranslation();

  return (
    <BlockHeaderInner.Container split>
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.Title
          data-testid="watch-later-header"
          className="!mr-6 text-headline-s md:text-headline-xs md:!mr-4"
        >
          {t('Watch_Later_Header_Title')}
        </BlockHeaderInner.Title>
        {!!totalItems && (
          <BlockHeaderInner.Subtitle
            data-testid="watch-later-count"
            className="text-headline-s font-semibold md:text-paragraph-m-s"
          >
            {totalItems}
          </BlockHeaderInner.Subtitle>
        )}
      </BlockHeaderInner.TitleWrapper>
    </BlockHeaderInner.Container>
  );
};
