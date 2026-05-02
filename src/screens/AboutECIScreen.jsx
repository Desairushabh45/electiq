const FACTS = [
  { label: 'Established', value: 'Jan 25, 1950', icon: '📅' },
  { label: 'Constitutional Article', value: 'Article 324', icon: '📜' },
  { label: '2024 Voters', value: '96.8 Crore', icon: '👥' },
  { label: 'Polling Stations', value: '10.5 Lakh+', icon: '🏫' },
  { label: 'Lok Sabha Seats', value: '543', icon: '🏛️' },
  { label: 'State Assemblies', value: '28 + 3 UTs', icon: '🗺️' },
];

const ROLES = [
  {
    title: 'Chief Election Commissioner (CEC)',
    desc: 'The CEC is the head of ECI. Can only be removed like a Supreme Court judge — by a Presidential order on grounds proved by Parliament. This ensures complete independence from the government.',
    icon: '👨‍⚖️',
  },
  {
    title: 'Election Commissioners',
    desc: 'Two Election Commissioners assist the CEC. Together they form the three-member Commission. Decisions are by majority vote. This collegial structure prevents any single person from controlling elections.',
    icon: '⚖️',
  },
  {
    title: 'State Election Commissions',
    desc: 'Separate State Election Commissions (set up under Article 243K) conduct Panchayat and Municipal elections. The ECI only conducts Lok Sabha, Rajya Sabha, and State Legislative Assembly elections.',
    icon: '🏙️',
  },
];

const HOW_FAIR = [
  { icon: '📋', title: 'Model Code of Conduct', desc: 'Restricts ruling parties from announcing new schemes or using government machinery during elections. ECI enforces this vigorously.' },
  { icon: '🚁', title: 'Flying Squads', desc: 'Teams deployed to catch distribution of cash, liquor, drugs, and freebies meant to influence voters. In 2024, over ₹4,600 crore in such material was seized.' },
  { icon: '📱', title: 'cVIGIL App', desc: 'Citizens can report MCC violations in real-time via geotagged photos/videos. Flying squads must respond within 100 minutes.' },
  { icon: '🔄', title: 'Transfer of Officials', desc: 'ECI can transfer or suspend government officials who are seen as biased or interfering in elections.' },
  { icon: '🔒', title: 'EVM Security', desc: 'EVMs are stored in sealed strong rooms with multi-layer security. Bipartisan teams supervise all stages of counting.' },
  { icon: '📊', title: 'Observer System', desc: 'ECI appoints independent observers (IAS officers from other states) to monitor every constituency during polling and counting.' },
];

export default function AboutECIScreen() {
  return (
    <div id="main-content" role="main" className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div role="region" aria-labelledby="eci-heading" className="text-center mb-14">
        <div className="text-6xl mb-4" aria-hidden="true">🗳️</div>
        <h1 id="eci-heading" className="section-heading text-4xl md:text-5xl mb-3">
          Election Commission of India
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          India's independent constitutional guardian of free, fair, and transparent elections since 1950.
        </p>
      </div>

      {/* Article 324 Banner */}
      <div role="region" aria-label="Constitutional Basis" className="rounded-3xl p-8 mb-12 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}>
        <p className="text-sm font-semibold text-blue-200 mb-2 uppercase tracking-widest">Constitutional Basis</p>
        <p className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: 'Outfit' }}>Article 324</p>
        <p className="text-blue-100 max-w-2xl mx-auto text-base leading-relaxed">
          "The superintendence, direction and control of the preparation of the electoral rolls for, and the conduct of, all elections to Parliament and to the Legislature of every State... shall be vested in the Election Commission."
        </p>
        <p className="text-blue-300 text-sm mt-3">— Constitution of India, Article 324(1)</p>
      </div>

      {/* Quick Facts Grid */}
      <div role="region" aria-labelledby="quick-facts-heading" className="mb-14">
        <h2 id="quick-facts-heading" className="text-2xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'Outfit' }}>Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FACTS.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 card-shadow border border-slate-100 text-center">
              <p className="text-3xl mb-2" aria-hidden="true">{f.icon}</p>
              <p className="text-xl font-extrabold" style={{ color: '#1a237e' }}>{f.value}</p>
              <p className="text-xs text-slate-500 mt-1">{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Structure */}
      <div role="region" aria-labelledby="eci-structure-heading" className="mb-14">
        <h2 id="eci-structure-heading" className="text-2xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'Outfit' }}>ECI Structure</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {ROLES.map((r, i) => (
            <div key={i} className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <p className="text-4xl mb-3" aria-hidden="true">{r.icon}</p>
              <h3 className="font-extrabold text-slate-900 mb-2 text-sm" style={{ fontFamily: 'Outfit' }}>{r.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How ECI ensures fair elections */}
      <div role="region" aria-labelledby="fair-elections-heading" className="mb-14">
        <h2 id="fair-elections-heading" className="text-2xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Outfit' }}>
          How ECI Ensures Fair Elections
        </h2>
        <p className="text-slate-500 text-sm mb-6">6 key mechanisms that make Indian elections free and fair.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {HOW_FAIR.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 card-shadow border border-slate-100">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical note */}
      <div role="region" aria-labelledby="legacy-heading" className="rounded-3xl p-8 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p className="text-4xl mb-3" aria-hidden="true">🏛️</p>
        <h3 id="legacy-heading" className="text-xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Outfit' }}>A Legacy of Democracy</h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
          India's first general election in 1951–52 was conducted with 173 million voters and 4,500 seats across 3 levels of government. T.N. Seshan (CEC 1990–96) transformed ECI into a formidable institution by vigorously enforcing the Model Code of Conduct. Today, the ECI is recognized worldwide as a model election management body.
        </p>
        <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-xl font-bold text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          style={{ background: '#138808' }}>
          Visit eci.gov.in →
        </a>
      </div>
    </div>
  );
}
