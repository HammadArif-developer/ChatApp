import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCifcesZl7Ev1A5RgdK51sqkJmrDoNAMro",
    authDomain: "chatapp-c0334.firebaseapp.com",
    databaseURL: "https://chatapp-c0334.firebaseio.com",
    projectId: "chatapp-c0334",
    storageBucket: "chatapp-c0334.appspot.com",
    messagingSenderId: "16752450401",
    appId: "1:16752450401:web:9c4e5e48916c2a63008320",
    measurementId: "G-8M69GY8BBC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth, provider};
  export default db;