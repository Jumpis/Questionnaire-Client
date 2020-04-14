/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import QuestionEntry from './QuestionEntry';
import QuestionForm from './QuestionForm';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const EventPage = ( { location } ) => {

  const ENDPOINT = "localhost:3306";
  const [questions, setQuestions] = useState([]);
  const [found, setFound] = useState(true)
  const { eventId } = queryString.parse(location.search);

  const sendMessage = (content) => {
    return socket.emit('sendMessage', { content, eventId })
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { eventId })
    }, [ENDPOINT, location.search])


  useEffect(() => {
    socket.on('notfound', () => {
      setFound(false);
    })

    socket.on('allMessages', result => {
      setQuestions(result.data);
    });
  }, [])

  return (
    <div className="presentatorConsole">
      <nav className="navbar navbar-light navbar-expand-md navigation-clean">
        <div className="container">
          <div className="navbar-brand">Company Name</div>
          <div
            className="collapse navbar-collapse"
            id="navcol-1"
          >
            <ul className="nav navbar-nav ml-auto" />
          </div>
        </div>
      </nav>
      <header className="bg-primary text-white text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row">
                <QuestionForm sendMessage={sendMessage} />
              </div>
              <div className="row">
                <div className="col">
                  <ul className="EventEntryList">
                    {
                    questions.map( question => question)
                    .sort((a,b) => b.id - a.id).map(question => (
                      <li key={question.id}><QuestionEntry question={question}/></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col"><img className="img-thumbnail img-fluid sidepicimg" src={Sidepic} /></div>
          </div>
        </div>
      </header>
      <CommonFooter />
      <Copywrite />
    </div>
  );
};

export default withRouter(EventPage);
