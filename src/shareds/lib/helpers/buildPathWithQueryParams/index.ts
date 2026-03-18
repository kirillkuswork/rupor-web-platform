import { typedObjectEntries } from '@/shareds/lib/utils/typedObjectEntries';
import { isNullOrUndefined } from '@/shareds/lib/helpers/isUndefinedType';

type QueryParams = Record<string, string | number | undefined | null>;

const isValueNullUndefinedOrShouldBeCheckedOnFalsy = (
  queryParams: QueryParams,
  key: string,
  checkFalsyValue?: string[],
) => {
  if (checkFalsyValue?.length) {
    return checkFalsyValue.includes(key) ? !(queryParams[key]) : isNullOrUndefined(queryParams[key]);
  }
  return isNullOrUndefined(queryParams[key]);
};

export const buildPathWithQueryParams = (
  basePath: string,
  queryParams: QueryParams,
  checkFalsyValue?: string[],
) => {
  const buildParams = typedObjectEntries(queryParams)
    .map(([key, value]) => (!isValueNullUndefinedOrShouldBeCheckedOnFalsy(queryParams, key, checkFalsyValue) ? (`${key}=${value}`) : ''))
    .filter(Boolean).join('&');

  return `${basePath}?${buildParams}`;
};
