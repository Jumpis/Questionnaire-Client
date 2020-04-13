/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import SignUpModal from './SignUpModal';
import CommonFooter from './CommonFooter';
import Copywrite from './Copywrite';
import axios from 'axios'

// eslint-disable-next-line no-useless-escape
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // eslint-disable-next-line no-return-assign
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
};
class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopup: false,
      email: null,
      password: null,
      errors: {
        email: '',
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
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    const { errors, email, password } = this.state;
    console.log('this is props : ', this.props)

    event.preventDefault();
    if (validateForm(errors)) {
      console.info('Valid Form');
      axios.post('http://localhost:3306/user/signin', {
        email,
        password
      })
      .then( result => {
        console.log('this is result : ', result)
        if(result.data.token){
          this.props.isLoginHandler();
          this.props.history.push('/login')
          
        } else {
          console.log('no data')
        }
      });
      // request
      // response : token, presentator id
    } else {
      console.error('Invalid Form');
    }
  };

  open = () => {
    this.setState({ confirmationPopup: true });
  };

  close = () => {
    this.setState({ confirmationPopup: false });
  };

  render() {
    const { confirmationPopup, errors } = this.state;
    return (
      <div className="userloginpage">
        <div className="login-dark">
          <form onSubmit={this.handleSubmit} noValidate>
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration">
              <i className="fas fa-unlock-alt" />
            </div>
            <div className="form-group email">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                noValidate
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
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
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <button className="btn btn-primary btn-block" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={() => this.open()}
                  >
                    Sign Up
                  </button>
                  {confirmationPopup && (
                    <Portal>
                      <SignUpModal onCancel={() => this.close()} />
                    </Portal>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <CommonFooter />
        <Copywrite />
      </div>
    );
  }
}

export default withRouter(UserLogin);
