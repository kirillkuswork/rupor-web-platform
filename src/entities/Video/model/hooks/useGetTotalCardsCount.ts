import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/shareds/hooks/useDebounce';
import { isBrowser } from '@/shareds/lib/utils/isBrowser';
import { calculateRequiredAmountOfSkeletons } from '../utils/calculateRequiredAmountOfSkeletons';

interface IUseGetTotalCardsCountProps {
  elementsLength?: number;
  container?: HTMLElement | null
}

const defaultItemsInRow = 3;

export const useGetRequiredSkeletonsCount = ({ elementsLength = 0, container }: IUseGetTotalCardsCountProps) => {
  const gridBlock = isBrowser ? container?.querySelector('.auto-grid') : null;

  const [itemsInRow, setItemsInRow] = useState(defaultItemsInRow);

  const itemsInTheLastRow = elementsLength % itemsInRow;

  const requiredSkeletonsCount = useMemo(() => calculateRequiredAmountOfSkeletons(
    itemsInRow,
    itemsInTheLastRow,
  ), [itemsInRow, itemsInTheLastRow]);

  const checkItemsInRow = useDebounce(() => {
    if (!container) {
      return;
    }
    const totalWidth = Number(getComputedStyle(container).gridTemplateColumns.split('px')[0]);
    const blockWidth = gridBlock
      ? Number(getComputedStyle(gridBlock).gridTemplateColumns.split('px')[0])
      : 0;

    setItemsInRow(blockWidth ? Math.floor(totalWidth / blockWidth) : defaultItemsInRow);
  }, 100);

  useEffect(() => {
    checkItemsInRow();

    window.addEventListener('resize', checkItemsInRow);

    return () => {
      window.removeEventListener('resize', checkItemsInRow);
    };
  }, [checkItemsInRow]);

  return {
    requiredSkeletonsCount,
  };
};
