/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookiemon from '../assets/img/cookiemon.png';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import axios from 'axios'


const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // eslint-disable-next-line no-return-assign
    (val) => val.length > 0 && (valid = false)
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
        errors.eventcode =
          value.length < 6 ? 'eventcode must be longer than 6!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    const { errors, eventcode } = this.state;
    event.preventDefault();

    if (validateForm(errors)) {
      axios.post('http://15.164.163.19:3306/audience/join', {
        code_name : eventcode
      })
      .then(result => {
        if(!result.data.eventId){
          this.props.history.push(`/joinEventPage`)
        } else {
          this.props.history.push(`/eventPage?eventId=${result.data.eventId}`)
        }
      })
    } else {
      console.error('Invalid Form');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="joineventpage">
        <div className="newsletter-subscribe">
          <div className="container">
            <img className="img-fluid d-block mx-auto mb-5" src={Cookiemon} />
          </div>
          <div className="container">
            <div className="intro">
              <h2 className="text-center">
                Join Event! Ask Whatever You Want!&nbsp;
              </h2>
            </div>
            <form
              className="form-inline"
              onSubmit={this.handleSubmit}
              noValidate
            >
              <div className="form-group eventcode">
                <input
                  className="form-control"
                  name="eventcode"
                  type="text"
                  placeholder="Event Code"
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" type="submit">
                  Enter
                </button>
              </div>
            </form>
            {errors.eventcode.length > 0 && (
              <center className="error">{errors.eventcode}</center>
            )}
          </div>
        </div>
        <CommonFooter />
        <Copywrite />
      </div>
    );
  }
}

export default withRouter(JoinEvent);
