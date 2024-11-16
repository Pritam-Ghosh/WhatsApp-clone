// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//step 1-->  
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMgJVwm023wKY9d4gEUAjljCUob4V2wvs",
  authDomain: "wa-clone-6c198.firebaseapp.com",
  projectId: "wa-clone-6c198",
  storageBucket: "wa-clone-6c198.firebasestorage.app",
  messagingSenderId: "778462933460",
  appId: "1:778462933460:web:cd3a15dd707cc2e7026641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//step 2-->
const auth = getAuth(app);
export {auth}