import React, { useReducer } from 'react';
import { navigate } from '@reach/router';

import LoadingPage from './LoadingPage';
import Container from '../components/Container';
import SignUp from '../components/SignUp';

const INIT_FORM_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
};

const formReducer = (state, [type, { value, field } = {}]) => {
  switch (type) {
    case 'update':
      return { ...state, [field]: value };
    case 'reset':
      return { ...INIT_FORM_STATE };
    case 'loading':
      return { ...state, isLoading: true };
    case 'finishLoading':
      return { ...state, isLoading: false };
    default:
      throw new Error(`Invalid action ${type}`);
  }
};

export default () => {
  const [formState, dispatch] = useReducer(formReducer, INIT_FORM_STATE);
  const onSubmit = e => {
    e.preventDefault();
    // const user = {
    //   username: 'abc',
    // };
    dispatch(['reset']);
    dispatch(['loading']);
    setTimeout(() => {
      dispatch(['finishLoading']);
      navigate('/login');
    }, 6000);
  };
  const onChange = e => {
    const { value, id: field } = e.target;
    dispatch(['update', { value, field }]);
  };
  return (
    <Container
      flex
      fluid
      className="page bg-white"
    >
      {formState.isLoading && <LoadingPage />}
      <SignUp onSubmit={onSubmit} formState={formState} onChange={onChange} />
    </Container>
  );
};
