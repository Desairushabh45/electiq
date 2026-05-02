/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { getPerformance, trace } from 'firebase/performance';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const storage = getStorage(app);

const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

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

/**
 * Starts a performance trace for page loading
 * @param {string} pageName - name of the page
 * @returns {object|null} The trace object or null if performance is disabled
 */
export const startPageLoadTrace = (pageName) => {
  if (!perf) return null;
  const t = trace(perf, `page_load_${pageName}`);
  t.start();
  return t;
};

/**
 * Starts a performance trace for quiz completion
 * @returns {object|null} The trace object or null if performance is disabled
 */
export const startQuizCompletionTrace = () => {
  if (!perf) return null;
  const t = trace(perf, 'quiz_completion');
  t.start();
  return t;
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

export { analytics, db, rtdb, perf, storage, remoteConfig };
export default app;

/**
 * Fetches a value from Firebase Remote Config
 * @param {string} key - Remote Config parameter key
 * @returns {Promise<string|null>} The config value or null on error
 */
export const getRemoteValue = async (key) => {
  try {
    await fetchAndActivate(remoteConfig);
    return getValue(remoteConfig, key).asString();
  } catch (e) {
    console.warn('Remote config error:', e.message);
    return null;
  }
};

/**
 * Uploads a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - Destination storage path
 * @returns {Promise<string|null>} The download URL or null on error
 */
export const uploadFile = async (file, path) => {
  try {
    const ref = storageRef(storage, path);
    await uploadBytes(ref, file);
    return await getDownloadURL(ref);
  } catch (e) {
    console.warn('Storage error:', e.message);
    return null;
  }
};

