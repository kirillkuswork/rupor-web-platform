export const getStartTime = (videoId?: string, startTimeFromUrl?: string) => {
  const num = Number(startTimeFromUrl);
  if (startTimeFromUrl && !Number.isNaN(num)) {
    return num;
  }

  if (typeof window === 'undefined' || !videoId) return 0;

  try {
    const data = localStorage.getItem('playerParams');
    if (data) {
      const obj = JSON.parse(data);
      const playerParams = obj?.[videoId];
      if (playerParams?.time) {
        return Number(playerParams.time);
      }
    }
  } catch { /* empty */ }

  return 0;
};
