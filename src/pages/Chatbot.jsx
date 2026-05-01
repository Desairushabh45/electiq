import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hello! I'm ElectionIQ's AI assistant. Ask me anything about democratic election processes, voting, or candidate requirements." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!genAI) {
      setError('Gemini API key is missing. Please check your .env file.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setError('');

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are a helpful, beginner-friendly educational assistant teaching people about democratic election processes. 
      Answer the following user query accurately and concisely. Keep formatting clean. 
      User Query: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to get a response from the AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 150px)', maxWidth: '900px', margin: '0 auto', gap: '1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>AI <span className="text-gradient">Assistant</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Powered by Google Gemini</p>
      </header>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              gap: '1rem',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}>
              {msg.role === 'model' && (
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <Bot size={24} />
                </div>
              )}
              
              <div style={{
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                background: msg.role === 'user' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                border: msg.role === 'model' ? '1px solid var(--border-color)' : 'none',
                borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.role === 'model' ? '4px' : '16px',
                lineHeight: '1.6'
              }}>
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
              </div>

              {msg.role === 'user' && (
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)', flexShrink: 0 }}>
                  <User size={24} />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                <Bot size={24} />
              </div>
              <div style={{ padding: '1rem 1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderTopLeftRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Thinking...</span>
              </div>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
          {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about elections..."
              className="input-field"
              style={{ flex: 1 }}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading || !input.trim()}>
              <Send size={20} />
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
