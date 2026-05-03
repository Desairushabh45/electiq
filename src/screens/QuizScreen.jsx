/* eslint-disable no-unused-vars */
import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, XCircle, RefreshCcw, Award } from 'lucide-react';

const QUESTIONS = [
  {
    q: 'What does ECI stand for?',
    options: ['Election Control of India', 'Election Commission of India', 'Electoral Council of India', 'Executive Committee of India'],
    answer: 1,
    explanation: 'ECI stands for Election Commission of India. It is an independent constitutional body established under Article 324 of the Constitution to conduct free and fair elections.',
  },
  {
    q: 'What is the minimum age to vote in India?',
    options: ['16 years', '21 years', '18 years', '25 years'],
    answer: 2,
    explanation: 'The minimum voting age in India is 18 years, reduced from 21 by the 61st Constitutional Amendment in 1988, effective from 1989.',
  },
  {
    q: 'What does NOTA stand for on an EVM ballot?',
    options: ['No Official Tally Available', 'None of the Above', 'National Option for Total Abstention', 'No Other Than Abstaining'],
    answer: 1,
    explanation: 'NOTA stands for "None of the Above." Introduced in 2013 by the Supreme Court, it lets voters reject all candidates. But even if NOTA gets the most votes, the candidate with the highest votes among listed candidates wins.',
  },
  {
    q: 'What is the Model Code of Conduct (MCC)?',
    options: [
      'A law passed by Parliament for elections',
      'ECI guidelines that restrict campaigning and government actions during election period',
      'A code for candidate behavior only',
      'Rules for media coverage',
    ],
    answer: 1,
    explanation: 'The MCC is a set of guidelines issued by ECI that comes into force when the election schedule is announced. It prevents the ruling party from making new policy announcements and misusing government resources.',
  },
  {
    q: 'How many seats are there in the Lok Sabha?',
    options: ['250', '552', '543', '500'],
    answer: 2,
    explanation: 'The Lok Sabha has 543 directly elected seats. The 104th Constitutional Amendment (2020) removed 2 nominated seats for the Anglo-Indian community.',
  },
  {
    q: 'What does EVM stand for?',
    options: ['Electoral Voter Machine', 'Electronic Voting Machine', 'Electronic Voter Mechanism', 'Election Verification Module'],
    answer: 1,
    explanation: 'EVM stands for Electronic Voting Machine. India adopted EVMs nationwide in 2004. They are standalone, non-networked devices that cannot be connected to the internet.',
  },
];

const RANKS = [
  { min: 6, label: 'भारत रत्न — Election Expert! 🏆', color: '#b45309' },
  { min: 4, label: 'Lok Sabha Scholar 🏛️', color: '#1a237e' },
  { min: 2, label: 'Engaged Citizen 🗳️', color: '#138808' },
  { min: 0, label: <><span lang="hi" className="font-hindi">नागरिक शागिर्द</span> — Keep Learning 📚</>, color: '#FF9933' },
];

/**
 * QuizScreen component - interactive election knowledge quiz
 * @param {function} nav - navigation handler to change screens
 * @param {string} screen - currently active screen identifier
 * @returns {JSX.Element} Interactive 6-question quiz
 */
export default function QuizScreen({ nav, screen }) {
  const [idx, setIdx]         = useState(0);
  const [chosen, setChosen]   = useState(null);
  const [score, setScore]     = useState(0);
  const [done, setDone]       = useState(false);

  const q = QUESTIONS[idx];
  const rank = RANKS.find(r => score >= r.min);

  const scorePercentage = useMemo(() => 
    Math.round((score / QUESTIONS.length) * 100),
    [score]
  );

  const pick = useCallback((i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) setScore(s => s + 1);
  }, [chosen, q.answer]);

  const next = useCallback(() => {
    if (idx < QUESTIONS.length - 1) { setIdx(i => i + 1); setChosen(null); }
    else setDone(true);
  }, [idx]);

  const reset = useCallback(() => { setIdx(0); setChosen(null); setScore(0); setDone(false); }, []);

  if (done) return (
    <div id="main-content" role="main" className="max-w-xl mx-auto px-4 py-16 text-center">
      <Award size={72} className="mx-auto mb-6" style={{ color: '#FF9933' }} aria-hidden="true" />
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Outfit' }}>Quiz Complete!</h2>
      <p className="text-slate-500 mb-8">Here's how you scored on Indian Election Knowledge</p>

      <div role="status" className="rounded-3xl p-8 mb-8 border-2" style={{ background: '#fffbeb', borderColor: '#FF9933' }}>
        <p className="text-6xl font-extrabold mb-1" style={{ color: '#1a237e' }}>{score}<span className="text-2xl text-slate-400 font-normal"> / {QUESTIONS.length}</span></p>

        {/* Tricolor progress bar */}
        <div className="flex h-4 rounded-full overflow-hidden my-5">
          <div className="transition-all duration-700" style={{ width: `${(score/QUESTIONS.length)*100*0.333}%`, background: '#FF9933' }} />
          <div className="transition-all duration-700" style={{ width: `${(score/QUESTIONS.length)*100*0.333}%`, background: '#e2e8f0' }} />
          <div className="transition-all duration-700" style={{ width: `${(score/QUESTIONS.length)*100*0.334}%`, background: '#138808' }} />
        </div>

        <p className="text-lg font-bold" style={{ color: rank.color }}>{rank.label}</p>
      </div>

      {/* Review answers */}
      <div className="text-left space-y-3 mb-8">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white text-sm">
            <p className="font-semibold text-slate-700 mb-1">Q{i+1}. {q.q}</p>
            <p className="text-green-700 font-medium text-xs">✓ {q.options[q.answer]}</p>
          </div>
        ))}
      </div>

      <button onClick={reset}
        className="flex items-center gap-2 mx-auto px-8 py-3.5 rounded-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{ background: '#1a237e' }}>
        <RefreshCcw size={18} aria-hidden="true" /> Retake Quiz
      </button>
    </div>
  );

  return (
    <div id="main-content" role="main" className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="section-heading mb-2">🇮🇳 Test Your Knowledge</h1>
        <p className="text-slate-500">6 questions on India's election system. How much do you know?</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Question {idx+1} of {QUESTIONS.length}</span>
          <span>Score: <strong style={{ color: '#1a237e' }}>{score}</strong></span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((idx)/QUESTIONS.length)*100}%`, background: '#FF9933' }} />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-3xl p-8 card-shadow border border-slate-100 mb-6">
        <p className="text-xs font-bold text-saffron-500 uppercase tracking-wider mb-3">Question {idx+1}</p>
        <h2 id="question-heading" className="text-xl font-bold text-slate-900 mb-6 leading-snug">{q.q}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect  = i === q.answer;
            const isChosen   = i === chosen;
            const isWrong    = isChosen && !isCorrect;
            const showGreen  = chosen !== null && isCorrect;
            const showRed    = isWrong;

            return (
              <button key={i} onClick={() => pick(i)} disabled={chosen !== null}
                aria-label={`Option ${i+1}: ${opt}`}
                aria-describedby="question-heading"
                className="w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  borderColor: showGreen ? '#138808' : showRed ? '#dc2626' : chosen !== null ? '#e2e8f0' : '#e2e8f0',
                  background:  showGreen ? '#f0fdf4' : showRed ? '#fef2f2' : chosen !== null ? '#f8fafc' : 'white',
                  color:       showGreen ? '#166534' : showRed ? '#991b1b' : '#334155',
                  opacity: chosen !== null && !isCorrect && !isChosen ? 0.5 : 1,
                  cursor: chosen !== null ? 'default' : 'pointer',
                }}>
                <span>{opt}</span>
                {showGreen && <CheckCircle2 size={20} className="flex-shrink-0" style={{ color: '#138808' }} aria-hidden="true" />}
                {showRed   && <XCircle      size={20} className="flex-shrink-0" style={{ color: '#dc2626' }} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {chosen !== null && (
          <div aria-live="polite" className="mt-5 p-4 rounded-xl text-sm leading-relaxed"
            style={{ background: '#eff6ff', borderLeft: '4px solid #1a237e' }}>
            <strong className="text-inavy-500" style={{ color: '#1a237e' }}>💡 Explanation:</strong>
            <span className="text-slate-600 ml-1">{q.explanation}</span>
          </div>
        )}
      </div>

      {/* Next button */}
      {chosen !== null && (
        <div className="flex justify-end">
          <button onClick={next}
            className="px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ background: '#1a237e' }}>
            {idx < QUESTIONS.length - 1 ? 'Next Question →' : 'View Results 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}

QuizScreen.propTypes = {
  nav: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};

