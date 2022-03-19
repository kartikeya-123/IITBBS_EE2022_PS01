// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZxbdZVJSCpoKZHOhJH9JdXj_787HWs-E",
  authDomain: "gcee2022-4813e.firebaseapp.com",
  databaseURL:
    "https://gcee2022-4813e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gcee2022-4813e",
  storageBucket: "gcee2022-4813e.appspot.com",
  messagingSenderId: "104738632789",
  appId: "1:104738632789:web:243d9bc7ade79989ddd0dc",
  measurementId: "G-B83J93BWS0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
