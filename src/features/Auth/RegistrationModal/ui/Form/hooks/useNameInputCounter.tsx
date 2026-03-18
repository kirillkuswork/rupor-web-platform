import {
  useCallback,
  useState,
} from 'react';
import { useAuthModal } from '@/providers/AuthModalProvider';

type CounterData = {
  isVisible: boolean;
  isError: boolean;
};

export const useNameInputCounter = (
  nameLengthMin: number,
  nameLengthMax: number,
  visibleTresholdOnChange: number = 20,
) => {
  const [counterData, setCounterData] = useState<CounterData>({
    isVisible: false,
    isError: false,
  });

  const { updateModalParams } = useAuthModal();

  const onNameInputSubmit = useCallback((name: string) => {
    if (name.length > 0 && name.length < nameLengthMin) {
      setCounterData({
        isVisible: true,
        isError: true,
      });
    } else if (name.length > nameLengthMax) {
      setCounterData({
        isVisible: true,
        isError: true,
      });
    } else {
      // do nothing
    }
  }, [setCounterData, nameLengthMin, nameLengthMax]);

  const onNameInputChange = useCallback((name: string) => {
    updateModalParams({ name });
    if (name.length < visibleTresholdOnChange) {
      setCounterData({
        isVisible: false,
        isError: false,
      });
    } else if (name.length >= visibleTresholdOnChange && name.length < nameLengthMax) {
      setCounterData({
        isVisible: true,
        isError: false,
      });
    } else if (name.length > nameLengthMax) {
      setCounterData({
        isVisible: true,
        isError: true,
      });
    } else {
      setCounterData({
        isVisible: false,
        isError: false,
      });
    }
  }, [setCounterData, visibleTresholdOnChange, nameLengthMax]);

  return {
    isVisible: counterData.isVisible,
    isError: counterData.isError,
    onNameInputChange,
    onNameInputSubmit,
  };
};
