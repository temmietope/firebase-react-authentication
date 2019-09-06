import app from "firebase/app"
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }
    // *** Auth API ***

    //to sign up 
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    //to sign in
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    //to sign out
    doSignOut = () => this.auth.signOut();

    //to reset password
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    //to update password
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}
export default Firebase;