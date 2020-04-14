/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import Sidepic from '../assets/img/sidepic.jpg';
import EventEntry from './EventEntry';
import MakeEventModal from './MakeEventModal';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PresentatorConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
      options: {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq5gOyVhOustOqwnCIsImVtYWlsIjoia2ltQG5hdmVyLmNvbSIsImlhdCI6MTU4NjgzMTYyNSwiZXhwIjoxNTg2ODY3NjI1fQ.Ygowz7oMBTSJxjy6n4n5eWC_CHO32ImprhVJ1j0gGZ4`,
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

  handleLogOut = () => {
    // todo;
  };

  render() {
    const { confirmationPopup, isLoaded, eventList } = this.state;
    if (!isLoaded) {  
      return <div>Loading</div>;
    } else {
      return (
        <div className="presentatorConsole">
          <nav className="navbar navbar-light navbar-expand-md navigation-clean">
            <div className="container">
              <div className="navbar-brand">Company Name</div>
              <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item" role="presentation">
                    <div
                      className="nav-link active"
                      onClick={() => {
                        alert('clicked!')
                        
                        this.props.logoutHandler();
                        this.props.history.push('/');
                      }}
                    >
                      Log Out
                    </div>
                  </li>
                </ul>
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
                          <li key={event.id}>
                            <Link 
                              onClick={(e) => (!event.code_name ? e.preventDefault() : null)}
                              to={`/presentatorConsole/question?eventId=${event.id}`}
                            >
                              <EventEntry event={event} />
                            </Link>
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
