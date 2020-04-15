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

const PresentatorQuestionConsole = ({ location, history, logoutHandler}) => {


  const { eventId } = queryString.parse(location.search);
  const ENDPOINT = 'localhost:3306';

  const [questions, setQuestions] = useState([]);
  const [found, setFound] = useState(true);

  const sendAnswered = (boolean, questionId) => {    
    return socket.emit('sendAnswered', { boolean, questionId, eventId });
  };

  // const [event, setEvent] = useState({
  //   eventname : "test",
  //   code_name : "777777",
  //   created_at : new Date(),
  // });

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
        <div className="navbar-brand">Company Name</div>
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
  .sort((a, b) => b.id - a.id)
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



/* 
class PresentatorQuestionConsole extends React.Component {
  constructor(props) {
    super(props);
    // state token 으로 초기화
    this.state = {
      questions: [],
      event: {
        eventname: 'test',
        code_name: '777777',
        created_at: new Date(),
      },
    };
  }

  render() {
    // const { questions, event } = this.state;
    return (
      <div className="presentatorConsole">
        <nav className="navbar navbar-light navbar-expand-md navigation-clean">
          <div className="container">
            <div className="navbar-brand">{this.props.username}</div>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav ml-auto" />
              <li className="nav-item" role="presentation">
                <div
                  className="nav-link active"
                  onClick={() => {
                    this.props.logoutHandler();
                    this.props.history.push('/');
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
                      <li>
                        <PresentatorQuestionEntry />
                      </li>
                      <li>
                        <PresentatorQuestionEntry />
                      </li>
                      <li>
                        <PresentatorQuestionEntry />
                      </li>
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
  }
}
*/

