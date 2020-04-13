/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import Sidepic from '../assets/img/sidepic.jpg';
import EventEntry from './EventEntry';
import MakeEventModal from './MakeEventModal';
import QuestionEntry from './QuestionEntry';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import axios from 'axios';

class PresentatorConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
      options: {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lc3NpIiwiZW1haWwiOiJtZXNzaUBuYXZlci5jb20iLCJpYXQiOjE1ODY3NTQyNjgsImV4cCI6MTU4Njc5MDI2OH0.FsfvnkuTj1yRTfD4B-C70izB5hHMAK4ypKfxnbrsZwY`,
        },
      },
      isLoaded: false,
      eventList: '',
    };
  }

  open = () => {
    this.setState({ confirmationPopup: true });
  };

  close = () => {
    this.setState({ confirmationPopup: false });
  };

  getList = () => {
    axios
      .get('http://localhost:3306/presentor/list', this.state.options)
      .then((result) => {
        console.log('this is event list : ', result);
        this.setState({
          eventList: result.data,
          isLoaded: true,
        });
      });
  };

  reReder = () => {
    this.getList();
  };

  componentDidMount = () => {
    this.getList();
  };

  render() {
    const { confirmationPopup, isLoaded, eventList } = this.state;
    console.log(eventList);
    if (!isLoaded) {
      return <div>Loading</div>;
    } else {
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
                <div className="col">
                  <div className="row">
                    <div className="col text-left">
                      <button
                        className="btn btn-primary consoleBtn"
                        type="button"
                        onClick={() => this.open()}
                      >
                        Add Event
                      </button>
                      {confirmationPopup && (
                        <Portal>
                          <MakeEventModal
                            onCancel={() => this.close()}
                            reRender={this.reReder}
                          />
                        </Portal>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <ul className="EventEntryList">
                        {eventList.map((event) => (
                          <li>
                            <EventEntry key={event.id} event={event} />
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
    }
  }
}

export default withRouter(PresentatorConsole);
