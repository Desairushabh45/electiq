import { useState } from 'react';
import {
  UserCheck, Building2, Cpu, ScrollText, Globe, ChevronDown, ChevronUp, ExternalLink,
} from 'lucide-react';
import { trackEvent } from '../firebase';

const topics = [
  {
    id: 'register',
    icon: UserCheck,
    color: 'saffron',
    title: <><span lang="hi">मतदाता पंजीकरण</span> · How to Register as a Voter</>,
    summary: 'Learn how to add your name to the Electoral Roll and get your Voter ID (EPIC) card — your gateway to Indian democracy.',
    content: [
      {
        heading: 'Eligibility',
        text: 'To register as a voter in India, you must: (1) be an Indian citizen, (2) be at least 18 years old on January 1st of the year of the electoral roll revision, and (3) be ordinarily resident in the constituency where you want to register.',
      },
      {
        heading: 'How to Register Online',
        text: 'Visit voters.eci.gov.in or download the Voter Helpline App. Click "New Registration" and fill Form 6 with your name, date of birth, address, and upload a photo and address proof. Submit online — you\'ll receive an acknowledgement with a reference number.',
      },
      {
        heading: 'Offline Registration',
        text: 'Visit your local Booth Level Officer (BLO), Tehsildar office, or designated registration centre with Form 6, a passport photo, proof of age (Aadhaar, birth certificate), and proof of address.',
      },
      {
        heading: 'EPIC (Voter ID) Card',
        text: 'After successful verification, you receive an EPIC (Electors\' Photo Identity Card). While it\'s the primary document for voting, you can also use Aadhaar, Passport, PAN Card, or 9 other approved documents at the polling booth.',
      },
    ],
    link: { label: 'Register at voters.eci.gov.in', url: 'https://voters.eci.gov.in' },
  },
  {
    id: 'election-types',
    icon: Building2,
    color: 'navy',
    title: 'Types of Elections in India',
    summary: 'India holds elections at multiple levels — from your village Panchayat to the national Parliament. Here\'s how they differ.',
    content: [
      {
        heading: 'Lok Sabha (General Elections)',
        text: 'Lok Sabha elections choose 543 Members of Parliament (MPs) from single-member constituencies using the First Past The Post (FPTP) system. Held every 5 years. The party with a majority (272+ seats) forms the central government and its leader becomes Prime Minister.',
      },
      {
        heading: 'Vidhan Sabha (State Assembly Elections)',
        text: 'Each of India\'s 28 states and 3 union territories has its own legislative assembly (Vidhan Sabha). Elections choose MLAs (Members of Legislative Assembly). The party with majority forms the state government; its leader becomes Chief Minister.',
      },
      {
        heading: 'Rajya Sabha Elections',
        text: 'Rajya Sabha (Council of States) members are not directly elected by citizens. They are elected by elected MLAs of each state. 245 members serve 6-year terms; one-third retire every 2 years. 12 members are nominated by the President.',
      },
      {
        heading: 'Local Body & Panchayat Elections',
        text: 'Gram Panchayat, Municipal Corporation, and Nagar Panchayat elections are conducted by State Election Commissions (not the ECI). These elect local representatives who handle everyday civic needs — roads, sanitation, water supply.',
      },
      {
        heading: <><span lang="hi">उपचुनाव</span> (By-Elections)</>,
        text: 'If an MP or MLA seat falls vacant due to death, resignation, or disqualification, a by-election is held to fill that specific seat. It follows the same process as a regular election.',
      },
    ],
  },
  {
    id: 'evm',
    icon: Cpu,
    color: 'green',
    title: 'India\'s EVMs — Electronic Voting Machines',
    summary: 'India pioneered large-scale electronic voting. Understand how EVMs work, why they\'re secure, and what VVPAT adds.',
    content: [
      {
        heading: 'What is an EVM?',
        text: 'An EVM (Electronic Voting Machine) is a standalone, battery-operated device used in Indian elections since 2004. It has two units: the Control Unit (operated by the Polling Officer) and the Ballot Unit (used by the voter to press a button next to their candidate\'s name and symbol).',
      },
      {
        heading: 'Why EVMs Cannot Be Hacked',
        text: 'EVMs are not connected to the internet, Bluetooth, or any network. They are standalone devices with software burnt into a one-time programmable chip — it cannot be rewritten. Each EVM is randomly assigned to a polling station only on the day of the election.',
      },
      {
        heading: 'VVPAT — Voter Verification',
        text: 'The Voter Verified Paper Audit Trail (VVPAT) machine is linked to the EVM. After pressing the vote button, you see a paper slip showing the candidate\'s name, party symbol, and serial number for 7 seconds. This slip drops into a sealed box. Since 2019, 5 randomly selected VVPATs per constituency are cross-verified with EVM results.',
      },
      {
        heading: 'EVM Storage & Security',
        text: 'EVMs are stored in strong rooms with multi-layer security. Candidate representatives can "camp" outside strong rooms during the period between polling and counting. Sealed strong rooms are opened only on counting day under supervision.',
      },
    ],
  },
  {
    id: 'ballot',
    icon: ScrollText,
    color: 'amber',
    title: 'Understanding the EVM Ballot',
    summary: 'The EVM ballot lists candidates with their party symbol. Learn how to vote, what NOTA is, and special voter provisions.',
    content: [
      {
        heading: 'Candidate List on the Ballot Unit',
        text: 'The Ballot Unit shows each candidate\'s name, their party, and their official election symbol in the order they were registered. Voters press the blue button next to their preferred candidate. A beep confirms the vote is registered.',
      },
      {
        heading: 'Election Symbols',
        text: 'Registered national and state parties have reserved symbols (e.g., BJP-Lotus, Congress-Hand, AAP-Broom). Independent candidates or unrecognized parties choose from a list of free symbols provided by the ECI.',
      },
      {
        heading: 'NOTA — None of the Above',
        text: 'Introduced by the Supreme Court in 2013, NOTA (None of the Above) is the last option on the EVM ballot. If you don\'t want to vote for any candidate, you can press NOTA. However, even if NOTA gets the most votes, the candidate with the highest votes among listed candidates wins.',
      },
      {
        heading: 'Special Provisions',
        text: 'Persons with disabilities can request a Companion to assist them. Senior citizens (85+) can opt for postal voting from home. Voters on election duty (police, officials) can vote via Edutainment Ballots. Women-only and specially-abled-friendly polling booths are set up across constituencies.',
      },
    ],
  },
  {
    id: 'eci-role',
    icon: Globe,
    color: 'violet',
    title: 'Role of the Election Commission of India',
    summary: 'The ECI is India\'s constitutional guardian of elections — independent, powerful, and essential to democracy.',
    content: [
      {
        heading: 'Constitutional Status',
        text: 'The Election Commission of India (ECI) is established under Article 324 of the Constitution. It is an independent constitutional body — not under any ministry. The Chief Election Commissioner can only be removed like a Supreme Court judge.',
      },
      {
        heading: 'What the ECI Controls',
        text: 'The ECI supervises, directs, and controls the preparation of electoral rolls and the conduct of all Lok Sabha, Rajya Sabha, and State Legislative Assembly elections. It does NOT conduct Panchayat or Municipal elections (those are handled by State Election Commissions).',
      },
      {
        heading: 'Model Code of Conduct (MCC)',
        text: 'The MCC comes into effect from the day the election schedule is announced. It prohibits: use of government money/resources for campaigns, new policy announcements by the ruling party, hate speeches, and bribery. Violation can lead to candidate disqualification.',
      },
      {
        heading: 'Powers & Enforcement',
        text: 'The ECI can transfer or suspend government officials, order re-polls, freeze party symbols, de-register political parties, and disqualify candidates. It deploys lakhs of central paramilitary forces (CRPF, BSF, etc.) for election security.',
      },
      {
        heading: 'cVIGIL App',
        text: 'Citizens can report MCC violations in real-time using the ECI\'s cVIGIL app. Reports are geo-tagged and must be resolved within 100 minutes by the flying squad team. This has made election monitoring a citizen-driven activity.',
      },
    ],
    link: { label: 'Visit ECI at eci.gov.in', url: 'https://eci.gov.in' },
  },
];

const colorMap = {
  saffron: { icon: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', heading: 'text-orange-900' },
  navy:    { icon: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200',   heading: 'text-blue-900' },
  green:   { icon: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200',  heading: 'text-green-900' },
  amber:   { icon: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200',  heading: 'text-amber-900' },
  violet:  { icon: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', heading: 'text-violet-900' },
};

const TopicCard = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = topic.icon;
  const c = colorMap[topic.color];

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    if (next) {
      trackEvent('topic_card_expanded', { topic_id: topic.id, topic_title: topic.title });
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md border ${isExpanded ? c.border : 'border-slate-100'} transition-all duration-300 overflow-hidden`}>
      <button
        onClick={toggle}
        className="w-full text-left p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        id={`topic-${topic.id}`}
        aria-expanded={isExpanded}
        aria-controls={`topic-content-${topic.id}`}
      >
        <div className={`${c.bg} p-3 rounded-xl flex-shrink-0 mt-0.5`}>
          <Icon size={24} className={c.icon} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base leading-tight mb-1">{topic.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{topic.summary}</p>
        </div>
        <div className="flex-shrink-0 ml-2 mt-1">
          {isExpanded ? <ChevronUp size={20} className="text-slate-500" aria-hidden="true" /> : <ChevronDown size={20} className="text-slate-500" aria-hidden="true" />}
        </div>
      </button>

      {isExpanded && (
        <div id={`topic-content-${topic.id}`} className={`${c.bg} border-t ${c.border} px-6 py-5 space-y-5`}>
          {topic.content.map((section, i) => (
            <div key={i}>
              <h4 className={`font-bold text-sm mb-2 ${c.heading}`}>{section.heading}</h4>
              <p className="text-slate-700 text-sm leading-relaxed">{section.text}</p>
            </div>
          ))}
          {topic.link && (
            <a
              href={topic.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-semibold ${c.icon} hover:underline mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm`}
            >
              {topic.link.label} <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const TopicCards = () => {
  return (
    <section id="topics" className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl text-slate-900 mb-3 font-bold">
          <span lang="hi">मुख्य विषय</span> · Quick Topic Guides
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Click any topic to expand a detailed guide on key Indian election concepts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
};

export default TopicCards;
