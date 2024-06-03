import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACGldrHtFJDShnNAz7z3zDVw57qzZQR1A",
  authDomain: "api-testing-c9be1.firebaseapp.com",
  projectId: "api-testing-c9be1",
  storageBucket: "api-testing-c9be1.appspot.com",
  messagingSenderId: "234421167419",
  appId: "1:234421167419:web:3ba0fc98a36255c191c31e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
