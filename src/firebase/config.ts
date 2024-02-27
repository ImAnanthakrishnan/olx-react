import * as firebase from '@firebase/app';
import  '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'
//import { collection } from 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdZ9K3gvNvGZT8kRNmEFZMcuWqlncmVLU",
    authDomain: "olx-clone-770a2.firebaseapp.com",
    projectId: "olx-clone-770a2",
    storageBucket: "olx-clone-770a2.appspot.com",
    messagingSenderId: "85875790218",
    appId: "1:85875790218:web:d348380176b0c5bec3b873",
    measurementId: "G-XELP7WM0EG"
  };

export default firebase.initializeApp(firebaseConfig);



