import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase =require('firebase');
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyA9n5mH6Db25stWGoILypbswnzEe95CXoo",
    authDomain: "react-messaging-application.firebaseapp.com",
    databaseURL: "https://react-messaging-application.firebaseio.com",
    projectId: "react-messaging-application",
    storageBucket: "react-messaging-application.appspot.com",
    messagingSenderId: "300406475041",
    appId: "1:300406475041:web:53b65da2127df4a2"
})




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
