import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Redirect } from '@reach/router';
import { authState } from '../store/state';
import { AUTH } from '../store/atom';

export default () => {
  const setAuthState = useSetRecoilState(authState);
  useEffect(() => {
    setAuthState({ ...AUTH.default, isAuth: false });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  });
  return <Redirect from="/logout" to="/login" noThrow />;
};
