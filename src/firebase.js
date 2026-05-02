/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

let perf = null;
try {
  perf = getPerformance(app);
} catch (e) {
  console.warn('Performance monitoring not available:', e.message);
}

/**
 * Logs a custom analytics event to Firebase Analytics
 * @param {string} eventName - GA4 event name
 * @param {object} params - optional event parameters
 * @returns {void}
 */
export const trackEvent = (eventName, params = {}) => {
  try {
    logEvent(analytics, eventName, params);
  } catch (e) {
    console.warn('[Analytics] Event not logged:', eventName, e.message);
  }
};

/**
 * Saves quiz score to Firestore database
 * @param {number} score - number of correct answers
 * @param {number} total - total number of questions
 * @returns {Promise<void>}
 */
export const saveQuizScore = async (score, total) => {
  try {
    await addDoc(collection(db, 'quiz_scores'), {
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.warn('[Firestore] Score not saved:', e.message);
  }
};

export const getQuizScores = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'quiz_scores'));
    return snapshot.docs.map(doc => doc.data());
  } catch (e) {
    console.warn('[Firestore] Scores not fetched:', e.message);
    return [];
  }
};

/**
 * Saves data to Firebase Realtime Database
 * @param {string} path - database path
 * @param {object} data - data to save
 * @returns {void}
 */
export const saveToRTDB = (path, data) => {
  try {
    const dbRef = ref(rtdb, path);
    push(dbRef, { ...data, timestamp: Date.now() });
  } catch (e) {
    console.warn('[RTDB] Data not saved:', e.message);
  }
};

export { analytics, db, rtdb, perf };
export default app;

