import {
  ICommentSortData,
  TFormattedSortOrder,
} from '@/widgets/VideoByIdComments';
import { IOption, SortButton, SortVariants } from '@/shareds/ui/SortButton';
import { useTranslation } from 'next-i18next';
import { Order, SortField } from '@/shareds/types/sortOrder';
import { useRouter } from 'next/router';

const mapSortButtonVariantsToComments: Record<
  TFormattedSortOrder,
  SortVariants
> = {
  SORT_ORDER_ASC: 'ASC',
  SORT_ORDER_DESC: 'DESC',
};

interface ICommentsSortButtonProps {
  commentSort: ICommentSortData;
  onChangeSort: (sort: ICommentSortData) => void;
}

export const CommentsSortButton = (props: ICommentsSortButtonProps) => {
  const { commentSort, onChangeSort } = props;

  const currentSortValue =
    mapSortButtonVariantsToComments[
      commentSort.sortOrder || Order.SortOrderDesc
    ];

  const { query } = useRouter();

  const { t } = useTranslation();

  const mapLabelToSort: Record<TFormattedSortOrder, string> = {
    // TODO на беке не правильно переводится сортиврока - временной решение
    SORT_ORDER_ASC: t('Sort_By_Old_First'),
    SORT_ORDER_DESC: t('Sort_By_New_First'),
  };

  const sortButtonOptions: IOption<string, TFormattedSortOrder>[] = [
    {
      label: mapLabelToSort.SORT_ORDER_ASC,
      value: Order.SortOrderAsc,
    },
    {
      label: mapLabelToSort.SORT_ORDER_DESC,
      value: Order.SortOrderDesc,
    },
  ];

  const onClickSortHandler = ({
    value,
  }: IOption<string, TFormattedSortOrder>) => {
    onChangeSort({ sortOrder: value, sortField: SortField.SortFieldCreatedAt });
  };

  return (
    <SortButton
      videoId={query?.id as string}
      dti="video-comments-header"
      label={mapLabelToSort[commentSort.sortOrder]}
      currentSortValue={currentSortValue}
      options={sortButtonOptions}
      onClick={onClickSortHandler}
    />
  );
};
