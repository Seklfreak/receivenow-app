import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCN624O6AIsqSsL0MfIhQq8FGSo4nxCgbU",
    authDomain: "receivenow.firebaseapp.com",
    databaseURL: "https://receivenow.firebaseio.com",
    projectId: "receivenow",
    storageBucket: "receivenow.appspot.com",
    messagingSenderId: "16064943391",
    appId: "1:16064943391:web:2eb290c9f61a4124474c2a"
};

firebase.initializeApp(firebaseConfig);

const store = firebase.firestore();

const auth = firebase.auth();

export {
    store,
    auth,
};
