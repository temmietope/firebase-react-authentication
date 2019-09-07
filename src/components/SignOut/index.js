import React from 'react';
import { withFirebase } from '../Firebase';
const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.signOutUser}>
    Sign Out
  </button>
);
export default withFirebase(SignOutButton);