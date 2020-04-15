/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Sidepic from '../assets/img/sidepic.jpg';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import PresentatorQuestionEntry from './PresentatorQuestionEntry';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;

const PresentatorQuestionConsole = ({ location, history, logoutHandler, token, username }) => {


  const { eventId } = queryString.parse(location.search);
  const ENDPOINT = 'localhost:3306';

  const [questions, setQuestions] = useState([]);
  const [found, setFound] = useState(true);

  const sendAnswered = (boolean, questionId) => {    
    return socket.emit('sendAnswered', { boolean, questionId, eventId });
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { eventId });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('notfound', () => {
      setFound(false);
    });

    socket.on('allMessages', (result) => {
      console.log('this is received data : ', result)
      setQuestions(result.data);
    });
  }, []);
  
  return (
    <div className="presentatorConsole">
    <nav className="navbar navbar-light navbar-expand-md navigation-clean">
      <div className="container">
      <div className="navbar-brand">{`${username}님 안녕하세요`}</div>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto" />
          <li className="nav-item" role="presentation">
            <div
              className="nav-link active"
              onClick={() => {
                logoutHandler();
                history.push('/');
              }}
            >
              Log Out
            </div>
          </li>
        </div>
      </div>
    </nav>
    <header className="bg-primary text-white text-center">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <ul className="EventEntryList">
                {questions
                  .map((question) => question)
                  .sort((a, b) => b.numberOfLikes - a.numberOfLikes)
                  .map((question) => (
                    <li key={question.id}>
                      <PresentatorQuestionEntry question={question} sendAnswered={sendAnswered} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <img
              className="img-thumbnail img-fluid sidepicimg"
              src={Sidepic}
            />
          </div>
        </div>
      </div>
    </header>
    <CommonFooter />
    <Copywrite />
  </div>
  );
};

export default withRouter(PresentatorQuestionConsole);
