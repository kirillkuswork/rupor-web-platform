import { Skeleton } from 'rupor-ui-kit';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { ActionsDropdown } from './ui/ActionsDropdown';
import { StudioButton } from './ui/StudioButton';

const AuthContentHeader = () => {
  const { user, isGetUserInfoLoading } = useSelector(selectors.userSelector);

  return (
    <>
      <StudioButton />
      {isGetUserInfoLoading ? (
        <Skeleton
          variant="circle"
          className={clsx('w-[52px] h-[52px] md:w-[40px] md:h-[40px] ')}
        />
      ) : (
        <ActionsDropdown userAvatar={user?.avatar?.url} />
      )}
    </>
  );
};

export default AuthContentHeader;
