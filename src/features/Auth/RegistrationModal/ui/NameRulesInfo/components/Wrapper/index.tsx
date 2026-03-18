import { FC, memo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const NameRulesInfoWrapper: FC<Props> = memo(({ children }) => (
  <div className="bg-white/2.5 px-4 py-2 mt-6 rounded">{children}</div>
));

NameRulesInfoWrapper.displayName = 'NameRulesInfoWrapper';
