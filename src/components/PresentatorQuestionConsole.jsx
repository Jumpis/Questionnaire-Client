/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Sidepic from '../assets/img/sidepic.jpg';
import EventEntry from './EventEntry';
import QuestionEntry from './QuestionEntry';
import QuestionForm from './QuestionForm';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';


class PresentatorQuestionConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      event : {
        eventname : "test",
        code_name : "777777",
        created_at : new Date(),
      }
    };
  }

  render() {
    const { questions, event } = this.state;
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
                  <div className="col">
                    <ul className="EventEntryList">
                      <li><EventEntry event={event}/></li>
                      <li><QuestionEntry /></li>
                      <li><EventEntry event={event}/></li>
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


export default withRouter(PresentatorQuestionConsole);
