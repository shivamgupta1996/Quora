import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDNBFmf93d4pthTht4RsbJEQWCQioyFEqg",
    authDomain: "dquora-11a8f.firebaseapp.com",
    databaseURL: "https://dquora-11a8f.firebaseio.com",
    projectId: "dquora-11a8f",
    storageBucket: "dquora-11a8f.appspot.com",
    messagingSenderId: "640990089967"
  };

export const firebaseApp = firebase.initializeApp(config);
export const questionRef = firebase.database().ref('question');
export const answerRef = firebase.database().ref('answers');
export const subCommentRef = firebase.database().ref('subComments');
export const userRef = firebase.database().ref('users');
