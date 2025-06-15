// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA_s9L6HNy3Wph9kkqQag5oLUSIu3oGpEA',
  authDomain: 'netflixgpt-bf382.firebaseapp.com',
  projectId: 'netflixgpt-bf382',
  storageBucket: 'netflixgpt-bf382.firebasestorage.app',
  messagingSenderId: '1010662789014',
  appId: '1:1010662789014:web:9ec654ae1aea722bc497b7',
  measurementId: 'G-F9GZPWP3CF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
