// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDy_fe871YfGUA8XxO_hiaNW17uiWVdjQ",
  authDomain: "simple-firebase-2-2af45.firebaseapp.com",
  projectId: "simple-firebase-2-2af45",
  storageBucket: "simple-firebase-2-2af45.firebasestorage.app",
  messagingSenderId: "335902927754",
  appId: "1:335902927754:web:b8969d15712cae8a003673",
  measurementId: "G-GNHFNXCLW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)