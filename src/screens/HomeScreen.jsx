/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { BookOpen, Clock, HelpCircle, Info, ArrowRight, Users, Vote, Award } from 'lucide-react';
import { SCREENS } from '../constants';

const FEATURE_CARDS = [
  {
    icon: BookOpen, label: 'How It Works', screen: SCREENS.HOW_IT_WORKS,
    desc: 'Voter registration, EVMs, and vote counting explained step by step.',
    bg: 'bg-orange-50', iconColor: '#FF9933', border: 'border-orange-100',
  },
  {
    icon: Clock, label: 'Election Timeline', screen: SCREENS.TIMELINE,
    desc: 'Follow all 8 stages of an Indian election from announcement to oath.',
    bg: 'bg-blue-50', iconColor: '#1a237e', border: 'border-blue-100',
  },
  {
    icon: HelpCircle, label: 'Test Yourself', screen: SCREENS.QUIZ,
    desc: '6 quick questions to test your knowledge of Indian elections.',
    bg: 'bg-green-50', iconColor: '#138808', border: 'border-green-100',
  },
  {
    icon: Info, label: 'About ECI', screen: SCREENS.ABOUT_ECI,
    desc: 'Learn about India\'s Election Commission and its role in democracy.',
    bg: 'bg-purple-50', iconColor: '#7c3aed', border: 'border-purple-100',
  },
];

const STATS = [
  { icon: Users, value: '96.8 Cr', label: 'Registered Voters' },
  { icon: Vote,  value: '543',     label: 'Lok Sabha Seats' },
  { icon: Award, value: '1950',    label: 'ECI Established' },
];

/**
 * HomeScreen component - main landing page for ElectIQ
 * @param {function} nav - navigation handler to change screens
 * @param {string} screen - currently active screen identifier
 * @returns {JSX.Element} Landing page with feature cards and stats
 */
export default function HomeScreen({ nav, screen }) {
  return (
    <div id="main-content" role="main">
      {/* ── HERO ── */}
      <section role="region" aria-labelledby="hero-heading" className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 55%, #1565c0 100%)' }}>

        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF9933, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #138808, transparent)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-5 py-2 rounded-full text-sm font-semibold mb-8">
            🗳️ India's Election Education Platform
          </div>

          <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span style={{ color: '#FF9933' }}>ElectIQ</span> — Your Election
            <br className="hidden md:block" /> Education Assistant
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Understand Indian Elections Step by Step —
            from voter registration to the swearing-in ceremony, made simple for every citizen.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => nav(SCREENS.TIMELINE)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-inavy-500 transition-all hover:scale-105 hover:shadow-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Explore Timeline"
              style={{ background: '#FF9933', color: '#1a237e' }}>
              Explore Timeline <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button onClick={() => nav(SCREENS.HOW_IT_WORKS)}
              aria-label="How It Works"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              How It Works
            </button>
          </div>
        </div>

        {/* Tricolor band at bottom */}
        <div className="flex h-1.5 w-full">
          <div className="flex-1" style={{ background: '#FF9933' }} />
          <div className="flex-1 bg-white" />
          <div className="flex-1" style={{ background: '#138808' }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section role="region" aria-label="Quick Stats" className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center bg-white rounded-2xl p-5 card-shadow border border-slate-100">
                <Icon size={24} className="mx-auto mb-2 text-saffron-500" aria-hidden="true" />
                <p className="text-2xl font-extrabold" style={{ color: '#1a237e' }}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section role="region" aria-labelledby="features-heading" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h2 id="features-heading" className="section-heading">What Would You Like to Learn?</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Choose a topic below to start your election education journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <button key={i} onClick={() => nav(card.screen)}
                aria-label={`Learn more about ${card.label}`}
                className={`group text-left ${card.bg} border ${card.border} rounded-2xl p-6 card-shadow hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: card.iconColor + '20' }}>
                  <Icon size={24} style={{ color: card.iconColor }} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-inavy-500 transition-colors">
                  {card.label}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className="text-xs font-bold flex items-center gap-1" style={{ color: card.iconColor }}>
                  Learn more <ArrowRight size={12} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── AI CTA BANNER ── */}
      <section role="region" aria-labelledby="ai-cta-heading" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #138808, #15803d)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(circle at 30% 50%, white, transparent)' }} />
          <div className="relative">
            <p className="text-4xl mb-4" aria-hidden="true">🤖</p>
            <h2 id="ai-cta-heading" className="text-2xl md:text-3xl font-extrabold mb-3" style={{ fontFamily: 'Outfit' }}>
              Have Questions? Ask the AI
            </h2>
            <p className="text-green-100 text-base mb-6 max-w-lg mx-auto">
              Our Gemini-powered ElectIQ AI can answer any question about Indian elections, ECI, EVMs, MCC, and more — in Hindi or English.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
              aria-label="Ask ElectIQ AI"
              className="px-8 py-3.5 bg-white rounded-xl font-bold text-igreen-500 hover:bg-green-50 transition-all hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              style={{ color: '#138808' }}>
              ✨ Ask ElectIQ AI
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-inavy-500 text-white py-8" style={{ background: '#1a237e' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-extrabold text-xl" style={{ fontFamily: 'Outfit' }}>
            🇮🇳 Elect<span style={{ color: '#FF9933' }}>IQ</span>
          </div>
          <p className="text-blue-200 text-sm text-center">
            A non-partisan educational platform to understand Indian democracy. Not affiliated with ECI.
          </p>
          <p className="text-blue-300 text-xs">© {new Date().getFullYear()} ElectIQ</p>
        </div>
      </footer>
    </div>
  );
}

HomeScreen.propTypes = {
  nav: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};

