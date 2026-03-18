import { FC, memo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ButtonsWrapper: FC<Props> = memo(({ children }) => (
  <div className="flex flex-col justify-between sm:mt-8 mt-12 gap-4">{children}</div>
));

ButtonsWrapper.displayName = 'ButtonsWrapper';
