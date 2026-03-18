import { useLogoutMutation } from '@/redux/services/users';
import { useCallback } from 'react';

export const useLogout = () => {
  const [logout] = useLogoutMutation();

  const mutationAuthLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [logout]);

  return { mutationAuthLogout };
};
