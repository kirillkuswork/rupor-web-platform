export const getMinutesLeft = (timestamp: string | undefined): number => {
  const targetDate = new Date(timestamp!);
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  const minutes = Math.max(0, Math.floor(diffMs / 60000));
  return Math.max(0, minutes);
};
