import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Router, Redirect } from '@reach/router';
import { authState } from './store/state';

import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import LoadingPage from './pages/LoadingPage';
import Logout from './components/Logout';
import NotFound from './pages/404';

const App = () => {
  const [{ isAuth }, setAuthState] = useRecoilState(authState);
  useEffect(() => {
    if (isAuth === null) {
      const tokenStorage = sessionStorage.getItem('token');
      const userStorage = JSON.parse(sessionStorage.getItem('user'));
      let isAuthStorage = false;
      if (tokenStorage && userStorage) {
        isAuthStorage = true;
      }
      setAuthState(state => ({
        ...state,
        isAuth: isAuthStorage,
        user: userStorage,
        token: tokenStorage,
      }));
    }
  }, [setAuthState, isAuth]);
  if (isAuth === null) {
    return (
      <div className="app">
        <LoadingPage />
      </div>
    );
  }
  return (
    <div className="app">
      <Router>
        {isAuth ? (
          <>
            <ChatPage path="/" />
            <Logout path="/logout" />
            <Redirect from="/login" to="/" noThrow />
          </>
        ) : (
          <>
            <LoginPage path="/login" />
            <Redirect from="/" to="/login" noThrow />
          </>
        )}
        <LoadingPage path="/loading" />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
