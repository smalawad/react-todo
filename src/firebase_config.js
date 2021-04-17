import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1P60nM8jfXsaaHPH1yXxngZu0USb-24g",
  authDomain: "react-todo-2527.firebaseapp.com",
  projectId: "react-todo-2527",
  storageBucket: "react-todo-2527.appspot.com",
  messagingSenderId: "121172561751",
  appId: "1:121172561751:web:b946c0bf2b50b6be7e3812"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };