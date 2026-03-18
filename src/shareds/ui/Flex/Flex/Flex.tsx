import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';
import styles from './Flex.module.scss';

type JustifyTypes = 'start' | 'end' | 'between' | 'center' | 'around' | 'evenly';

type AlignTypes = 'start' | 'center' | 'end';

type DirectionTypes = 'column' | 'row';

export type TGapTypes = '2' | '4' | '8' | '16' | '24' | '32';

const justifyClasses: Record<JustifyTypes, string> = {
  start: styles.justifyStart,
  end: styles.justifyEnd,
  around: styles.justifyAround,
  between: styles.justifyBetween,
  center: styles.justifyCenter,
  evenly: styles.justifyEvenly,
};

const alignClasses: Record<AlignTypes, string> = {
  start: styles.alignStart,
  end: styles.alignEnd,
  center: styles.alignCenter,
};

const directionClasses: Record<DirectionTypes, string> = {
  row: styles.directionRow,
  column: styles.directionColumn,
};

const gapClasses: Record<TGapTypes, string> = {
  2: styles.gap2,
  4: styles.gap4,
  8: styles.gap8,
  16: styles.gap16,
  24: styles.gap24,
  32: styles.gap32,
};

export interface FlexProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  justify?: JustifyTypes;
  align?: AlignTypes;
  direction?: DirectionTypes;
  children: ReactNode;
  maxWidth?: boolean;
  maxHeight?: boolean
  gap?: TGapTypes;
  wrap?: boolean;
}

const Flex = (props: FlexProps) => {
  const {
    children,
    justify = 'start',
    className,
    align = 'center',
    direction = 'row',
    maxWidth = true,
    maxHeight = true,
    gap,
    wrap = false,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods = {
    [styles.maxWidth]: maxWidth,
    [styles.maxHeight]: maxHeight,
    [styles.flexWrap]: wrap,
  };

  return (
    <div className={clsx(styles.flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};

export default Flex;
