import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Initialize Firebase Analytics on app start
import './firebase.js'

// Performance Observer — tracks Web Vitals
const reportWebVitals = (metric) => {
  if (metric.name === 'CLS') console.log('[ElectIQ] CLS:', metric.value);
  if (metric.name === 'LCP') console.log('[ElectIQ] LCP:', metric.value);
  if (metric.name === 'FID') console.log('[ElectIQ] FID:', metric.value);
};

if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => reportWebVitals(entry));
  });
  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    observer.observe({ type: 'first-input', buffered: true });
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('[ElectIQ] PerformanceObserver error:', e);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
