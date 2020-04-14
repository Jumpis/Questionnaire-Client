/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import profileImg from '../assets/img/profile.png';
import questionImg from '../assets/img/question.png';

import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';

const Mainpage = (props) => (
  <div className="mainpage">
    <header className="masthead bg-primary text-white text-center">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row justify-content-center">
              <h2>발표자</h2>
            </div>
            <div className="row">
              <img
                className="img-fluid d-block mx-auto mb-5"
                src={profileImg}
                onClick={() => props.history.push('/userLoginPage')}
              />
            </div>
          </div>
          <div className="col">
            <div className="row justify-content-center">
              <h2>질문자</h2>
            </div>
            <div className="row">
              <img
                className="img-fluid d-block mx-auto mb-5"
                src={questionImg}
                onClick={() => props.history.push('/joinEventPage')}
              />
            </div>
          </div>
        </div>
        <h1>Questionnaire</h1>
        <hr />
        <h2 className="font-weight-light mb-0">Realtime Q&amp;A Service</h2>
      </div>
    </header>
    <CommonFooter />
    <Copywrite />
  </div>
);

export default withRouter(Mainpage);
