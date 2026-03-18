import { useEffect, useState } from 'react';

const useTimer = (
  targetTimeISO: string,
  step = 1000,
  onStart?: () => void,
  onEnd?: () => void,
) => {
  const [counter, setCounter] = useState(() => {
    const now = new Date().getTime();
    const target = new Date(targetTimeISO).getTime();
    return Math.max(target - now, 0);
  });

  useEffect(() => {
    onStart?.();
  }, [onStart]);

  useEffect(() => {
    if (counter <= 0) {
      onEnd?.();
      return;
    }

    const timeout = setTimeout(() => {
      setCounter((prev) => Math.max(prev - step, 0));
    }, step);

    return () => clearTimeout(timeout);
  }, [counter, step, onEnd]);

  return counter;
};

export default useTimer;
