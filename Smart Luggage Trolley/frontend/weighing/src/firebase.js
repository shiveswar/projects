// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_SHFeYHzmIYZmeBFjAzL_vIq7I3yFwJM",
    authDomain: "iot-weighing-machine.firebaseapp.com",
    databaseURL: "https://iot-weighing-machine-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-weighing-machine",
    storageBucket: "iot-weighing-machine.appspot.com",
    messagingSenderId: "95509724253",
    appId: "1:95509724253:web:d2ba2417cb2ab81aa9e1b4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
