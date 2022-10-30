import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdqvP47pOeNtRggZJcxGOJKpyi7s_ZaPo",
  authDomain: "task-manager-43d9a.firebaseapp.com",
  projectId: "task-manager-43d9a",
  storageBucket: "task-manager-43d9a.appspot.com",
  messagingSenderId: "650092523205",
  appId: "1:650092523205:web:34d9f12abd57c4155c4aac"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch(err => {
    err.code === 'failed-precondition' ? console.error("Offline persistence doesn't work with multiple tabs open") : 
    err.code === 'unimplemented' ? console.error("Current browser doesn't support offline persistence") :
    console.error("unknown error with offline persistence");
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
