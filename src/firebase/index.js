import * as firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyD5F3YhuNSN09C8M-MEOx_2asAqbpkWNeY",
  authDomain: "prescription-d6020.firebaseapp.com",
  databaseURL: "https://prescription-d6020.firebaseio.com",
  projectId: "prescription-d6020",
  storageBucket: "prescription-d6020.appspot.com",
  messagingSenderId: "50811681237",
  appId: "1:50811681237:web:10cbfb5010623ab270e55c",
  measurementId: "G-6BCLYJDVFW",
};

firebase.initializeApp(firebaseConfig);

let createUserWithEmailAndPassword = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

let signInWithEmailAndPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

let onAuthStateChanged = (history) => {
  console.log(history);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      history.push('/')
    }else{
      history.push('/auth')
    }
  });
};

let firebaseFunctions = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};

export default firebaseFunctions;
