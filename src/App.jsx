import { useState, lazy, Suspense, useCallback, useEffect } from 'react';
import { SCREENS } from './constants';
import { trackEvent, saveToRTDB, checkPageSpeed, checkSafeBrowsing } from './firebase';
import Navbar from './components/Navbar';
import FloatingChatbot from './components/FloatingChatbot';
import ErrorBoundary from './components/ErrorBoundary';

const HomeScreen      = lazy(() => import('./screens/HomeScreen'));
const TimelineScreen  = lazy(() => import('./screens/TimelineScreen'));
const HowItWorksScreen = lazy(() => import('./screens/HowItWorksScreen'));
const QuizScreen      = lazy(() => import('./screens/QuizScreen'));
const AboutECIScreen  = lazy(() => import('./screens/AboutECIScreen'));

/**
 * Skeleton loader shown during lazy-chunk loading
 * @returns {JSX.Element} Animated placeholder layout
 */
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4 p-8 max-w-3xl mx-auto" aria-label="Loading content" role="status">
    <div className="h-8 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
    <div className="h-32 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/5" />
    <div className="h-4 bg-gray-200 rounded w-4/5" />
  </div>
);

/**
 * App component — main application container
 * Handles screen routing, analytics, and Google API integrations
 * @type {import('react').FC}
 * @returns {JSX.Element} Root application element
 */
export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);

  /**
   * Navigation handler — switches screen, scrolls to top, logs analytics
   * @param {string} s - target screen identifier from SCREENS constants
   * @returns {void}
   */
  const nav = useCallback((s) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view', { page: s });
    trackEvent('screen_change', { from: screen, to: s });
    saveToRTDB('page_views', { page: s });
  }, [screen]);

  // Google PageSpeed Insights API + Safe Browsing API — called once on mount
  useEffect(() => {
    checkPageSpeed().then((score) => {
      if (score !== null) {
        trackEvent('pagespeed_score', { score: Math.round(score * 100) });
        console.log('[ElectIQ] PageSpeed score:', Math.round(score * 100));
      }
    });
    checkSafeBrowsing('https://electiq-ffd78.web.app').then((isSafe) => {
      trackEvent('safe_browsing_check', { is_safe: isSafe });
    });

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        console.log('[ElectIQ] App idle - preloading resources');
      });
    }
  }, []);

  const screenProps = { nav, screen };

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-3">
        Skip to main content
      </a>
      <Navbar screen={screen} nav={nav} />
      <div className="pt-16">
        <div key={screen} className="page-animate">
          {screen === SCREENS.HOME && (
            <ErrorBoundary><Suspense fallback={<SkeletonLoader />}><HomeScreen {...screenProps} /></Suspense></ErrorBoundary>
          )}
          {screen === SCREENS.TIMELINE && (
            <ErrorBoundary><Suspense fallback={<SkeletonLoader />}><TimelineScreen {...screenProps} /></Suspense></ErrorBoundary>
          )}
          {screen === SCREENS.HOW_IT_WORKS && (
            <ErrorBoundary><Suspense fallback={<SkeletonLoader />}><HowItWorksScreen {...screenProps} /></Suspense></ErrorBoundary>
          )}
          {screen === SCREENS.QUIZ && (
            <ErrorBoundary><Suspense fallback={<SkeletonLoader />}><QuizScreen {...screenProps} /></Suspense></ErrorBoundary>
          )}
          {screen === SCREENS.ABOUT_ECI && (
            <ErrorBoundary><Suspense fallback={<SkeletonLoader />}><AboutECIScreen {...screenProps} /></Suspense></ErrorBoundary>
          )}
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
}