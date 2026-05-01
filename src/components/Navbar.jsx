import { useState } from 'react';
import { BookOpen, Clock, HelpCircle, Info, Menu, X } from 'lucide-react';
import { SCREENS } from '../constants';

const LINKS = [
  { label: 'Home',         screen: SCREENS.HOME,         icon: null },
  { label: 'Timeline',     screen: SCREENS.TIMELINE,     icon: Clock },
  { label: 'How It Works', screen: SCREENS.HOW_IT_WORKS, icon: BookOpen },
  { label: 'Quiz',         screen: SCREENS.QUIZ,         icon: HelpCircle },
  { label: 'About ECI',   screen: SCREENS.ABOUT_ECI,    icon: Info },
];

export default function Navbar({ screen, nav }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Tricolor top stripe */}
      <div className="tricolor-bar w-full" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button onClick={() => { nav(SCREENS.HOME); setOpen(false); }}
          className="flex items-center gap-2 font-extrabold text-xl"
          style={{ fontFamily: 'Outfit, sans-serif' }}>
          <span className="text-2xl">🇮🇳</span>
          <span style={{ color: '#1a237e' }}>Elect<span style={{ color: '#FF9933' }}>IQ</span></span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.slice(1).map(link => (
            <button key={link.screen} onClick={() => nav(link.screen)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                screen === link.screen
                  ? 'bg-inavy-50 text-inavy-500'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-inavy-500'
              }`}>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { window.dispatchEvent(new CustomEvent('open-chatbot')); }}
            className="ml-3 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#FF9933' }}>
            ✨ Ask AI
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1 shadow-lg">
          {LINKS.map(link => (
            <button key={link.screen}
              onClick={() => { nav(link.screen); setOpen(false); }}
              className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                screen === link.screen ? 'bg-orange-50 text-saffron-600' : 'text-slate-700 hover:bg-slate-50'
              }`}>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { window.dispatchEvent(new CustomEvent('open-chatbot')); setOpen(false); }}
            className="mt-1 py-3 rounded-xl text-sm font-bold text-white text-center"
            style={{ background: '#FF9933' }}>
            ✨ Ask AI — Powered by Gemini
          </button>
        </div>
      )}
    </header>
  );
}
