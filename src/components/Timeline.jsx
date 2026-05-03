import { CheckCircle2, Circle, ArrowRight, ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '../firebase';

const stages = [
  {
    id: 1,
    title: 'Voter Registration',
    description: 'Citizens enroll in the Electoral Roll and obtain their Voter ID (EPIC card).',
    icon: '📋',
    color: 'saffron',
    detail: {
      overview: 'Voter registration in India is the process of enrolling yourself in the Electoral Roll maintained by the Election Commission of India (ECI). Every eligible Indian citizen must be registered to cast their vote.',
      keyFacts: [
        'The minimum voting age is 18 years. The qualifying date is 1st January of the year of revision.',
        'You can register using Form 6 online at voters.eci.gov.in or at your local BLO (Booth Level Officer).',
        'You receive an EPIC (Electors Photo Identity Card) — commonly called Voter ID — after registration.',
        'If you move, you must submit Form 8A to transfer your registration to your new constituency.',
        'India has about 96.8 crore (968 million) registered voters as of 2024 — the world\'s largest voter base.',
        'Non-Resident Indians (NRIs) can also register to vote using Form 6A.',
      ],
      didYouKnow: 'India\'s first general election in 1951–52 had 173 million voters. Today that number has grown to nearly 970 million — more than the entire population of the United States and European Union combined.',
      example: 'You can check or update your voter registration at voters.eci.gov.in or the Voter Helpline app. If your name is missing from the roll, you can file a complaint during the Summary Revision period.',
    },
  },
  {
    id: 2,
    title: 'ECI Announcement & MCC',
    description: 'The Election Commission announces the election schedule and the Model Code of Conduct begins.',
    icon: '📣',
    color: 'orange',
    detail: {
      overview: 'The Election Commission of India (ECI) is a constitutional body that independently conducts all elections. Once it announces the election schedule, the Model Code of Conduct (MCC) kicks in immediately.',
      keyFacts: [
        'The ECI is led by the Chief Election Commissioner (CEC) and two Election Commissioners.',
        'The MCC restricts the ruling government from announcing new schemes or using government machinery for campaigning.',
        'The ECI sets the polling dates, the last date for filing nominations, scrutiny date, and withdrawal deadline.',
        'India uses a multi-phase election system — the 2024 Lok Sabha election was held in 7 phases over 6 weeks.',
        'The ECI can transfer or suspend government officials who violate the MCC.',
        'The Voter Verified Paper Audit Trail (VVPAT) was mandated by ECI from 2019 onwards.',
      ],
      didYouKnow: 'The ECI was set up on January 25, 1950 — a day before India became a Republic. T.N. Seshan, CEC from 1990–96, is credited with revolutionizing election enforcement and making the MCC truly effective.',
      example: 'In the 2024 General Election, the ECI announced the schedule on March 16, 2024. The MCC came into force immediately, prohibiting the government from announcing any new policy that could influence voters.',
    },
  },
  {
    id: 3,
    title: 'Candidate Nominations',
    description: 'Candidates file their nomination papers, which are scrutinized by the Returning Officer.',
    icon: '📝',
    color: 'amber',
    detail: {
      overview: 'Any eligible Indian citizen can contest elections. The nomination process involves filing papers, paying a deposit, and having the nomination scrutinized — all within a tight schedule set by the ECI.',
      keyFacts: [
        'Candidates file Form 2B (nomination paper) with the Returning Officer of their constituency.',
        'A security deposit of ₹25,000 is required for Lok Sabha candidates (₹12,500 for SC/ST candidates).',
        'Candidates must also file a sworn affidavit disclosing assets, liabilities, criminal record, and educational qualification.',
        'Nominations are scrutinized on a specified date; defective nominations can be rejected.',
        'Candidates can withdraw their nomination within 2 days after scrutiny.',
        'A candidate who gets less than 1/6th of the votes polled forfeits their security deposit.',
      ],
      didYouKnow: 'India has a "None of the Above" (NOTA) option on EVMs since 2013. In the 2024 general election, about 65 lakh votes were cast for NOTA across all constituencies.',
      example: 'In the 2024 Lok Sabha elections, over 8,360 candidates contested across 543 constituencies. After scrutiny and withdrawal, the final candidate list is published by the Returning Officer.',
    },
  },
  {
    id: 4,
    title: 'Campaign Period',
    description: 'Candidates and parties campaign for votes; strict expenditure limits apply.',
    icon: '🎙️',
    color: 'green',
    detail: {
      overview: 'The campaign period in India is a frenzy of rallies, roadshows, door-to-door canvassing, and media advertising — all governed by strict ECI rules on expenditure and conduct.',
      keyFacts: [
        'Lok Sabha candidates can spend a maximum of ₹95 lakh per constituency (2024 limit).',
        'All campaign expenditure must be recorded in a register and submitted to the Returning Officer.',
        'Campaigning must stop 48 hours before polling (called the "silence period").',
        'Paid news — when newspapers publish political ads disguised as news — is illegal and monitored by the ECI.',
        'The ECI appoints expenditure observers and flying squads to catch cash distribution.',
        'Exit polls can only be broadcast after all polling phases are complete.',
      ],
      didYouKnow: 'In the 2019 Lok Sabha election, an estimated ₹60,000 crore was spent on elections — making it the most expensive election in the world at that time, surpassing even the U.S. presidential election.',
      example: 'During the 2024 election campaign, major parties held rallies with tens of thousands of attendees. The ECI seized over ₹4,600 crore in cash, liquor, drugs, and freebies meant to influence voters.',
    },
  },
  {
    id: 5,
    title: 'Voting Day (EVM)',
    description: 'Registered voters cast their votes using Electronic Voting Machines at polling booths.',
    icon: '🗳️',
    color: 'blue',
    detail: {
      overview: 'On polling day, voters visit their assigned polling booth and cast their vote using an Electronic Voting Machine (EVM). India pioneered paperless electronic voting at scale.',
      keyFacts: [
        'India\'s EVMs are standalone, non-networked machines — they cannot be hacked remotely.',
        'Each EVM has two units: the Control Unit (with the polling officer) and the Ballot Unit (with the voter).',
        'Since 2019, every EVM is paired with a VVPAT machine that prints a paper slip showing who you voted for.',
        'Voters can use 12 types of identity documents at the booth (Voter ID, Aadhaar, Passport, PAN card, etc.).',
        'Special provisions include home voting for senior citizens (85+) and persons with disabilities.',
        'Mock polls are conducted before voting begins to ensure the EVM is functioning correctly.',
      ],
      didYouKnow: 'India introduced EVMs in a by-election in Parur, Kerala in 1982. Full nationwide adoption happened in the 2004 General Election. Today India manufactures ~1.5 million EVMs for each election cycle.',
      example: 'In the 2024 Lok Sabha election, over 96 crore voters were eligible to vote across 10.5 lakh polling stations. The election was conducted in 7 phases from April 19 to June 1, 2024.',
    },
  },
  {
    id: 6,
    title: 'Counting & Results',
    description: 'Votes are counted under ECI supervision; results are declared constituency by constituency.',
    icon: '🔢',
    color: 'violet',
    detail: {
      overview: 'After all polling phases are complete, votes are counted on a designated date under tight security and strict supervision. Results are declared seat by seat.',
      keyFacts: [
        'Counting is done at designated counting centers under the supervision of Returning Officers.',
        'Representatives of candidates (counting agents) are allowed inside to observe.',
        'EVM results are printed and cross-verified with the VVPAT slips (5 booths per constituency are mandatorily checked).',
        'Results are entered into the ECI\'s website in real-time as counting progresses.',
        'The winning candidate receives a Certificate of Election from the Returning Officer.',
        'Disputes can be challenged through an Election Petition filed in the High Court within 45 days.',
      ],
      didYouKnow: 'On the day of counting of the 2024 Lok Sabha election (June 4, 2024), about 1.5 lakh counting personnel were deployed. Results for all 543 seats were declared within a single day.',
      example: 'In the 2024 General Election results (June 4), the NDA alliance won 293 seats and the INDIA alliance won 234 seats. Narendra Modi was sworn in for a third term as Prime Minister on June 9, 2024.',
    },
  },
  {
    id: 7,
    title: 'Oath & Government Formation',
    description: 'The winning party/alliance forms the government and the Prime Minister is sworn in.',
    icon: '🎉',
    color: 'rose',
    detail: {
      overview: 'After results are declared, the party or alliance with a majority in the Lok Sabha forms the government. The President invites the leader to become Prime Minister, who is then sworn in.',
      keyFacts: [
        'A party or alliance needs at least 272 seats (simple majority in 543-seat Lok Sabha) to form the government.',
        'The President of India plays a ceremonial role in inviting the leader of the largest party/alliance.',
        'The Prime Minister is sworn in at Rashtrapati Bhavan by the President.',
        'The Cabinet of Ministers is also sworn in — each must be or become a Member of Parliament within 6 months.',
        'The new government presents its policy agenda in the President\'s Address to the joint sitting of Parliament.',
        'If no party has a majority, a "hung parliament" results — parties must form a coalition government.',
      ],
      didYouKnow: 'India has had coalition governments for most of its history since 1989. The era of single-party majority governments (1952–1989) gave way to an era of coalition politics that shaped modern India.',
      example: 'On June 9, 2024, Narendra Modi was sworn in for his third consecutive term as Prime Minister at Rashtrapati Bhavan — a ceremony attended by leaders from neighboring countries including Sri Lanka, Bangladesh, Nepal, and Bhutan.',
    },
  },
];

const colorMap = {
  saffron: { bg: 'bg-orange-50',  border: 'border-orange-300', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500', bullet: 'text-orange-500' },
  orange:  { bg: 'bg-amber-50',   border: 'border-amber-300',  text: 'text-amber-900',  badge: 'bg-amber-100 text-amber-800',  dot: 'bg-amber-500',  bullet: 'text-amber-500' },
  amber:   { bg: 'bg-yellow-50',  border: 'border-yellow-300', text: 'text-yellow-900', badge: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-600', bullet: 'text-yellow-600' },
  green:   { bg: 'bg-green-50',   border: 'border-green-300',  text: 'text-green-900',  badge: 'bg-green-100 text-green-800',  dot: 'bg-green-600',  bullet: 'text-green-600' },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-300',   text: 'text-blue-900',   badge: 'bg-blue-100 text-blue-800',   dot: 'bg-blue-600',   bullet: 'text-blue-600' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-300', text: 'text-violet-900', badge: 'bg-violet-100 text-violet-800', dot: 'bg-violet-600', bullet: 'text-violet-600' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-300',   text: 'text-rose-900',   badge: 'bg-rose-100 text-rose-800',   dot: 'bg-rose-600',   bullet: 'text-rose-600' },
};

const Timeline = ({ rightWidget }) => {
  const [activeStage, setActiveStage] = useState(1);

  const handleStageClick = (stageId) => {
    setActiveStage(stageId);
    trackEvent('timeline_stage_clicked', { stage_id: stageId, stage_title: stages[stageId - 1].title });
  };

  const activeData = stages.find((s) => s.id === activeStage);
  const c = colorMap[activeData.color];

  return (
    <section className="w-full" id="timeline">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl text-slate-900 mb-3 font-bold">
          <span lang="hi" className="font-hindi">भारतीय चुनाव प्रक्रिया</span> · Indian Election Timeline
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Click any step to understand how India's general elections work — from voter registration to swearing-in.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 items-start">

        {/* Left Column — Stage Menu */}
        <div className="lg:col-span-3 sticky top-20 bg-white shadow-md p-4 rounded-2xl border border-slate-100">
          <div role="list" className="flex flex-col space-y-1">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;
              const isPast = stage.id < activeStage;
              return (
                <div role="listitem" key={stage.id}>
                  <button
                    onClick={() => handleStageClick(stage.id)}
                    aria-label={`Step ${stage.id}: ${stage.title}`}
                    aria-expanded={isActive}
                    className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive ? 'bg-orange-50 border border-orange-200 shadow-sm' : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                  <div className="flex-shrink-0">
                    {isActive ? (
                      <CheckCircle2 size={20} className="text-saffron-500" aria-hidden="true" />
                    ) : isPast ? (
                      <CheckCircle2 size={20} className="text-green-500" aria-hidden="true" />
                    ) : (
                      <Circle size={20} className="text-slate-300" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-xs truncate ${isActive ? 'text-orange-900' : 'text-slate-700'}`}>
                      <span aria-hidden="true">{stage.icon}</span> {stage.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{stage.description}</p>
                  </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column — Detail Content */}
        <div className={`lg:col-span-6 bg-white shadow-xl rounded-2xl border ${c.border} min-h-[540px] flex flex-col overflow-hidden`}>

          {/* Stage Header */}
          <div className={`${c.bg} px-8 py-6 border-b ${c.border}`}>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl" aria-hidden="true">{activeData.icon}</span>
              <div>
                <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.badge}`}>
                  Step {activeData.id} of {stages.length}
                </span>
                <h2 className={`text-2xl md:text-3xl font-bold mt-1 ${c.text}`}>{activeData.title}</h2>
              </div>
            </div>
            <p className="text-slate-700 text-base leading-relaxed">{activeData.detail.overview}</p>
          </div>

          {/* Key Facts */}
          <div className="px-8 py-6 flex-1">
            <h4 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
              <ChevronRight size={18} className={c.bullet} aria-hidden="true" /> Key Facts
            </h4>
            <ul className="space-y-3 mb-6">
              {activeData.detail.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                  {fact}
                </li>
              ))}
            </ul>

            {/* Did You Know */}
            <div className={`${c.bg} border ${c.border} rounded-xl p-5 flex gap-3`}>
              <Info size={20} className={`${c.bullet} flex-shrink-0 mt-0.5`} aria-hidden="true" />
              <div>
                <p className={`font-bold text-sm mb-1 ${c.text}`}>💡 <span lang="hi" className="font-hindi">क्या आप जानते हैं?</span> (Did You Know?)</p>
                <p className="text-slate-700 text-sm leading-relaxed">{activeData.detail.didYouKnow}</p>
              </div>
            </div>

            {/* Real World Example */}
            <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="font-bold text-sm text-slate-700 mb-1">🇮🇳 India Example</p>
              <p className="text-slate-600 text-sm leading-relaxed">{activeData.detail.example}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center px-8 py-5 border-t border-slate-100">
            <button
              className={`px-5 py-2.5 font-medium rounded-lg transition-colors text-sm ${
                activeStage > 1 ? 'text-orange-700 hover:bg-orange-50 border border-orange-200' : 'text-slate-300 cursor-not-allowed'
              }`}
              onClick={() => handleStageClick(Math.max(1, activeStage - 1))}
              disabled={activeStage === 1}
            >
              ← Previous
            </button>
            <span className="text-xs text-slate-400 font-medium">{activeStage} / {stages.length}</span>
            <button
              className={`px-5 py-2.5 font-medium text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 ${
                activeStage < stages.length
                  ? 'bg-india-navy text-white hover:bg-blue-900 hover:shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              onClick={() => handleStageClick(Math.min(stages.length, activeStage + 1))}
              disabled={activeStage === stages.length}
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Column — Widget */}
        <div className="lg:col-span-3 space-y-6">
          {rightWidget}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
