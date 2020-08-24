import React from 'react';
import { navigate } from '@reach/router';
import useForm from '../hooks/useForm';

import LoadingPage from './LoadingPage';
import Container from '../components/Container';
import SignUp from '../components/SignUp';

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
    // const user = {
    //   username: 'abc',
    // };
    dispatch(['reset']);
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      navigate('/login');
    }, 6000);
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
