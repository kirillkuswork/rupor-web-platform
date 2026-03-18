import { FC, memo } from 'react';

type Props = {
  text: string;
};

export const InformationText: FC<Props> = memo(({ text }) => (
  <div
    className="text-white-40 text-paragraph-l-m font-normal mt-2 mb-2"
    // в тексте с информацией присутствуют html-теги
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: text,
    }}
  />
));

InformationText.displayName = 'InformationText';
