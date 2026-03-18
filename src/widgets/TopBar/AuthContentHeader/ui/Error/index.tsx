import { useTranslation } from 'next-i18next';
import { FC } from 'react';

type Props = {
  refetch: () => void;
};

export const Error: FC<Props> = ({
  refetch,
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => refetch()}
    >
      <p>
        {`${t('Common_error')}...`}
      </p>
    </button>
  );
};
