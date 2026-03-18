import React, { FC, memo, useCallback } from 'react';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';

type Props = {
  rules: string[];
};

export const NameRulesInfoList: FC<Props> = memo(({ rules }) => {
  const ruleItem = useCallback(
    (rule: string) => (
      <li key={rule} className="text-white-40 text-paragraph-m-s font-normal">
        {rule}
      </li>
    ),
    [],
  );

  const { Element: Rules } = arrayRender({
    items: rules,
    renderItem: ruleItem,
  });

  return (
    <ul className="list-disc pl-4">
      <Rules />
    </ul>
  );
});

NameRulesInfoList.displayName = 'NameRulesInfoList';
