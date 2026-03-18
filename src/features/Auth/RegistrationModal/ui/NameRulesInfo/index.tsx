import { FC, memo } from 'react';

import { NameRulesInfoList } from './components/List';
import { NameRulesInfoTitle } from './components/Title';
import { NameRulesInfoWrapper } from './components/Wrapper';

type Props = {
  isVisible: boolean;
  title: string;
  rules: string[];
};

export const NameRulesInfo: FC<Props> = memo(({ isVisible, title, rules }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <NameRulesInfoWrapper>
      <NameRulesInfoTitle title={title} />
      <NameRulesInfoList rules={rules} />
    </NameRulesInfoWrapper>
  );
});

NameRulesInfo.displayName = 'NameRulesInfo';
