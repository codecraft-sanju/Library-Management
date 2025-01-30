import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAoTjrhdUKcN06YQHidq-HcIel-0-5i0ek',
  authDomain: 'library-management-c4e2c.firebaseapp.com',
  projectId: 'library-management-c4e2c',
  storageBucket: 'library-management-c4e2c.firebasestorage.app',
  messagingSenderId: '742820395651',
  appId: '1:742820395651:web:a39e1f26e85a104d9f79b6',
  measurementId: 'G-YPV6KWTW43',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
};
