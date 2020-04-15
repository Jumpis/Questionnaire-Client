// import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import UserLogin from './components/UserLogin';
import JoinEvent from './components/JoinEvent';
import PresentatorConsole from './components/PresentatorConsole';
import EventPage from './components/EventPage';
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {setLoggedIn, setToken, setUserName} from '../src/actions/index'
import PresentatorQuestionConsole from './components/PresentatorQuestionConsole';

export default function App() {

  const { username, isLogin, token } = useSelector((state) => ({
    username: state.settingReducer.username,
    isLogin: state.settingReducer.isLogin,
    token: state.tokenReducer.token,
  }));

  console.log(username, isLogin, token)

  const dispatch = useDispatch();
  const isLoginHandler = (username, token) => {
    dispatch(setLoggedIn(true));
    dispatch(setToken(token));
    dispatch(setUserName(username));
  }

  const logoutHandler = () => {
    dispatch(setLoggedIn(false));
    dispatch(setToken(null));
    dispatch(setUserName(null));
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
              console.log(isLogin)
              return <Redirect to="/userLoginPage" />;
            } else {
              console.log(isLogin)
              return <PresentatorConsole logoutHandler={logoutHandler} username={username} token={token} />;
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
              return <PresentatorQuestionConsole logoutHandler={logoutHandler} username={username} token={token} />;
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
