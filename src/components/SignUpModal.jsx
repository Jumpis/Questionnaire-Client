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
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // eslint-disable-next-line no-return-assign
    (val) => val.length > 0 && (valid = false),
  );
  return valid;
};

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      password: null,
      errors: {
        email: '',
        username: '',
        password: '',
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = this.state;

    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password = value.length < 1 ? 'Password must be inserted!' : '';
        break;
      case 'username':
        errors.username = value.length < 4 ? 'Username must be longer than 4!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit1 = (event) => {
    console.log('signUpModal Handlesubmit')
    const {
      errors, email, password, username,
    } = this.state;
    const { onCancel } = this.props;
    event.preventDefault();
    if (validateForm(errors)) {
      console.info('Valid Form');
      // request
      axios.post('http://localhost:3306/user/signup', {
        email,
        password,
        username,
      })
      .then(data => {
        onCancel();
      })
    } else {
      console.error('Invalid Form');
    }
  };

  render() {
    const { onCancel } = this.props;
    const { errors } = this.state;
    return (
      <div className="signUpModal modal">
        <div className="register-photo">
          <div className="form-container">
            <div className="image-holder" />
            <form onSubmit={this.handleSubmit1} noValidate>
              <h2 className="text-center">
                <strong>Create</strong>
                {' '}
                an account.
              </h2>
              <div className="form-group email">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.email.length > 0
                && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group username">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.username.length > 0
                && <span className="error">{errors.username}</span>}
              </div>
              <div className="form-group password">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.password.length > 0
                && <span className="error">{errors.password}</span>}
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="already" onClick={onCancel}>
                You already have an account? Login here.
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpModal);
