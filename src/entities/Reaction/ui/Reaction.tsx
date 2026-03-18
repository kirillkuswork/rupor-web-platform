import React from 'react';
import { HFlex } from '@/shareds/ui/Flex';
import clsx from 'clsx';

export interface IReactionProps {
  icon: JSX.Element
  title?: string
  isFilled?: boolean
  onClick?: () => void
  dti?: string
}

export const Reaction = (props: IReactionProps) => {
  const {
    icon,
    isFilled,
    title,
    onClick,
    dti = '',
  } = props;

  return (
    <HFlex
      maxWidth={false}
      maxHeight={false}
      gap="8"
      className={clsx('hover:text-white cursor-pointer', isFilled ? 'text-white' : 'text-shuttle-gray')}
      onClick={onClick}
    >
      {icon}
      {title && (
      <span
        data-testid={dti}
        className="font-semibold"
      >
        {title}
      </span>
      )}
    </HFlex>
  );
};
