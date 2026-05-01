import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { CANDIDATES, ELECTION } from '../data/electionData';

const Avatar = ({ candidate, size = 52 }) => (
  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
    style={{ width: size, height: size, background: candidate.color, fontSize: size * 0.3 }}>
    {candidate.initials}
  </div>
);

const ConfirmModal = ({ candidate, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-end justify-center"
    style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 shadow-2xl">
      <div className="flex justify-center mb-4">
        <AlertTriangle size={36} className="text-yellow-500" />
      </div>
      <h3 className="text-center font-extrabold text-base mb-1" style={{ color: '#1a237e' }}>
        CONFIRM YOUR CHOICE PLEASE
      </h3>
      <p className="text-center text-xs text-slate-500 mb-6">
        Note: You cannot change your vote after confirmation.
      </p>

      {/* Candidate card */}
      <div className="flex items-center gap-4 bg-blue-50 rounded-2xl p-4 mb-6 border-2"
        style={{ borderColor: candidate.color }}>
        <Avatar candidate={candidate} size={60} />
        <div>
          <p className="text-2xl">{candidate.symbol}</p>
          <p className="font-bold text-slate-900 text-sm">{candidate.name}</p>
          <p className="text-xs text-slate-500">{candidate.partyShort}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: '#1565c0' }}>
            {candidate.votes.toLocaleString('en-IN')} VOTES
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onCancel}
          className="flex-1 py-3.5 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold text-sm">
          No
        </button>
        <button onClick={onConfirm}
          className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
          style={{ background: '#1565c0' }}>
          <CheckCircle size={18} />
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default function CandidatesScreen({ nav, votes, userVote, castVote }) {
  const [pending, setPending] = useState(null); // candidate to confirm
  const [justVoted, setJustVoted] = useState(null);

  const handleSelect = (c) => {
    if (userVote) return;
    setPending(c);
  };

  const handleConfirm = () => {
    castVote(pending.id);
    setJustVoted(pending.id);
    setPending(null);
  };

  return (
    <div className="min-h-screen" style={{ background: '#eef0fb' }}>
      {/* Header */}
      <header className="px-5 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}>
        <button onClick={() => nav('home')} className="text-white p-1">
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-white font-extrabold text-base tracking-widest flex-1">
          CAST YOUR VOTE
        </h2>
      </header>

      <div className="px-5 pt-6">
        {/* Election title */}
        <div className="bg-white rounded-2xl p-4 mb-5 shadow-sm">
          <p className="font-extrabold text-base" style={{ color: '#FF9933' }}>
            🇮🇳 {ELECTION.name}
          </p>
          <p className="text-slate-500 text-xs mt-1">{ELECTION.subtitle}</p>
        </div>

        {userVote && (
          <div className="bg-green-50 border border-green-300 rounded-2xl p-3 mb-4 text-center">
            <p className="text-green-700 font-bold text-sm">
              ✅ आपका वोट दर्ज हो गया! Your vote has been recorded.
            </p>
          </div>
        )}

        {/* Candidate cards */}
        <div className="space-y-3">
          {CANDIDATES.map(c => {
            const isVoted = userVote === c.id;
            const isOther = userVote && userVote !== c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                disabled={!!userVote}
                className="w-full flex items-center gap-4 bg-white rounded-2xl px-4 py-4 shadow-md text-left transition-all"
                style={{
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: isVoted ? c.color : 'transparent',
                  opacity: isOther ? 0.5 : 1,
                }}
              >
                <Avatar candidate={c} size={52} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.symbol}</span>
                    <span className="font-bold text-slate-900 text-sm truncate">{c.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{c.tagline}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                    style={{ background: c.color }}>
                    {c.partyShort}
                  </span>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-extrabold text-sm" style={{ color: '#1a237e' }}>
                    {votes[c.id].toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-slate-400">Votes</p>
                  {isVoted && <CheckCircle size={18} className="text-green-500 mt-1 mx-auto" />}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6 pb-4">
          Simulated voting — for educational purposes only
        </p>
      </div>

      {pending && (
        <ConfirmModal
          candidate={pending}
          onConfirm={handleConfirm}
          onCancel={() => setPending(null)}
        />
      )}
    </div>
  );
}
