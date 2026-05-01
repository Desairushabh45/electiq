const Section = ({ title, subtitle, color, children }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-1 h-10 rounded-full" style={{ background: color }} />
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit' }}>{title}</h2>
        <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="mt-6">{children}</div>
  </div>
);

const Step = ({ num, title, desc, color, icon }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-lg"
      style={{ background: color, minWidth: 40 }}>
      {icon || num}
    </div>
    <div className="pt-1">
      <p className="font-bold text-slate-900 mb-1">{title}</p>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function HowItWorksScreen() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-14">
        <h1 className="section-heading text-4xl md:text-5xl mb-3">How It Works</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Three essential guides to understanding the mechanics of Indian elections.
        </p>
      </div>

      {/* ── SECTION 1: VOTER REGISTRATION ── */}
      <Section title="How to Register to Vote" subtitle="Form 6 · EPIC Card · voters.eci.gov.in" color="#FF9933">
        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
          <div className="space-y-6">
            <Step num={1} color="#FF9933" title="Check Eligibility"
              desc="You must be an Indian citizen, at least 18 years old on January 1st of the revision year, and ordinarily resident in the constituency." />
            <div className="w-px h-4 bg-orange-200 ml-5" />
            <Step num={2} color="#FF9933" title="Fill Form 6 Online"
              desc="Visit voters.eci.gov.in or the Voter Helpline App. Click 'New Registration', fill Form 6 with your name, date of birth, and address, then upload a photo and address proof." />
            <div className="w-px h-4 bg-orange-200 ml-5" />
            <Step num={3} color="#FF9933" title="Submit Documents"
              desc="Accepted proofs: Aadhaar, Birth Certificate (for age), and Aadhaar/Passport/Bank passbook (for address). Offline: visit your Booth Level Officer (BLO)." />
            <div className="w-px h-4 bg-orange-200 ml-5" />
            <Step num={4} color="#FF9933" title="Receive Your EPIC Card"
              desc="After verification, you'll receive an EPIC (Electors' Photo Identity Card) — your Voter ID. You can also use 11 other approved documents at the booth on polling day." />
          </div>
          <div className="mt-6 p-4 bg-white rounded-xl border border-orange-200 text-sm text-slate-600">
            📌 <strong>Moved recently?</strong> Submit Form 8A to transfer your registration to your new constituency. Already registered? Download your Voter ID at <strong>voters.eci.gov.in</strong>.
          </div>
        </div>
      </Section>

      {/* ── SECTION 2: HOW EVMs WORK ── */}
      <Section title="How EVM Machines Work" subtitle="Electronic Voting Machine · Non-networked · Secure" color="#1a237e">
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              { icon: '🎛️', title: 'Control Unit', desc: 'Held by the Polling Officer. Enables the ballot when a voter is ready. Records total votes cast.' },
              { icon: '🗳️', title: 'Ballot Unit', desc: 'Faces the voter. Lists all candidates with their name, party, and symbol. Voter presses the blue button next to their choice.' },
              { icon: '🧾', title: 'VVPAT Machine', desc: 'Shows a paper slip of the candidate you voted for, visible for 7 seconds before dropping into a sealed box. Provides a physical audit trail.' },
              { icon: '🔒', title: 'Why It\'s Secure', desc: 'EVMs are standalone, battery-operated, and NOT connected to the internet or any network. Software is burnt into a one-time programmable chip — it cannot be rewritten.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-blue-100">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-bold text-slate-900 mb-1 text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="font-bold text-slate-800 text-sm">On Voting Day — Step by Step:</p>
            <Step num={1} color="#1a237e" title="Voter arrives at the polling booth"
              desc="Shows identity proof (Voter ID, Aadhaar, Passport, PAN, or 8 other approved documents) to the Polling Officer." />
            <Step num={2} color="#1a237e" title="Polling Officer enables the EVM"
              desc="The officer presses a button on the Control Unit to enable one vote. The voter proceeds to the Ballot Unit behind a privacy screen." />
            <Step num={3} color="#1a237e" title="Voter presses the blue button"
              desc="The voter presses the blue button next to their chosen candidate. A beep confirms the vote. The VVPAT slip is visible for 7 seconds." />
            <Step num={4} color="#1a237e" title="Vote is recorded"
              desc="The EVM stores the vote electronically. The voter's finger is marked with indelible ink to prevent double voting." />
          </div>
        </div>
      </Section>

      {/* ── SECTION 3: HOW VOTES ARE COUNTED ── */}
      <Section title="How Votes Are Counted" subtitle="VVPAT Cross-check · Bipartisan Counting · Same-day Results" color="#138808">
        <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
          <div className="space-y-5 mb-6">
            <Step num={1} color="#138808" title="Strong Rooms Opened"
              desc="EVMs are stored in sealed strong rooms with multi-layer security between polling day and counting day. Candidate representatives can monitor outside. On counting day, strong rooms are opened under supervision." />
            <Step num={2} color="#138808" title="Counting Centers Set Up"
              desc="Counting happens at designated centers with Returning Officers, ECI observers, and counting agents from each candidate. It's a highly monitored bipartisan process." />
            <Step num={3} color="#138808" title="EVM Results Printed"
              desc="Each EVM prints a result sheet showing vote totals for every candidate. These are tallied constituency by constituency." />
            <Step num={4} color="#138808" title="VVPAT Verification"
              desc="5 randomly selected VVPAT boxes per constituency are cross-verified against EVM results. This provides a physical audit trail. Any discrepancy triggers an investigation." />
            <Step num={5} color="#138808" title="Results Declared & Certified"
              desc="The Returning Officer announces the winner — the candidate with the highest votes (First Past The Post). The winner receives a Certificate of Election. Results are published on ECI's website in real time." />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="font-bold text-green-800 text-sm mb-1">⚡ Speed</p>
              <p className="text-slate-500 text-xs">Results for all 543 Lok Sabha seats in the 2024 election were declared on a single day (June 4, 2024).</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="font-bold text-green-800 text-sm mb-1">📋 Recounts</p>
              <p className="text-slate-500 text-xs">If results are within a very thin margin, candidates can request a recount. Election disputes go to the High Court via an Election Petition within 45 days.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
