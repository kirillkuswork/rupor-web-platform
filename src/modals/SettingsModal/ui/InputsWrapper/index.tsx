import { FC, memo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const InputsWrapper: FC<Props> = memo(({ children }) => (
  <div className="flex flex-col justify-between sm:mt-8 mt-10 gap-y-3">{children}</div>
));

InputsWrapper.displayName = 'InputsWrapper';
