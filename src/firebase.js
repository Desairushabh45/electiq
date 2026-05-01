import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/**
 * Log a custom analytics event.
 * @param {string} eventName - GA4 event name
 * @param {object} [params] - optional event params
 */
export const trackEvent = (eventName, params = {}) => {
  try {
    logEvent(analytics, eventName, params);
  } catch (e) {
    // Analytics may not be available in some environments
    console.warn('[Analytics] Event not logged:', eventName, e.message);
  }
};

export { analytics };
export default app;
