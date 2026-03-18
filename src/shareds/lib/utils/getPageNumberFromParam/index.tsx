// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPageNumberFromParam = (param: any): number => {
  if (param && typeof param === 'string' && param.includes('page-')) {
    return +param.replace('page-', '');
  }

  return 0;
};
