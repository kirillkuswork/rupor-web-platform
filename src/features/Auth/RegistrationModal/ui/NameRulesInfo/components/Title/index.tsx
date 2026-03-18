import { FC, memo } from 'react';

type Props = {
  title: string;
};

export const NameRulesInfoTitle: FC<Props> = memo(({ title }) => (
  <div className="text-white-40 text-paragraph-m-s font-normal">{title}</div>
));

NameRulesInfoTitle.displayName = 'NameRulesInfoTitle';
