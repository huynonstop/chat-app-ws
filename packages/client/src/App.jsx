import React from 'react';
import { Router, Redirect } from '@reach/router';
import { useRecoilValue } from 'recoil';

import useTryAutoAuth from './hooks/useTryAutoAuth';
import { authState } from './store/state';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Logout from './components/Logout';
import NotFound from './pages/404';
import AboutUs from './pages/AboutUs';

const App = () => {
  useTryAutoAuth();
  const { isAuth } = useRecoilValue(authState);
  if (isAuth === null) return null;
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
            <SignUpPage path="/signup" />
            <Redirect from="/" to="/login" noThrow />
          </>
        )}
        <AboutUs path="/about-us" />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
