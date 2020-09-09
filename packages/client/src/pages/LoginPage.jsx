import React from 'react';
import { useSetRecoilState } from 'recoil';
import { navigate } from '@reach/router';
import useForm from '../hooks/useForm';

import Container from '../components/Container';
import Login from '../components/Login';
import { authState, roomState } from '../store/state';
import { api } from '../utils';

const INIT_FORM_STATE = {
  username: '',
  password: '',
  remember: false,
};

export default () => {
  const { formState, dispatch, onFormInputChange } = useForm(INIT_FORM_STATE);
  const setAuthState = useSetRecoilState(authState);
  const setRoomState = useSetRecoilState(roomState);
  const onSubmit = async e => {
    e.preventDefault();
    const { username: _username, password } = formState;
    try {
      const {
        id, rooms, token, username, inviteCode,
      } = await api('login', {
        method: 'POST',
        data: {
          username: _username,
          password,
        },
        api: false,
      });
      const userStorage = {
        token,
        username,
        inviteCode,
        userId: id,
      };
      setAuthState({
        ...userStorage,
        isAuth: true,
      });
      setRoomState({
        rooms,
      });
      dispatch(['reset']);
      if (formState.remember) {
        localStorage.setItem(
          'user',
          JSON.stringify(userStorage),
        );
      }
      sessionStorage.setItem(
        'user',
        JSON.stringify(userStorage),
      );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
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
