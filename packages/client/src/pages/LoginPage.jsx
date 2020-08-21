import React, { useReducer } from 'react';
import { useSetRecoilState } from 'recoil';
import { navigate } from '@reach/router';

import Container from '../components/Container';
import Login from '../components/Login';
import { authState } from '../store/state';

const INIT_FORM_STATE = {
  username: '',
  password: '',
};

const formReducer = (state, [type, { value, field } = {}]) => {
  switch (type) {
    case 'update':
      return { ...state, [field]: value };
    case 'reset':
      return { ...INIT_FORM_STATE };
    default:
      throw new Error(`Invalid action ${type}`);
  }
};

export default () => {
  const [formState, dispatch] = useReducer(formReducer, INIT_FORM_STATE);
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
  const onChange = e => {
    const { value, id: field } = e.target;
    dispatch(['update', { value, field }]);
  };
  return (
    <Container
      flex
      fluid
      className="page"
    >
      <Login onSubmit={onSubmit} formState={formState} onChange={onChange} />
    </Container>
  );
};
