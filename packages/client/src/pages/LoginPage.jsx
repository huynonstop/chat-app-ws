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
};

export default () => {
  const { formState, dispatch, onFormInputChange } = useForm(INIT_FORM_STATE);
  const setAuthState = useSetRecoilState(authState);
  const onSubmit = e => {
    e.preventDefault();
    const token = 'token';
    const user = {
      username: 'abc',
    };
    setAuthState(state => ({
      ...state,
      isAuth: true,
      user,
      token,
    }));
    dispatch(['reset']);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };
  return (
    <Container flex fluid className="page">
      <Login
        onSubmit={onSubmit}
        formState={formState}
        onChange={onFormInputChange}
      />
    </Container>
  );
};
