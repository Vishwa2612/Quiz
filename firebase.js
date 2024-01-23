import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2GuOgYW2YrYosStYxJbLBICTXSjn2LV4",
  authDomain: "quiz-app-1a2.firebaseapp.com",
  projectId: "quiz-app-1a2",
  storageBucket: "quiz-app-1a2.appspot.com",
  messagingSenderId: "704582212127",
  appId: "1:704582212127:web:39c213f9aeafae7ca0132a"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const db = getFirestore(app);