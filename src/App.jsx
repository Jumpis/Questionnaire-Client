// import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import UserLogin from './components/UserLogin';
import JoinEvent from './components/JoinEvent';
import PresentatorConsole from './components/PresentatorConsole';
import TestEntry from './components/EventEntry';
<<<<<<< HEAD
import EventPage from './components/EventPage';
=======
import React, { useState, useEffect } from "react";

>>>>>>> 9c24f8fa2e3bf0105a7b5dceab842b28513200f2

export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  function isLoginHandler (){
    setIsLogin( true );
  };

  return (
    <div>
      <Switch>
        <Route exact path="/userLoginPage" render={() => <UserLogin isLoginHandler={isLoginHandler}/>} />
        <Route exact path="/mainpage" render={() => <Mainpage />} />
        <Route exact path="/joinEventPage" render={() => <JoinEvent />} />
        <Route exact path="/presentatorConsole" render={() => <PresentatorConsole />} />
        <Route exact path="/eventPage" render={()=><EventPage />} />
        <Route exact path="/testEntry" render={() => <TestEntry />} />
        <Route exact path="/login" render={ () => {
          if(!isLogin){
            return <Redirect to="/userLoginPage"/>
          } else {
            return <Redirect to="/presentatorConsole"/>
          }
        } }/>
        <Route path="/" render={() => <Redirect to="/mainpage" />} />
      </Switch>
    </div>
  );
}
