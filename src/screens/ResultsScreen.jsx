import { ArrowLeft, Users } from 'lucide-react';
import { CANDIDATES } from '../data/electionData';

// SVG Pie Chart
const PieChart = ({ data, size = 190 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 8;
  const { slices } = data.reduce(
    (acc, d) => {
      const sweep = (d.value / total) * 360;
      const a1 = (acc.angle * Math.PI) / 180;
      const a2 = ((acc.angle + sweep) * Math.PI) / 180;
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      const large = sweep > 180 ? 1 : 0;
      const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
      acc.slices.push({ ...d, path });
      acc.angle += sweep;
      return acc;
    },
    { slices: [], angle: -90 }
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
      <circle cx={cx} cy={cy} r={r * 0.42} fill="white" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a237e">VOTES</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#666">
        {total.toLocaleString('en-IN')}
      </text>
    </svg>
  );
};

export default function ResultsScreen({ nav, votes }) {
  const total = Object.values(votes).reduce((s, v) => s + v, 0);
  const data = CANDIDATES.map(c => ({ ...c, value: votes[c.id], pct: ((votes[c.id] / total) * 100).toFixed(1) }));
  const winner = data.reduce((a, b) => a.value > b.value ? a : b);

  return (
    <div className="min-h-screen" style={{ background: '#eef0fb' }}>
      {/* Header */}
      <header className="px-5 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}>
        <button onClick={() => nav('home')} className="text-white p-1">
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-white font-extrabold text-base tracking-widest flex-1 text-center">
          STUDENTS UNION GOVERNMENT ELECTION
        </h2>
      </header>

      {/* Candidate avatar row */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <p className="text-center text-xs font-bold text-slate-500 mb-3 tracking-wide">
          🇮🇳 MUMBAI NORTH LOK SABHA — 2024 RESULTS
        </p>
        <div className="flex justify-around">
          {data.map(c => (
            <div key={c.id} className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg border-4"
                style={{ background: c.color, borderColor: c.id === winner.id ? '#FFD700' : 'transparent' }}>
                {c.initials}
              </div>
              <p className="text-xs font-bold" style={{ color: '#1a237e' }}>{c.pct}%</p>
              <p className="text-xs text-slate-500 text-center leading-tight" style={{ maxWidth: 60 }}>
                {c.name.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          {data.map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: c.color }} />
              <span className="text-xs text-slate-600">{c.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-sm font-bold mb-4" style={{ color: '#1a237e' }}>Vote Distribution</p>
          <div className="space-y-3">
            {data.map(c => (
              <div key={c.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">{c.name}</span>
                  <span className="font-bold" style={{ color: c.color }}>
                    {c.value.toLocaleString('en-IN')} ({c.pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center">
          <p className="text-sm font-bold mb-3 self-start" style={{ color: '#1a237e' }}>Vote Share</p>
          <PieChart data={data} size={200} />
        </div>

        {/* Stats panel */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-sm font-bold mb-3" style={{ color: '#1a237e' }}>📊 Election Stats</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Votes', value: total.toLocaleString('en-IN') },
              { label: '🏆 Winner', value: winner.partyShort },
              { label: 'Win Margin', value: (data[0].value - data[1].value).toLocaleString('en-IN') },
              { label: 'NOTA Votes', value: votes[4]?.toLocaleString('en-IN') || data[3].value.toLocaleString('en-IN') },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="font-extrabold text-base" style={{ color: '#1a237e' }}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admin actions (ECI style) */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <p className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#1a237e' }}>
            <Users size={16} /> ECI ACTIONS
          </p>
          <div className="space-y-2">
            <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: '#c62828' }}>
              🛑 Close Poll
            </button>
            <button className="w-full py-2.5 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700">
              📋 Copy Access Code
            </button>
            <button className="w-full py-2.5 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700"
              style={{ color: '#1565c0' }}>
              👥 {total.toLocaleString('en-IN')} TOTAL VOTES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
