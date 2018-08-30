import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCErs26UrvEV0tr9CbNJcI33lFpYfY8pIs",
    authDomain: "magazine-65781.firebaseapp.com",
    databaseURL: "https://magazine-65781.firebaseio.com",
    projectId: "magazine-65781",
    storageBucket: "magazine-65781.appspot.com",
    messagingSenderId: "284562548635"
  };

export const firebaseApp = firebase.initializeApp(config);
export const articleRef = firebase.database().ref('articles');
export const commentRef = firebase.database().ref('comments');
export const subCommentRef = firebase.database().ref('subComments');
