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
    const {
      username = null, token = null, inviteCode = null, userId = null,
    } = auth || {};
    const isAuth = username && token && inviteCode && userId;
    setAuthState({
      isAuth,
      username,
      token,
      inviteCode,
      userId,
    });
  }, [setAuthState]);
  return authStateValue;
};
