// import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import UserLogin from './components/UserLogin';
import JoinEvent from './components/JoinEvent';
import PresentatorConsole from './components/PresentatorConsole';
import EventPage from './components/EventPage';
import React, { useState } from 'react';
import PresentatorQuestionConsole from './components/PresentatorQuestionConsole';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  function isLoginHandler() {
    setIsLogin(true);
  }

  function logoutHandler() {
    setIsLogin(false);
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/userLoginPage"
          render={() => <UserLogin isLoginHandler={isLoginHandler} />}
        />
        <Route exact path="/mainpage" render={() => <Mainpage />} />
        <Route exact path="/joinEventPage" render={() => <JoinEvent />} />
        <Route
          exact
          path="/presentatorConsole"
          render={() => {
            if (!isLogin) {
              return <Redirect to="/userLoginPage" />;
            } else {
              return <PresentatorConsole logoutHandler={logoutHandler} />;
            }
          }}
        />
        <Route
          exact
          path="/presentatorConsole/question"
          render={() => {
            if (!isLogin) {
              return <Redirect to="/userLoginPage" />;
            } else {
              return <PresentatorQuestionConsole logoutHandler={logoutHandler} />;
            }
          }}
        />
        <Route exact path="/eventPage" render={() => <EventPage />} />
        <Route
          exact
          path="/login"
          render={() => {
            if (!isLogin) {
              return <Redirect to="/userLoginPage" />;
            } else {
              return <Redirect to="/presentatorConsole" />;
            }
          }}
        />
        <Route path="/" render={() => <Redirect to="/mainpage" />} />
      </Switch>
    </div>
  );
}
