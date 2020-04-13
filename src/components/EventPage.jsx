/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Sidepic from '../assets/img/sidepic.jpg';
import QuestionEntry from './QuestionEntry';
import QuestionForm from './QuestionForm';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const EventPage = ( { location } ) => {

  const ENDPOINT = "localhost:3306";
  const [content, setContent] = useState('')
  const [questions, setQuestions] = useState([]);
  // const [stateEventId, setStateEventId] = useState('')
  const [found, setFound] = useState(true)

  console.log('this is questions : ', questions)

  function getContent(content){
    setContent(content)
  };

  useEffect(() => {
    const { eventId } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    // setStateEventId(eventId)    
    // console.log('this is eventId : ', stateEventId)


    socket.emit('join', { eventId })
    }, [ENDPOINT, location.search])


  useEffect(() => {
    const { eventId } = queryString.parse(location.search);

    socket.on('notfound', () => {
      setFound(false);
    })

    socket.on('allMessages', result => {
      console.log('these are questions : ', result)
      setQuestions(result.data);
    });
    socket.emit('sendMessage', { content, eventId })
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
                <QuestionForm getContent={getContent} />
              </div>
              <div className="row">
                <div className="col">
                  <ul className="EventEntryList">
                    {questions.map( question => (
                      <li key={question.id}><QuestionEntry question={question}/></li>
                    ) )}
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
}


/*
class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : '',
      questions: [],
      ENDPOINT : "localhost:3306",
      eventId : '',
      found : true,
    };
  }


  componentDidMount(){
    const { eventId } = queryString.parse(this.props.location.search);
    socket = io(this.state.ENDPOINT);
    this.setState({
      eventId
    });
  }

  getContent(content){
    this.setState({
      content
    })
  };

  render() {
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
                  <QuestionForm getContent={this.getContent} />
                </div>
                <div className="row">
                  <div className="col">
                    <ul className="EventEntryList">
                      {this.state.questions.map( question => (
                        <li key={question.id}><QuestionEntry question={question}/></li>
                      ) )}
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
  }
}

*/


export default withRouter(EventPage);
