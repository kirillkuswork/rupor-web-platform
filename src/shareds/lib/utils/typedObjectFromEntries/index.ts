/* Функция для типизированного вызова Object.fromEntries */
export const typedObjectFromEntries = <
    T extends readonly (readonly [PropertyKey, unknown])[],
>(
    entries: T,
  ): {
    [K in T[number] as K[0]]: K[1]
  } => Object.fromEntries(entries) as {
    [K in T[number] as K[0]]: K[1]
  };
