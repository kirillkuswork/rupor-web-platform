export const findDifferences = <T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> => {
  const differences: Record<string, any> = {};

  Object.keys(obj2).forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (
      typeof value1 === 'object'
            && typeof value2 === 'object'
            && value1 !== null
            && value2 !== null
            && !Array.isArray(value1)
            && !Array.isArray(value2)
    ) {
      const nestedDifferences = findDifferences(value1, value2);

      if (Object.keys(nestedDifferences).length > 0) {
        differences[key] = nestedDifferences;
      }
    } else if (value1 !== value2) {
      differences[key] = value2;
    }
  });

  return differences as Partial<T>;
};
