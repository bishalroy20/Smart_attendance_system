// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9WeYKL-UptOGofo9D3w7dduLxiZeEfEE",
  authDomain: "smart-attendance-ef7ae.firebaseapp.com",
  projectId: "smart-attendance-ef7ae",
  storageBucket: "smart-attendance-ef7ae.firebasestorage.app",
  messagingSenderId: "89820578088",
  appId: "1:89820578088:web:6035eaf9bd7e23dd8e501d"
};


export default firebaseConfig;
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);