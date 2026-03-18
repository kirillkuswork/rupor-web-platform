/* Функция для проверки матча роута по паттерну и извелечения параметров из роута по шаблону videos/[id] -> {id: string} */
export const matchPath = (pattern: string, path: string): Record<string, string> | null => {
  const patternSegments = pattern.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);

  if (patternSegments.length !== pathSegments.length) return null;

  const params: Record<string, string> = {};

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < patternSegments.length; i++) {
    const pSegment = patternSegments[i];
    const pathSegment = pathSegments[i];

    if (pSegment.startsWith(':')) {
      const paramName = pSegment.slice(1);
      params[paramName] = decodeURIComponent(pathSegment);
    } else if (pSegment !== pathSegment) return null;
  }

  return params;
};
