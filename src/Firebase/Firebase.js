
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDfs65lBwXy7BeNE-lABwcBwa3wLttiewA",
  authDomain: "pro-ecomerce-4-04.firebaseapp.com",
  projectId: "pro-ecomerce-4-04",
  storageBucket: "pro-ecomerce-4-04.firebasestorage.app",
  messagingSenderId: "316056033213",
  appId: "1:316056033213:web:5d4b25709ca4114acce4d4"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)