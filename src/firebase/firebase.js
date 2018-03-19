import * as firebase from "firebase";

const config = {
    //All this codes are gotten from the firebase website
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };


firebase.initializeApp(config);
const database = firebase.database();


//this is for our authentication
//1st for us to be able to use firebase auth system we need to authenticate it in our firebase app
//this create a google sign page that is used as a popup page in auth.js
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
