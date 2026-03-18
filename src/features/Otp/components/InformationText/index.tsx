import {
  FC,
  memo,
} from 'react';

type Props = {
  text: string;
  isVisible?: boolean;
  dti?: string
};

export const InformationText: FC<Props> = memo(({
  text,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="text-white-40 text-paragraph-l-m font-normal mt-1 mb-4 text-center"
            // в тексте с информацией присутствуют html-теги
            // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
});

InformationText.displayName = 'InformationText';
