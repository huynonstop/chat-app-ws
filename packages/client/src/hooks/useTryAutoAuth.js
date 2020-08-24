import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../store/state';

export default () => {
  const setAuthState = useSetRecoilState(authState);
  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem('user')) || {};
    if (!auth.token || !auth.username) {
      auth = JSON.parse(sessionStorage.getItem('user')) || {};
    }
    const { username, token } = auth;
    const isAuth = username && token;
    setAuthState({ isAuth, username, token });
  }, [setAuthState]);
  return null;
};
