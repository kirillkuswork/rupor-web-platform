export function createDeclensions(count: number, declensions: string[]) {
  const countToFormat = Math.abs(count) % 100;
  const n1 = count % 10;

  if (countToFormat > 10 && countToFormat < 20) {
    return declensions[2];
  }
  if (n1 > 1 && n1 < 5) {
    return declensions[1];
  }
  if (n1 === 1) {
    return declensions[0];
  }

  return declensions[2];
}
