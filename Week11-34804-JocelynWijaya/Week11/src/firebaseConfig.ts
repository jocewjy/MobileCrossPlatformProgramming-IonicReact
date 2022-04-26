// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6k6K2g465wPHEzs_h92JzAoWjWtXyN1Q",
  authDomain: "ionic-firebase-5a38d.firebaseapp.com",
  projectId: "ionic-firebase-5a38d",
  storageBucket: "ionic-firebase-5a38d.appspot.com",
  messagingSenderId: "307478151084",
  appId: "1:307478151084:web:5b9f95c9806ebdfd634409",
  measurementId: "G-SR43VJNYTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;