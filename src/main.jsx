import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Initialize Firebase Analytics on app start
import './firebase.js'

// Performance Observer — tracks LCP for Web Vitals monitoring
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('[ElectIQ] LCP:', Math.round(entry.startTime), 'ms');
        }
        if (entry.entryType === 'first-input') {
          console.log('[ElectIQ] FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
        }
      });
    });
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  } catch (e) {
    // PerformanceObserver not fully supported — safe to ignore
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
