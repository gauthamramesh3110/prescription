import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      let prescriptions = [];

      if (user) {
        history.push("/");

        let db = firebase.firestore();
        db.collection("prescriptions")
          .where("userId", "==", user.uid)
          .orderBy("name")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              let id = doc.id;
              let name = doc.data().name;
              let medicines = doc.data().medicines;

              prescriptions.push({
                id,
                name,
                medicines
              });
            });
            resolve(prescriptions);
          });
      } else {
        history.push("/auth");
        resolve([]);
      }
    });
  });
};

let firebaseFunctions = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};

export default firebaseFunctions;
