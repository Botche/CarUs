import app from 'firebase/app';
import 'firebase/auth';

require('dotenv').config();

console.log(process.env)

const config = {
    apiKey: process.env.REACT_APP_CARUS_API_KEY,
    authDomain: process.env.REACT_APP_CARUS_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_CARUS_DATABASE_URL,
    projectId: process.env.REACT_APP_CARUS_PROJECT_ID,
    storageBucket: process.env.REACT_APP_CARUS_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_CARUS_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_CARUS_APP_ID,
    measurementId: process.env.REACT_APP_CARUS_MEASUREMENT_ID
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);
    
    this.auth = app.auth();                                                              
  }

  currentUser = () => this.auth.currentUser;

  registerWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  loginWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);
 
  updatePassword = password =>
    this.auth.currentUser.updatePassword(password);
}
   
const firebase = new Firebase();

export default firebase;