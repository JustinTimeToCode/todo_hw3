import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    // apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
    // authDomain: "todo-rrf-316.firebaseapp.com",
    // databaseURL: "https://todo-rrf-316.firebaseio.com",
    // projectId: "todo-rrf-316",
    // storageBucket: "todo-rrf-316.appspot.com",
    // messagingSenderId: "892398996038",
    // appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
    // measurementId: "G-TEGQB3MZ23"
    // measurementId: "G-TEGQB3MZ23"
    apiKey: "AIzaSyA34Zlmhii5XXc10d2_p911i4gNhpSdamQ",
    authDomain: "cse316-todolists.firebaseapp.com",
    databaseURL: "https://cse316-todolists.firebaseio.com",
    projectId: "cse316-todolists",
    storageBucket: "cse316-todolists.appspot.com",
    messagingSenderId: "208770667609",
    appId: "1:208770667609:web:245e5474910bd317d60d48"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;