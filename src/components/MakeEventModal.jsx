/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'


// eslint-disable-next-line no-useless-escape
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // eslint-disable-next-line no-return-assign
    (val) => val.length > 0 && (valid = false),
  );
  return valid;
};

class MakeEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options : {
        headers : { 'Authorization' : `Bearer ${this.props.token}` }
      },
      eventname: null,
      codename: null,
      presentatorid: null,
      // redux로 로긴상태관리
      errors: {
        eventname: '',
        codename: '',
      },
      isLoaded : false,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = this.state;

    switch (name) {
      case 'eventname':
        errors.eventname = value.length < 1 ? 'eventname must be inserted!' : '';
        break;
      case 'codename':
        errors.codename = value.length < 6 ? 'codename must be longer than 6' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    const {
      errors, eventname, codename,
    } = this.state;
    const { onCancel } = this.props;
    event.preventDefault();
    if (validateForm(errors)) {
      console.info('Valid Form');
      axios.post( 
        'http://localhost:3306/presentor/create', {
        eventname,
        codename,
        // presentatorid : 6
      }, this.state.options)
      .then( data => {        
        this.props.reRender();

      })
      .catch(err => {
        console.log(err)
      });

      onCancel();
    } else {
      console.error('Invalid Form');
    }
  };

  render() {
    const { onCancel } = this.props;
    const { errors } = this.state;
    return (
      <div className="makeEvent modal">
        <div className="register-photo">
          <div className="form-container">
            <form onSubmit={this.handleSubmit} noValidate>
              <h2 className="text-center">
                <strong>Create</strong>
                {' '}
                an Event.
              </h2>
              <div className="form-group eventname">
                <input
                  className="form-control"
                  type="text"
                  name="eventname"
                  placeholder="eventname"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.eventname.length > 0
                && <span className="error">{errors.eventname}</span>}
              </div>
              <div className="form-group codename">
                <input
                  className="form-control"
                  type="text"
                  name="codename"
                  placeholder="codename"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.codename.length > 0
                && <span className="error">{errors.codename}</span>}
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  Create!
                </button>
              </div>
              <div className="already" onClick={onCancel}>
                Not ready to make event? Click here.
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MakeEventModal);
