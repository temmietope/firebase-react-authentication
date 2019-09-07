import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);
const initialState = {
  email: '',
  password: '',
  error: null,
};
const SignInFormBase = (props) => {
  const [userDetails, setUserDetails] = useState({ ...initialState })
  const onSubmit = event => {
    const { email, password } = userDetails;
    props.firebase
      .signInUser(email, password)
      .then(() => {
        setUserDetails({ ...initialState })
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setUserDetails({ ...userDetails, error: error })
      });
    event.preventDefault();
  };
  const onChange = event => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
  };
  const { email, password, error } = userDetails;
  const isInvalid = password === '' || email === '';
  return (
    <form onSubmit={(e) => { onSubmit(e) }}>
      <input
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
        </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };