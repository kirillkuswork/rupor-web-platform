type ExtractProps<C, T> =
  C extends React.ComponentType<infer P> ? Omit<P, keyof T> : never;

// eslint-disable-next-line
interface IList<T, C extends React.ComponentType<any>> {
  items?: T[];
  limit?: number;
  additionalProps?: Partial<ExtractProps<C, T>>;
  handlers?: Record<string, (...args: never[]) => void>;
  renderItem: C;
  listKey?: keyof T;
}

type RenderResult = {
  elementsArray: JSX.Element[];
  Element: () => JSX.Element;
};

// eslint-disable-next-line
export const arrayRender = <T, C extends React.ComponentType<any>>({
  items,
  renderItem: RenderItem,
  additionalProps,
  handlers,
  limit = items?.length,
  listKey,
}: IList<T, C>): RenderResult => {
  const elementsArray = items?.slice(0, limit).map((item, index) => {
    const props = {
      ...item,
      ...additionalProps,
      handlers,
    } as JSX.LibraryManagedAttributes<C, T & Partial<ExtractProps<C, T>>>;

    const key = listKey && item[listKey] ? item[listKey] : index;

    return <RenderItem key={`${key}`} {...props} index={`${index + 1}`} />;
  }) ?? [];

  // eslint-disable-next-line react/jsx-no-useless-fragment
  const Element = () => <>{elementsArray}</>;

  return { elementsArray, Element };
};
