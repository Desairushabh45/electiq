import { useState, lazy, Suspense, useCallback } from 'react';
import { SCREENS } from './constants';
import { trackEvent, saveToRTDB } from './firebase';
import Navbar from './components/Navbar';
import FloatingChatbot from './components/FloatingChatbot';
import ErrorBoundary from './components/ErrorBoundary';

const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const TimelineScreen = lazy(() => import('./screens/TimelineScreen'));
const HowItWorksScreen = lazy(() => import('./screens/HowItWorksScreen'));
const QuizScreen = lazy(() => import('./screens/QuizScreen'));
const AboutECIScreen = lazy(() => import('./screens/AboutECIScreen'));

/**
 * App component - main application container
 * @returns {JSX.Element} Root application element
 */
export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);

  const nav = useCallback((s) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    trackEvent('page_view', { page: s });
    trackEvent('screen_change', { from: screen, to: s });
    saveToRTDB('page_views', { page: s });
  }, [screen]);

  const screenProps = { nav, screen };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-3">
        Skip to main content
      </a>
      <Navbar screen={screen} nav={nav} />
      <div className="pt-16">
        <div key={screen} className="page-animate">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          }>
            {screen === SCREENS.HOME && <HomeScreen {...screenProps} />}
            {screen === SCREENS.TIMELINE && <TimelineScreen {...screenProps} />}
            {screen === SCREENS.HOW_IT_WORKS && <HowItWorksScreen {...screenProps} />}
            {screen === SCREENS.QUIZ && <QuizScreen {...screenProps} />}
            {screen === SCREENS.ABOUT_ECI && <AboutECIScreen {...screenProps} />}
          </Suspense>
        </div>
      </div>
      <FloatingChatbot />
    </div>
    </ErrorBoundary>
  );
}