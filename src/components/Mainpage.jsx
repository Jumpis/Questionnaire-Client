/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import profileImg from '../assets/img/profile.png';
import questionImg from '../assets/img/question.png';

const Mainpage = (props) => (
  <div className="mainpage">
    <header className="masthead bg-primary text-white text-center">
      <div className="container">
        <div className="row">
          <div className="col"><img className="img-fluid d-block mx-auto mb-5" src={profileImg} onClick={() => props.history.push('/userLoginPage')} /></div>
          <div className="col"><img className="img-fluid d-block mx-auto mb-5" src={questionImg} onClick={() => props.history.push('/joinEventPage')} /></div>
        </div>
        <h1>Questionnaire</h1>
        <hr />
        <h2 className="font-weight-light mb-0">Realtime Q&amp;A Service</h2>
      </div>
    </header>
    <footer className="footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4 className="text-uppercase mb-4">Potato peel pie society</h4>
            <p className="lead mb-0"><span>&nbsp;</span></p>
          </div>
        </div>
      </div>
    </footer>
    <div className="copyright py-4 text-center text-white">
      <div className="container"><small>Copyright ©&nbsp;PPPS 2020</small></div>
    </div>
  </div>
);

export default withRouter(Mainpage);
