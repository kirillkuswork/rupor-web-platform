import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN_TYPE } from '../constants/auth';

const checkAuth = () => {
  const tokenType = getCookie(ACCESS_TOKEN_TYPE);
  
  return tokenType === '1';
};

export default checkAuth;
