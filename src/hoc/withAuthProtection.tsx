import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { isNewAuthMode } from '@/shareds/lib/utils/isNewAuthMode';
import { selectors } from '@/redux/selectors';
import { IsNotAuthorized } from '@/shareds';

function withAuthProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> {
  const ComponentWithAuth: FC<P> = (props: P) => {
    const { isAuth, isInitial } = useSelector(selectors.userSelector);

    if (isNewAuthMode() && !isAuth && isInitial) {
      return (
        <IsNotAuthorized authButtonText="Not_Authorized_Auth_Button" subtitleText="Not_Authorized_Subtitle" />
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuthProtection(${WrappedComponent.displayName})`;

  return ComponentWithAuth;
}

export default withAuthProtection;
