import React from 'react';
import { useSetRecoilState } from 'recoil';
import { navigate } from '@reach/router';
import useForm from '../hooks/useForm';

import Container from '../components/Container';
import Login from '../components/Login';
import { authState } from '../store/state';

const INIT_FORM_STATE = {
  username: '',
  password: '',
  remember: false,
};

export default () => {
  const { formState, dispatch, onFormInputChange } = useForm(INIT_FORM_STATE);
  const setAuthState = useSetRecoilState(authState);
  const onSubmit = e => {
    e.preventDefault();
    const { username } = formState;
    const token = username;
    setAuthState({ token, username, isAuth: true });
    dispatch(['reset']);
    if (formState.remember) {
      localStorage.setItem('user', JSON.stringify({ token, username }));
    }
    sessionStorage.setItem('user', JSON.stringify({ token, username }));
    navigate('/');
  };
  return (
    <Container flex fluid className="page bg-sidebar">
      <Login
        onSubmit={onSubmit}
        formState={formState}
        onChange={onFormInputChange}
      />
    </Container>
  );
};
