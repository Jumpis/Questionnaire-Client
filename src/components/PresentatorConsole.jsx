/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import Sidepic from '../assets/img/sidepic.jpg';
import EventEntry from './EventEntry';
import MakeEventModal from './MakeEventModal';


class PresentatorConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
    };
  }

  open = () => {
    this.setState({ confirmationPopup: true });
  };

  close = () => {
    this.setState({ confirmationPopup: false });
  };

  render() {
    const { confirmationPopup } = this.state;
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
                  <div className="col text-left">
                    <button className="btn btn-primary consoleBtn" type="button" onClick={() => this.open()}>Add Event</button>
                    {confirmationPopup && (
                    <Portal>
                      <MakeEventModal
                        onCancel={() => this.close()}
                      />
                    </Portal>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <ul className="EventEntryList">
                      <li><EventEntry /></li>
                      <li><EventEntry /></li>
                      <li><EventEntry /></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col"><img className="img-thumbnail img-fluid sidepicimg" src={Sidepic} /></div>
            </div>
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
  }
}


export default withRouter(PresentatorConsole);
