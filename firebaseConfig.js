// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrreu0NtXsdMHsaRj-Uim7UtrR4Dh9-uE",
  authDomain: "thevetapp-fd704.firebaseapp.com",
  projectId: "thevetapp-fd704",
  storageBucket: "thevetapp-fd704.appspot.com",
  messagingSenderId: "236972370773",
  appId: "1:236972370773:web:30544bd7da04521f5c1ddc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export default app;