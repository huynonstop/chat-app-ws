import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../store/state';

export default () => {
  const setAuthState = useSetRecoilState(authState);
  useEffect(() => {
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
  }, [setAuthState]);
  return null;
};
