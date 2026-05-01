// Indian 2024 Lok Sabha Election Data
export const ELECTION = {
  name: 'MUMBAI NORTH LOK SABHA',
  subtitle: '2024 General Election — Choose your representative to Parliament',
  code: 'MH-06',
};

export const CANDIDATES = [
  {
    id: 1, name: 'Piyush Goyal', party: 'Bharatiya Janata Party', partyShort: 'BJP',
    symbol: '🪷', tagline: 'Viksit Bharat — Developed India',
    color: '#FF6B35', bgColor: '#fff4f0', votes: 793893, pct: 52.3, initials: 'PG',
  },
  {
    id: 2, name: 'Bhushan Patil', party: 'Indian National Congress', partyShort: 'INC',
    symbol: '✋', tagline: 'Rahul Gandhi Ki Guarantee',
    color: '#1976d2', bgColor: '#e3f2fd', votes: 478302, pct: 31.5, initials: 'BP',
  },
  {
    id: 3, name: 'Amol Kirtikar', party: 'Shiv Sena (UBT)', partyShort: 'SS-UBT',
    symbol: '🏹', tagline: 'Aamchi Mumbai, Aamchi Shiv Sena',
    color: '#c62828', bgColor: '#ffebee', votes: 234108, pct: 15.4, initials: 'AK',
  },
  {
    id: 4, name: 'NOTA', party: 'None of the Above', partyShort: 'NOTA',
    symbol: '✗', tagline: 'None of the Above',
    color: '#757575', bgColor: '#f5f5f5', votes: 12847, pct: 0.8, initials: 'N',
  },
];

export const FAQS = [
  {
    q: '1. EVM क्या है और यह कैसे काम करता है?',
    a: 'EVM (Electronic Voting Machine) एक standalone, battery-operated device है। इसमें दो units होती हैं — Control Unit (polling officer के पास) और Ballot Unit (voter press करता है). यह internet से connected नहीं है, इसलिए hack नहीं हो सकती।',
  },
  {
    q: '2. मतदाता पंजीकरण कैसे करें?',
    a: 'voters.eci.gov.in पर जाएं, Form 6 भरें, Aadhaar/Date of Birth proof और address proof upload करें। EPIC (Voter ID) card कुछ हफ्तों में मिलेगा। आप Voter Helpline App भी use कर सकते हैं।',
  },
  {
    q: '3. NOTA का उपयोग कैसे करें?',
    a: 'NOTA (None of the Above) EVM ballot का आखिरी option है। अगर आप किसी भी candidate को vote नहीं देना चाहते तो NOTA press करें। 2013 से Supreme Court के order पर यह option है।',
  },
  {
    q: '4. Model Code of Conduct (MCC) क्या है?',
    a: 'MCC वह guidelines हैं जो ECI election schedule announce होने पर लागू होती हैं। सत्तारूढ़ पार्टी नई योजनाएं announce नहीं कर सकती, सरकारी resources campaign में use नहीं हो सकते।',
  },
  {
    q: '5. Vote कब और कहाँ डालें?',
    a: 'ECI द्वारा निर्धारित polling day को अपने assigned polling booth पर जाएं। Voter ID, Aadhaar, Passport, PAN या अन्य 8 approved documents में से कोई एक लेकर जाएं।',
  },
];
