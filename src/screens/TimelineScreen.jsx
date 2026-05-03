/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';

const STEPS = [
  {
    num: 1, emoji: '📢', title: 'Election Announcement',
    sub: 'Model Code of Conduct Begins',
    color: '#FF9933', bg: '#fff7ed',
    detail: 'The Election Commission of India (ECI) announces the election schedule. The moment the schedule is announced, the Model Code of Conduct (MCC) comes into force — restricting the ruling government from announcing new schemes or using government machinery for campaigns.',
    fact: 'The MCC is not a law but a voluntary code agreed upon by all political parties. Violators can face action by ECI.',
  },
  {
    num: 2, emoji: '📋', title: 'Voter Registration Deadline',
    sub: 'Last Date to Enroll / Update',
    color: '#1565c0', bg: '#eff6ff',
    detail: 'Citizens must be registered on the Electoral Roll to vote. If you are not already registered, you can apply via Form 6 at voters.eci.gov.in. If you moved, update via Form 8A. The last date for changes is set by ECI.',
    fact: 'India had 96.8 crore (968 million) registered voters for the 2024 General Election — the world\'s largest electorate.',
  },
  {
    num: 3, emoji: '📝', title: 'Nomination Filing',
    sub: 'Candidates Submit Papers',
    color: '#7c3aed', bg: '#f5f3ff',
    detail: 'Candidates file their nomination papers (Form 2B) with the Returning Officer. They must pay a security deposit (₹25,000 for Lok Sabha) and submit an affidavit disclosing assets, liabilities, criminal records, and education. Nominations are scrutinized and can be rejected if defective.',
    fact: 'Over 8,360 candidates contested in the 2024 Lok Sabha election across 543 constituencies.',
  },
  {
    num: 4, emoji: '🎙️', title: 'Campaign Period',
    sub: '48-Hour Silence Before Polling',
    color: '#0891b2', bg: '#ecfeff',
    detail: 'Candidates and parties campaign through rallies, roadshows, door-to-door visits, social media, and advertising. Lok Sabha candidates can spend up to ₹95 lakh. All expenses must be recorded. Campaigning must stop 48 hours before polling (the "silence period").',
    fact: 'ECI deploys flying squads and expenditure observers to seize illicit cash, liquor, and freebies distributed to influence voters.',
  },
  {
    num: 5, emoji: '🗳️', title: 'Voting Day (EVM)',
    sub: 'Registered Voters Cast Ballots',
    color: '#138808', bg: '#f0fdf4',
    detail: 'On polling day, registered voters go to their assigned polling booth and press a button on the Electronic Voting Machine (EVM) next to their chosen candidate. A VVPAT machine shows a paper slip confirming the vote for 7 seconds. Voters can use Aadhaar, Passport, PAN, or 9 other approved documents.',
    fact: 'India uses over 1.5 million EVMs per general election. EVMs are standalone, non-networked devices — they cannot be hacked remotely.',
  },
  {
    num: 6, emoji: '🔢', title: 'Vote Counting',
    sub: 'Transparent Tabulation Begins',
    color: '#0f766e', bg: '#f0fdfa',
    detail: 'After all polling phases end, votes are counted on a single designated day. Counting happens at secure centers with Returning Officers, bipartisan counting agents, and ECI observers. EVM results are cross-checked against 5 randomly selected VVPAT slips per constituency.',
    fact: 'In the 2024 election, results for all 543 Lok Sabha seats were declared within a single day (June 4, 2024).',
  },
  {
    num: 7, emoji: '📊', title: 'Results Declaration',
    sub: 'ECI Certifies Winners',
    color: '#b45309', bg: '#fffbeb',
    detail: 'The Returning Officer formally declares the winner of each constituency. The candidate with the most votes (First Past The Post system) wins. Winners receive a Certificate of Election. Results are published on the ECI website in real-time.',
    fact: 'India uses First Past The Post (FPTP) — the candidate with the most votes wins even without a majority.',
  },
  {
    num: 8, emoji: '🎉', title: 'Winner Takes Oath',
    sub: 'Government Formation',
    color: '#c026d3', bg: '#fdf4ff',
    detail: 'The party or alliance with 272+ Lok Sabha seats forms the government. The President invites the majority leader to become Prime Minister. The PM and Cabinet are sworn in at Rashtrapati Bhavan. New MPs also take their oath in Parliament.',
    fact: 'India has had coalition governments since 1989. Even without a single party majority, the largest alliance can form the government.',
  },
];

/**
 * TimelineScreen component - interactive election timeline
 * @param {function} nav - navigation handler to change screens
 * @param {string} screen - currently active screen identifier
 * @returns {JSX.Element} 8-step timeline of the election process
 */
export default function TimelineScreen({ nav, screen }) {
  const [active, setActive] = useState(null);

  return (
    <div id="main-content" role="main" className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div role="region" aria-labelledby="timeline-heading" className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 text-white"
          style={{ background: '#FF9933' }}>
          8 Steps · India's Election Process
        </div>
        <h1 id="timeline-heading" className="section-heading text-4xl md:text-5xl mb-4">
          <span lang="hi" className="font-hindi">भारतीय चुनाव यात्रा</span>
          <br /><span className="text-3xl md:text-4xl text-slate-600 font-bold">Indian Election Timeline</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Click any step to learn more. Follow India's election process from the first announcement to the swearing-in ceremony.
        </p>
      </div>

      {/* Timeline */}
      <div role="list" className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200"
          style={{ transform: 'translateX(-50%)' }} />

        <div className="space-y-6">
          {STEPS.map((step, i) => {
            const isRight = i % 2 === 0;
            const isOpen = active === step.num;

            return (
              <div role="listitem" key={step.num}
                className={`relative flex items-start gap-4 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Step circle — centered on desktop */}
                <div className="relative z-10 flex-shrink-0 ml-0 md:mx-auto"
                  style={{ width: 48, height: 48,
                    background: step.color,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 0 4px white, 0 0 0 6px ${step.color}40`,
                    fontSize: 20,
                  }}>
                    <span aria-hidden="true">{step.emoji}</span>
                  </div>

                {/* Card */}
                <div className={`flex-1 ml-4 md:ml-0 ${isRight ? 'md:pr-10' : 'md:pl-10'}`}>
                  <button
                    onClick={() => setActive(isOpen ? null : step.num)}
                    aria-expanded={isOpen}
                    aria-controls={`step-content-${step.num}`}
                    className="w-full text-left rounded-2xl border-2 p-5 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      background: isOpen ? step.bg : 'white',
                      borderColor: isOpen ? step.color : '#e2e8f0',
                    }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ background: step.color }}>
                            Step {step.num}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-900" style={{ fontFamily: 'Outfit' }}>
                          {step.title}
                        </h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color: step.color }}>{step.sub}</p>
                      </div>
                      <span className="text-slate-400 text-xl mt-1" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {isOpen && (
                      <div id={`step-content-${step.num}`} className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                        <p className="text-slate-700 text-sm leading-relaxed">{step.detail}</p>
                        <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: step.color + '15' }}>
                          <span className="text-base flex-shrink-0" aria-hidden="true">💡</span>
                          <p className="text-xs leading-relaxed font-medium" style={{ color: step.color === '#138808' ? '#166534' : '#1e3a8a' }}>
                            {step.fact}
                          </p>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div role="region" aria-labelledby="cta-heading" className="mt-16 text-center p-8 rounded-3xl" style={{ background: '#fff7ed' }}>
        <p className="text-2xl mb-2" aria-hidden="true">🎓</p>
        <h3 id="cta-heading" className="font-extrabold text-xl text-slate-900 mb-2">Ready to Test Your Knowledge?</h3>
        <p className="text-slate-500 text-sm mb-4">Now that you know how elections work, take the quiz!</p>
      </div>
    </div>
  );
}

TimelineScreen.propTypes = {
  nav: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};

