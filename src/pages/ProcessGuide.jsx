import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const stages = [
  {
    id: 1,
    title: 'Voter Registration',
    description: 'Citizens register to vote to ensure they are eligible to participate in the upcoming election.',
    details: 'Requirements vary by region, but generally include proof of citizenship, age, and residency.'
  },
  {
    id: 2,
    title: 'Candidate Declaration',
    description: 'Individuals announce their intention to run for office and file necessary paperwork.',
    details: 'Candidates must meet specific qualifications and often gather signatures to appear on the ballot.'
  },
  {
    id: 3,
    title: 'Campaigning',
    description: 'Candidates share their platforms, debate opponents, and rally supporters.',
    details: 'Involves fundraising, advertising, town halls, and media appearances to win over voters.'
  },
  {
    id: 4,
    title: 'Voting Day',
    description: 'Registered voters cast their ballots at polling stations or via mail.',
    details: 'The culmination of the process where citizens make their voices heard.'
  },
  {
    id: 5,
    title: 'Counting & Verification',
    description: 'Ballots are collected, verified, and counted by election officials.',
    details: 'Strict protocols are followed to ensure accuracy and transparency in the tally.'
  },
  {
    id: 6,
    title: 'Results Announcement',
    description: 'Official results are certified and the winners are declared.',
    details: 'If results are close, recounts may occur before final certification.'
  },
  {
    id: 7,
    title: 'Inauguration',
    description: 'The winning candidates officially take office and begin their term.',
    details: 'A formal ceremony marking the peaceful transfer or continuation of power.'
  }
];

const ProcessGuide = () => {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Election <span className="text-gradient">Process</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Explore the fundamental stages of a democratic election. Click on any stage in the timeline to learn more.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* Timeline */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Timeline</h3>
          {stages.map((stage) => {
            const isActive = activeStage.id === stage.id;
            const isPast = stage.id < activeStage.id;
            return (
              <div 
                key={stage.id} 
                onClick={() => setActiveStage(stage)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                {isActive || isPast ? (
                  <CheckCircle2 size={24} color={isActive ? 'var(--accent-primary)' : 'var(--success)'} />
                ) : (
                  <Circle size={24} color="var(--text-muted)" />
                )}
                <span style={{ 
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  {stage.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Details Flowchart / Info */}
        <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: '40px', height: '40px', 
              borderRadius: '50%', 
              background: 'var(--accent-gradient)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '1.2rem'
            }}>
              {activeStage.id}
            </div>
            <h2 style={{ fontSize: '2rem' }}>{activeStage.title}</h2>
          </div>
          
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            {activeStage.description}
          </p>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Key Details</h4>
            <p style={{ color: 'var(--text-secondary)' }}>{activeStage.details}</p>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <button 
              className="btn btn-outline"
              disabled={activeStage.id === 1}
              onClick={() => setActiveStage(stages[activeStage.id - 2])}
              style={{ opacity: activeStage.id === 1 ? 0.5 : 1, cursor: activeStage.id === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous Stage
            </button>
            <button 
              className="btn btn-primary"
              disabled={activeStage.id === stages.length}
              onClick={() => setActiveStage(stages[activeStage.id])}
              style={{ opacity: activeStage.id === stages.length ? 0.5 : 1, cursor: activeStage.id === stages.length ? 'not-allowed' : 'pointer' }}
            >
              Next Stage
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProcessGuide;
