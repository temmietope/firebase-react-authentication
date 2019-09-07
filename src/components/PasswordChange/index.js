import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
const initialState = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
const PasswordChangeForm = (props) => {
  const [userPasswords, setUserPasswords] = useState({ ...initialState })

  const onSubmit = event => {
    event.preventDefault();
    const { passwordOne } = userPasswords;
    props.firebase
      .updateUserPassword(passwordOne)
      .then(() => {
        console.log("successful")
        setUserPasswords({ ...initialState })
      })
      .catch(error => {
        setUserPasswords({ ...userPasswords, error: error })
      })
  };
  const onChange = event => {
    setUserPasswords({ ...userPasswords, [event.target.name]: event.target.value });
  };
  const { passwordOne, passwordTwo, error } = userPasswords;
  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '';
  return (
    <>
      <h5>Change your password</h5>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(e) => onChange(e)}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e) => onChange(e)}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </>
  );
}
export default withFirebase(PasswordChangeForm);