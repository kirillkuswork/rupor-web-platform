import { FC, memo } from 'react';

type Props = {
  text: string;
};

export const InformationText: FC<Props> = memo(({ text }) => (
  <div
    data-testid="registration-info"
    className="sm:mt-4 mt-6 text-white-40 text-paragraph-m-s font-normal text-center"
    // в тексте с информацией присутствуют html-теги
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: text,
    }}
  />
));

InformationText.displayName = 'InformationText';
