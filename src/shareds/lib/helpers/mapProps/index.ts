import { typedObjectEntries } from '@/shareds/lib/utils/typedObjectEntries';

type Schema<TSource, TResult> = {
  [K in keyof TResult]: (source: TSource) => TResult[K];
};

export const mapProps = <TSource, TResult>(
  source: TSource,
  schema: Schema<TSource, TResult>,
): TResult => {
  const result = {} as TResult;

  typedObjectEntries(schema).forEach(([key, transform]) => {
    result[key as keyof TResult] = transform(source);
  });

  return result;
};
