import "firebase/firestore";
import "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyCOr-SPm5ebSjxxgwp_Cn6AUB1mHwNhEAs",
  authDomain: "pf-henry.firebaseapp.com",
  projectId: "pf-henry",
  storageBucket: "pf-henry.appspot.com",
  messagingSenderId: "1046238667346",
  appId: "1:1046238667346:web:1d2dafcb1bd2592977758b",
}; */

// firebase mauricio giana
const firebaseConfig = {
  apiKey: "AIzaSyCY3cqgmMKv38TW6ohkZBQYBZGSMWgeSq8",
  authDomain: "work-app-mg.firebaseapp.com",
  projectId: "work-app-mg",
  storageBucket: "work-app-mg.appspot.com",
  messagingSenderId: "348841592950",
  appId: "1:348841592950:web:dbc021bf72bcdb3273f757",
  measurementId: "G-5LNBYCXHRR"
};



// Initialize Firebase
initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();

export { googleAuthProvider };
