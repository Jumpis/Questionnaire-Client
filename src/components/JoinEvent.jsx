/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookiemon from '../assets/img/cookiemon.png';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // eslint-disable-next-line no-return-assign
    (val) => val.length > 0 && (valid = false),
  );
  return valid;
};

class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventcode: null,
      errors: {
        eventcode: '',
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = this.state;

    switch (name) {
      case 'eventcode':
        errors.eventcode = value.length < 6 ? 'eventcode must be longer than 6!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    const {
      errors, eventcode,
    } = this.state;
    event.preventDefault();
    if (validateForm(errors)) {
      console.info('Valid Form');
      // 질문방 참여 request
    } else {
      console.error('Invalid Form');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="joineventpage">
        <div className="newsletter-subscribe">
          <div className="container"><img className="img-fluid d-block mx-auto mb-5" src={Cookiemon} /></div>
          <div className="container">
            <div className="intro">
              <h2 className="text-center">Join Event! Ask Whatever You Want!&nbsp;</h2>
            </div>
            <form className="form-inline" onSubmit={this.handleSubmit} noValidate>
              <div className="form-group eventcode">
                <input className="form-control" name="eventcode" type="text" placeholder="Event Code" onChange={this.handleChange} noValidate />
              </div>
              <div className="form-group"><button className="btn btn-primary" type="submit">Enter</button></div>
            </form>
            {errors.eventcode.length > 0
                && <center className="error">{errors.eventcode}</center>}
          </div>
        </div>
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


export default withRouter(JoinEvent);
