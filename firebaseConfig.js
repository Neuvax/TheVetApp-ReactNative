import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrreu0NtXsdMHsaRj-Uim7UtrR4Dh9-uE",
    authDomain: "thevetapp-fd704.firebaseapp.com",
    projectId: "thevetapp-fd704",
    storageBucket: "thevetapp-fd704.appspot.com",
    messagingSenderId: "236972370773",
    appId: "1:236972370773:web:30544bd7da04521f5c1ddc"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }
 
 export default firebase;
