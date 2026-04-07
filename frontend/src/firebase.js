import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCkHybsBP1Y1AWuMA2SqD8OZuEkfeE3YA',
  authDomain: 'jk-bridal.firebaseapp.com',
  projectId: 'jk-bridal',
  storageBucket: 'jk-bridal.firebasestorage.app',
  messagingSenderId: '1095862592619',
  appId: '1:1095862592619:web:1ec4fc0d4967e4c5dcfd2e',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

let authInstance = null;
export function getFirebaseAuth() {
  if (!authInstance) {
    authInstance = getAuth(app);
  }
  return authInstance;
}
