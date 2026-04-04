import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
