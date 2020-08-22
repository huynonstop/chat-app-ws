import { useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../store/state';

export default () => {
  const [{ isAuth }, setAuthState] = useRecoilState(authState);
  useLayoutEffect(() => {
    if (isAuth === null) {
      const tokenStorage = sessionStorage.getItem('token');
      const userStorage = JSON.parse(sessionStorage.getItem('user'));
      let isAuthStorage = false;
      if (tokenStorage && userStorage) {
        isAuthStorage = true;
      }
      setAuthState(state => ({
        ...state,
        isAuth: isAuthStorage,
        user: userStorage,
        token: tokenStorage,
      }));
    }
  }, [setAuthState, isAuth]);
  return [isAuth];
};
