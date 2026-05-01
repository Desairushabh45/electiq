import { Link } from 'react-router-dom';
import { Map, BrainCircuit, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', textAlign: 'center', marginTop: '2rem' }}>
      
      <header style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          Understand Democracy with <span className="text-gradient">ElectionIQ</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Your interactive guide to the democratic election process. Learn how elections work, test your knowledge, and get answers from our AI assistant.
        </p>
        <Link to="/process" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Start Learning <ArrowRight size={20} />
        </Link>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
            <Map size={40} />
          </div>
          <h3>Step-by-Step Guide</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Follow the visual timeline from voter registration to inauguration.</p>
          <Link to="/process" className="btn btn-outline" style={{ marginTop: 'auto' }}>Explore Process</Link>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
            <BrainCircuit size={40} />
          </div>
          <h3>Interactive Quiz</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Test your understanding of the election process with our interactive quiz.</p>
          <Link to="/quiz" className="btn btn-outline" style={{ marginTop: 'auto' }}>Take Quiz</Link>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--success)' }}>
            <MessageSquare size={40} />
          </div>
          <h3>AI Assistant</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Have questions? Ask our smart AI chatbot anything about elections.</p>
          <Link to="/chat" className="btn btn-outline" style={{ marginTop: 'auto' }}>Ask AI</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
