import { CSSProperties, ElementType } from 'react';

import { Skeleton } from 'rupor-ui-kit';
import { SkeletonProps } from 'rupor-ui-kit/dist/components/Skeleton/Skeleton.types';
import { id } from 'postcss-selector-parser';

type Props = {
  limit: number;
  template?: SkeletonProps['template'];
  style?: CSSProperties;
  className?: string;
  wrapper?: ElementType;
  dti?: string;
};

export const renderSkeletons = ({
  limit,
  template,
  style,
  className,
  dti,
  wrapper: Wrapper,
}: Props) => [...Array(limit)].map((_, key) => {
  const skeleton = (
    <Skeleton
      // eslint-disable-next-line react/no-array-index-key
      key={key}
      data-testid={`${dti}-skeleton-${key}`}
      template={template}
      style={style}
      className={className}
    />
  );

  // eslint-disable-next-line react/no-array-index-key
  return Wrapper ? <Wrapper key={key}>{skeleton}</Wrapper> : skeleton;
});
