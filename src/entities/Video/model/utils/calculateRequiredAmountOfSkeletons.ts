const minimumAmountOfSkeletons = 20;

export const calculateRequiredAmountOfSkeletons = (
  itemsInRow: number,
  itemsInTheLastRow: number,
) => {
  const minimumAmountOfSkeletonsDivided = minimumAmountOfSkeletons % itemsInRow;
  if (!minimumAmountOfSkeletonsDivided
        || minimumAmountOfSkeletonsDivided + itemsInTheLastRow === itemsInRow) {
    return minimumAmountOfSkeletons;
  }
  const roundedMinimumAmountOfSkeletons = minimumAmountOfSkeletonsDivided
    ? minimumAmountOfSkeletons + itemsInRow - minimumAmountOfSkeletonsDivided
    : minimumAmountOfSkeletons;
  const requiredSkeletonsAmount = roundedMinimumAmountOfSkeletons
        + (itemsInTheLastRow ? itemsInRow - itemsInTheLastRow : 0);

  return requiredSkeletonsAmount;
};
