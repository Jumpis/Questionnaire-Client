import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import UserLogin from './components/UserLogin';
import JoinEvent from './components/JoinEvent';
import PresentatorConsole from './components/PresentatorConsole';
import TestEntry from './components/EventEntry';
import EventPage from './components/EventPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/mainpage" render={() => <Mainpage />} />
        <Route exact path="/userLoginPage" render={() => <UserLogin />} />
        <Route exact path="/joinEventPage" render={() => <JoinEvent />} />
        <Route exact path="/presentatorConsole" render={() => <PresentatorConsole />} />
        <Route exact path="/eventPage" render={()=><EventPage />} />
        <Route exact path="/testEntry" render={() => <TestEntry />} />
        <Route path="/" render={() => <Redirect to="/mainpage" />} />
      </Switch>
    </div>
  );
}
