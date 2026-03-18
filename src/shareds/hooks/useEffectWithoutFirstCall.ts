import { useEffect, useRef } from 'react';

export const useEffectWithoutFirstCall = <T>(callback: () => void, args: T[] = []) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, args);
};
