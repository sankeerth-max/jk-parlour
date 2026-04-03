import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyCf8GCBzbAeoT4SgTkmgLhFHqginWhh4VE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'sri-karthika-bridal-studio.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'sri-karthika-bridal-studio',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'sri-karthika-bridal-studio.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '746492450266',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:746492450266:web:d3fb9e4451812ddec11ce3',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? 'G-2SV8MHHZV1',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
