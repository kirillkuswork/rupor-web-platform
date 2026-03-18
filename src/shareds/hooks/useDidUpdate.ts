import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
} from 'react';

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      return effect();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
