/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import QuestionEntry from './QuestionEntry';
import QuestionForm from './QuestionForm';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const EventPage = ({ location }) => {
  const ENDPOINT = 'localhost:3306';
  const [questions, setQuestions] = useState([]);
  const [found, setFound] = useState(true);
  const { eventId } = queryString.parse(location.search);

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq5gOyVhOustOqwnCIsImVtYWlsIjoia2ltQG5hdmVyLmNvbSIsImlhdCI6MTU4NjgzMTYyNSwiZXhwIjoxNTg2ODY3NjI1fQ.Ygowz7oMBTSJxjy6n4n5eWC_CHO32ImprhVJ1j0gGZ4'
  const authKey = localStorage.getItem('authKey');

  const sendMessage = (content) => {
    console.log('this is authKey to send : ', authKey)
    return socket.emit('sendMessage', { content, eventId, authKey });
  };

  const sendLike = (questionId) => {
    return socket.emit('sendLike', { authKey, questionId })
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { eventId , authKey });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('authKey', data => {
      if(!localStorage.getItem('authKey')){
        localStorage.setItem('authKey', data.newAuthKey);
      };
    })

    socket.on('needNewKey', data => {
      localStorage.removeItem('authKey');
      socket.emit('join', { eventId, authKey })
    });

    socket.on('notfound', () => {
      setFound(false);
    });

    socket.on('allMessages', (result) => {
      setQuestions(result.data);
    });

    socket.on('sendLikeResult', ({instance, created}) => {
      console.log(instance, created)
    })


  }, []);

  return (
    <div className="presentatorConsole">
      <nav className="navbar navbar-light navbar-expand-md navigation-clean">
        <div className="container">
          <div className="navbar-brand">Company Name</div>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav ml-auto" />
          </div>
        </div>
      </nav>
      <header className="bg-primary text-white text-center">
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <QuestionForm sendMessage={sendMessage} />
            </div>
            <div className="col">
              <ul className="EventEntryList">
                {questions
                  .map((question) => question)
                  .sort((a, b) => b.id - a.id)
                  .map((question) => (
                    <li key={question.id}>
                      <QuestionEntry question={question} sendLike={sendLike}  />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <CommonFooter />
      <Copywrite />
    </div>
  );
};

export default withRouter(EventPage);
