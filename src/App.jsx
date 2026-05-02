import { useState } from 'react';
import { SCREENS } from './constants';
import { trackEvent, saveToRTDB } from './firebase';
import Navbar from './components/Navbar';
import FloatingChatbot from './components/FloatingChatbot';
import HomeScreen from './screens/HomeScreen';
import TimelineScreen from './screens/TimelineScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import QuizScreen from './screens/QuizScreen';
import AboutECIScreen from './screens/AboutECIScreen';

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);

  const nav = (s) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    trackEvent('page_view', { page: s });
    trackEvent('screen_change', { from: screen, to: s });
    saveToRTDB('page_views', { page: s });
  };

  const screenProps = { nav, screen };

  return (
    <div className="min-h-screen bg-white">
      <Navbar screen={screen} nav={nav} />
      <main className="pt-16">
        <div key={screen} className="page-animate">
          {screen === SCREENS.HOME && <HomeScreen {...screenProps} />}
          {screen === SCREENS.TIMELINE && <TimelineScreen {...screenProps} />}
          {screen === SCREENS.HOW_IT_WORKS && <HowItWorksScreen {...screenProps} />}
          {screen === SCREENS.QUIZ && <QuizScreen {...screenProps} />}
          {screen === SCREENS.ABOUT_ECI && <AboutECIScreen {...screenProps} />}
        </div>
      </main>
      <FloatingChatbot />
    </div>
  );
}