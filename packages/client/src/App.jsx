import React from 'react';
import { Router, Redirect } from '@reach/router';
import useTryAutoAuth from './hooks/useTryAutoAuth';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Logout from './components/Logout';
import NotFound from './pages/404';

const App = () => {
  const [isAuth] = useTryAutoAuth();
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
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
