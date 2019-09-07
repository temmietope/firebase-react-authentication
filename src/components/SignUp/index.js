import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
const SignUpFormBase = (props) => {
  const [userDetails, setUserDetails] = useState({ ...initialState })

  const onSubmit = event => {
    const { username, email, passwordOne } = userDetails;
    props.firebase
      .createUser(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        setUserDetails({ ...initialState })
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setUserDetails({ ...userDetails, error: error })
      });
    event.preventDefault();
  }
  const onChange = event => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
  };
  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    error,
  } = userDetails;


  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form onSubmit={(e) => { onSubmit(e) }}>
      <input
        name="username"
        value={username}
        onChange={e => {
          onChange(e);
        }}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={e => {
          onChange(e);
        }}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={e => {
          onChange(e);
        }}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={e => {
          onChange(e);
        }}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">Sign Up</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };