import React from 'react';
import { navigate } from '@reach/router';
import useForm from '../hooks/useForm';

import LoadingPage from './LoadingPage';
import Container from '../components/Container';
import SignUp from '../components/SignUp';
import { api } from '../utils';

const INIT_FORM_STATE = {
  username: '',
  email: '',
  password: '',
};

export default () => {
  const {
    formState,
    dispatch,
    onFormInputChange,
    formLoading,
    setFormLoading,
  } = useForm(INIT_FORM_STATE, {
    loading: true,
  });
  const onSubmit = e => {
    e.preventDefault();
    const { username, email, password } = formState;

    setFormLoading(true);
    api('signup', {
      method: 'POST',
      data: {
        username,
        email,
        password,
      },
      api: false,
    }).then((data) => {
      dispatch(['reset']);
      setFormLoading(false);
      navigate('/login');
    }).catch(err => {
      setFormLoading(false);
      console.log(err);
    });
  };
  return (
    <Container flex fluid className="page bg-login ">
      {formLoading && <LoadingPage />}
      <SignUp
        onSubmit={onSubmit}
        formState={formState}
        onChange={onFormInputChange}
      />
    </Container>
  );
};
