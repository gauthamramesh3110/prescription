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

let createUserWithEmailAndPassword = (email, password, name) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let db = firebase.firestore();

        db.collection("userDetails").doc(res.user.uid).set({
          email: email,
          name: name,
        });

        resolve("User Created Successfully!");
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

let signInWithEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve("Sign In Successfully!");
      })
      .catch((err) => {
        reject(err);
      });
  });
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
                medicines,
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

let modifyMedicines = (prescriptionId, medicines) => {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();

    db.collection("prescriptions")
      .doc(prescriptionId)
      .update({
        medicines,
      })
      .then(() => {
        resolve("Successfully Modified Medicines");
      });
  });
};

let addPrescription = (prescriptionName) => {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();

    let newPrescription = {
      name: prescriptionName,
      userId: firebase.auth().currentUser.uid,
      medicines: [],
    };

    db.collection("prescriptions")
      .add(newPrescription)
      .then((doc) => {
        newPrescription.id = doc.id;
        resolve(newPrescription);
      });
  });
};

let deletePrescription = (prescriptionId) => {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();

    db.collection("prescriptions")
      .doc(prescriptionId)
      .delete()
      .then(() => {
        resolve("Prescription Deleted");
      });
  });
};

let logout = () => {
  firebase.auth().signOut();
};

let firebaseFunctions = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  modifyMedicines,
  deletePrescription,
  addPrescription,
  logout,
};

export default firebaseFunctions;
