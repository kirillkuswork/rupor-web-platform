import { useCallback, useState } from 'react';

export const useRulesInfoVisibilityByName = (
  criteria: RegExp,
  nameLenghtMin: number,
  nameLenghtMax: number,
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onNameInputSubmit = useCallback(
    (name: string) => {
      if (isVisible) {
        return;
      }

      if (name.length < nameLenghtMin) {
        return;
      }

      if (name.length > nameLenghtMax) {
        return;
      }

      if (!criteria.test(name)) {
        setIsVisible(true);
      }
    },
    [criteria, isVisible, nameLenghtMin, nameLenghtMax, setIsVisible],
  );

  return {
    isVisible,
    onNameInputSubmit,
  };
};
