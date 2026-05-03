/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Vote, ArrowRight } from 'lucide-react';

/**
 * Hero component - top hero section of the landing page
 * @param {function} nav - navigation handler to change screens
 * @returns {JSX.Element} Hero banner with main CTAs
 */
const Hero = React.memo(function Hero({ nav }) {
  return (
    <section className="text-center pt-8 pb-6 flex flex-col items-center gap-6">
      {/* Indian tri-color accent bar */}
      <div className="flex w-40 h-1.5 rounded-full overflow-hidden mb-1">
        <span className="flex-1 bg-saffron-500" />
        <span className="flex-1 bg-white border-y border-slate-200" />
        <span className="flex-1 bg-india-green" />
      </div>

      <div className="inline-flex items-center gap-2 bg-saffron-50 border border-saffron-200 text-saffron-700 px-4 py-2 rounded-full font-semibold text-sm">
        🗳️ <span><span lang="hi" className="font-hindi">भारत का चुनाव मार्गदर्शक</span> · India's Election Guide</span>
      </div>

      <h1 className="text-5xl lg:text-6xl font-extrabold max-w-4xl tracking-tight leading-tight">
        <span className="text-slate-900">Understand the </span>
        <span className="text-saffron-500">Election Process</span>
      </h1>

      <p className="text-xl text-slate-600 max-w-2xl mt-2 leading-relaxed">
        Step-by-step interactive guide to Indian elections — timelines, voting procedures, and democratic processes made simple for every citizen
      </p>

      {/* 3 highlight badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-2 mb-2">
        <span className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-medium">✅ Interactive Timelines</span>
        <span className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-medium">✅ Step-by-Step Process</span>
        <span className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-medium">✅ AI-Powered Assistant</span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
          className="bg-india-navy text-white px-8 py-4 text-lg rounded-lg font-semibold shadow-md hover:bg-blue-900 hover:shadow-lg transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Explore Timeline <ArrowRight size={20} aria-hidden="true" />
        </button>
        <button
          onClick={() => document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-india-navy border-2 border-blue-200 px-8 py-4 text-lg rounded-lg font-semibold shadow-sm hover:border-india-navy hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Take the Quiz 📝
        </button>
      </div>
    </section>
  );
});

Hero.propTypes = {
  nav: PropTypes.func.isRequired,
};

export default Hero;

