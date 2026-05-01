import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/electionData';

const ECI_FACTS = [
  { label: 'Established', value: 'Jan 25, 1950' },
  { label: 'Article', value: 'Article 324' },
  { label: 'Current CEC', value: 'Rajiv Kumar' },
  { label: 'Headquarters', value: 'Nirvachan Sadan, New Delhi' },
  { label: 'Total Voters (2024)', value: '96.8 Crore' },
  { label: 'Polling Stations', value: '10.5 Lakh+' },
];

export default function InfoScreen({ nav }) {
  const [tab, setTab] = useState('eci'); // 'eci' | 'faq'
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: '#eef0fb' }}>
      {/* Header */}
      <header className="px-5 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}>
        <button onClick={() => nav('home')} className="text-white p-1">
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-white font-extrabold text-base tracking-widest">
          {tab === 'eci' ? 'ABOUT ECI' : 'FAQ'}
        </h2>
      </header>

      {/* Tab switch */}
      <div className="flex bg-white shadow-sm">
        {['eci', 'faq'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-bold tracking-wide transition-all"
            style={{
              color: tab === t ? '#1565c0' : '#94a3b8',
              borderBottom: tab === t ? '3px solid #1565c0' : '3px solid transparent',
            }}>
            {t === 'eci' ? 'About ECI' : 'FAQ · सवाल-जवाब'}
          </button>
        ))}
      </div>

      <div className="px-4 pt-5 pb-6">
        {tab === 'eci' && (
          <>
            {/* Logo block */}
            <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center mb-5">
              <span className="text-5xl mb-3">🗳️</span>
              <h2 className="text-2xl font-extrabold" style={{ color: '#1a237e' }}>
                ELECT<span style={{ color: '#FF9933' }}>IQ</span>
              </h2>
              <p className="text-slate-500 text-xs mt-1">Election Commission of India — Info Hub</p>
            </div>

            {/* Facts grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {ECI_FACTS.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">{f.label}</p>
                  <p className="font-bold text-sm" style={{ color: '#1a237e' }}>{f.value}</p>
                </div>
              ))}
            </div>

            {/* About text */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              {[
                { q: '1. ECI क्या है?', a: 'Election Commission of India (ECI) एक स्वतंत्र संवैधानिक निकाय है जो Article 324 के तहत स्थापित है। यह Lok Sabha, Rajya Sabha और State Assemblies के चुनाव कराती है।' },
                { q: '2. ECI का गठन?', a: 'ECI की स्थापना 25 जनवरी 1950 को हुई। यह किसी भी Ministry के अधीन नहीं है। मुख्य निर्वाचन आयुक्त (CEC) को Supreme Court judge की तरह हटाया जा सकता है।' },
                { q: '3. ECI के प्रमुख कार्य?', a: 'Electoral roll तैयार करना, Model Code of Conduct लागू करना, EVMs distribute करना, election schedule जारी करना, और candidates को disqualify करना।' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="font-bold text-sm mb-1" style={{ color: '#1565c0' }}>{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'faq' && (
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left">
                  <span className="font-bold text-sm pr-4" style={{ color: '#1a237e' }}>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0" />
                    : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
