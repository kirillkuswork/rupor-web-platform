type PluralizeType = (
  number: number,
  words: [string, string, string],
) => string;

export const pluralize: PluralizeType = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
