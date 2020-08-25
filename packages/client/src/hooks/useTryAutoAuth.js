import { useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../store/state';

export default () => {
  const [authStateValue, setAuthState] = useRecoilState(authState);
  useLayoutEffect(() => {
    let auth = JSON.parse(localStorage.getItem('user'));
    if (!auth?.token || !auth?.username) {
      auth = JSON.parse(sessionStorage.getItem('user'));
    }
    const { username = null, token = null } = auth || {};
    const isAuth = username && token;
    setAuthState({ isAuth, username, token });
  }, [setAuthState]);
  return authStateValue;
};
