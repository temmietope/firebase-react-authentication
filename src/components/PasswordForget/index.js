import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';
const PasswordForgetPage = () => (
  <div>
    <h5>Forgot Password? Get a new one!</h5>
    <PasswordForgetForm />
  </div>
);
const initialState = {
  email: '',
  error: null,
};
const PasswordForgetFormBase = (props) => {
  const [userEmail, setUserEmail] = useState({ ...initialState })

  const onSubmit = event => {
    const { email } = userEmail;
    props.firebase
      .resetUserPassword(email)
      .then(() => {
        setUserEmail({ ...initialState });
      })
      .catch(error => {
        setUserEmail({ ...userEmail, error });
      });
    event.preventDefault();
  };
  const onChange = event => {
    setUserEmail({ ...userEmail, [event.target.name]: event.target.value })
  };
  const { email, error } = userEmail;
  const isInvalid = email === '';
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        name="email"
        value={email}
        onChange={e => onChange(e)}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
        </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };