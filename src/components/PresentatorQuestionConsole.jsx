/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Sidepic from '../assets/img/sidepic.jpg';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import PresentatorQuestionEntry from './PresentatorQuestionEntry';

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

export default withRouter(PresentatorQuestionConsole);
