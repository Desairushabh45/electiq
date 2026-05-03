import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageSquare, Send, Sparkles, ChevronDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { trackEvent } from '../firebase';
import { analyzeElectionText } from '../utils/nlpService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MAX_MESSAGE_LENGTH = 200;
const sanitizeInput = (text) => text
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/javascript:/gi, '')
  .replace(/on\w+=/gi, '')
  .trim()
  .slice(0, MAX_MESSAGE_LENGTH);

const systemPrompt = "You are ElectIQ, an Indian election education assistant. Help users understand Indian elections, ECI, voting procedures, EVMs, VVPAT, Form 6 voter registration, Lok Sabha, Rajya Sabha, Model Code of Conduct, and democratic processes. Give clear simple educational answers. Add Hindi terms where helpful.";

const SUGGESTIONS = [
  "मैं voter registration कैसे करूं? (How do I register?)",
  "EVM क्या है और यह कैसे काम करता है?",
  "NOTA का मतलब क्या है?",
  "Lok Sabha और Rajya Sabha में क्या अंतर है?",
];

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

/**
 * Translates English text to Hindi via Google Cloud Translation API
 * @param {string} text - Text to translate
 * @returns {Promise<string>} Hindi translation
 */
const translateToHindi = async (text) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('Translation API key not configured');
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target: 'hi', source: 'en', format: 'text' })
    }
  );
  const data = await response.json();
  return data.data.translations[0].translatedText;
};

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-2">
    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

/**
 * Floating Chatbot component for AI election assistance
 * @returns {JSX.Element} Chatbot FAB and dialog window
 */
const FloatingChatbot = React.memo(function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "नमस्ते! 🇮🇳 I'm the **ElectIQ India AI Assistant**\n\nAsk me anything about Indian elections — voter registration (Form 6), EVMs, VVPAT, ECI, Lok Sabha, MCC, or any other election topic. मैं हिंदी में भी उत्तर दे सकता हूँ!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [translations, setTranslations] = useState({});
  const [translating, setTranslating] = useState({});
  const [nlpEntities, setNlpEntities] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Listen for "Ask AI" button click from Navbar
  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      trackEvent('chatbot_opened_from_navbar');
    };
    window.addEventListener('open-chatbot', handler);
    return () => window.removeEventListener('open-chatbot', handler);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const formatText = (text) => {
    // Bold **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Newlines to <br>
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  };

  const getFallbackResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes('register') || q.includes('form 6'))
      return 'To register as a voter in India: 1) Visit voters.eci.gov.in 2) Click on Register as New Voter 3) Fill Form 6 online 4) Submit with ID proof 5) You will receive your Voter ID card within 30 days.';
    if (q.includes('evm'))
      return 'EVM (Electronic Voting Machine) is used in Indian elections since 1982. It has two units — Control Unit with the polling officer and Ballot Unit where the voter presses the button. VVPAT prints a paper slip to verify your vote.';
    if (q.includes('nota'))
      return 'NOTA stands for None Of The Above. It was introduced in 2013 by Supreme Court order. If you press NOTA, your vote is counted but does not go to any candidate.';
    if (q.includes('lok sabha'))
      return 'Lok Sabha is the lower house of Indian Parliament. It has 543 elected seats. Elections are held every 5 years. Minimum age to contest is 25 years.';
    if (q.includes('eci') || q.includes('election commission'))
      return 'Election Commission of India (ECI) was established on January 25, 1950 under Article 324 of the Constitution. It is an autonomous body that conducts free and fair elections in India.';
    if (q.includes('vvpat'))
      return 'VVPAT (Voter Verified Paper Audit Trail) was introduced in 2013. After pressing the EVM button, a paper slip shows your voted candidate for 7 seconds before dropping into a sealed box.';
    if (q.includes('rajya sabha'))
      return 'Rajya Sabha is the upper house of Indian Parliament with 245 seats. Members are elected by state legislators, not directly by citizens. It reviews and passes legislation from the Lok Sabha.';
    if (q.includes('mcc') || q.includes('model code'))
      return 'The Model Code of Conduct (MCC) is a set of guidelines issued by ECI that comes into force when elections are announced. It prevents the ruling party from misusing government resources for campaigning.';
    return 'I can help you understand Indian elections! Ask me about voter registration, EVMs, VVPAT, ECI, Lok Sabha, Rajya Sabha, or the Model Code of Conduct.';
  };

  const sendMessage = async (userText) => {
    const trimmed = sanitizeInput(userText);
    if (!trimmed || isLoading) return;

    if (messages.length > 20) {
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ Session limit reached. Please refresh to continue.' }]);
      return;
    }

    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsLoading(true);

    trackEvent('chat_message_sent', { message_length: trimmed.length });

    try {
      if (!genAI) throw new Error('API key not configured');

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        systemInstruction: systemPrompt
      });

      // Build conversation history for multi-turn context
      const history = messages
        .filter((m) => m.role !== 'ai' || messages.indexOf(m) > 0)
        .map((m) => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({
        history,
        generationConfig: { maxOutputTokens: 1000 },
      });

      const result = await chat.sendMessage(trimmed);
      const responseText = result.response.text();

      setMessages((prev) => [...prev, { role: 'ai', text: responseText }]);
      trackEvent('chat_response_received');

      // Google Natural Language API — extract election entities from response
      analyzeElectionText(responseText).then((entities) => {
        const unique = [
          ...new Set(
            entities
              .filter((e) => e.salience > 0.01)
              .map((e) => e.name)
              .slice(0, 6)
          ),
        ];
        setNlpEntities(unique);
      });
    } catch (err) {
      console.error('Gemini error:', err);
      if (err.message?.includes('API key')) {
        // Config error — must be surfaced to developer
        setMessages((prev) => [...prev, { role: 'ai', text: '⚠️ API key is not configured. Please check your .env file.' }]);
      } else if (
        err.message?.includes('429') ||
        err.message?.includes('quota') ||
        err.message?.includes('RESOURCE_EXHAUSTED') ||
        err.message?.includes('limit')
      ) {
        // Quota/rate-limit — use keyword fallback silently
        const fallback = getFallbackResponse(trimmed);
        setMessages((prev) => [...prev, { role: 'ai', text: fallback }]);
        trackEvent('chat_fallback_used', { reason: 'quota' });
      } else {
        // Unknown error — also use fallback so UX stays helpful
        const fallback = getFallbackResponse(trimmed);
        setMessages((prev) => [...prev, { role: 'ai', text: fallback }]);
        trackEvent('chat_fallback_used', { reason: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent('chatbot_opened');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Chat Window */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="AI Chat Assistant"
          className="mb-4 w-[340px] sm:w-[420px] h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ animation: 'slideUp 0.25s ease-out' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-white leading-tight">ElectIQ India 🇮🇳</h3>
                <p className="text-xs text-blue-200 flex items-center gap-1">
                  <Sparkles size={10} aria-hidden="true" /> भारतीय चुनाव AI · Powered by Gemini
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close chat"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div aria-live="polite" className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[90%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start flex-col'}`}
              >
                <div className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={14} className="text-blue-700" aria-hidden="true" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-900 text-white rounded-tr-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                  />
                </div>
                {msg.role === 'ai' && i > 0 && (
                  <div className="ml-9">
                    {!translations[i] ? (
                      <button
                        onClick={async () => {
                          setTranslating(t => ({ ...t, [i]: true }));
                          try {
                            const hindi = await translateToHindi(msg.text.replace(/\*\*/g, ''));
                            setTranslations(t => ({ ...t, [i]: hindi }));
                          } catch {
                            setTranslations(t => ({ ...t, [i]: 'अनुवाद उपलब्ध नहीं है।' }));
                          } finally {
                            setTranslating(t => ({ ...t, [i]: false }));
                          }
                        }}
                        disabled={translating[i]}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 disabled:opacity-50"
                        aria-label="Translate to Hindi"
                      >
                        {translating[i] ? '⏳ Translating...' : '🔄 Translate to Hindi'}
                      </button>
                    ) : (
                      <div className="mt-1 p-2 bg-orange-50 border border-orange-100 rounded-lg text-xs text-slate-700 font-hindi" lang="hi">
                        <p className="font-bold text-orange-600 mb-1 text-[10px] uppercase tracking-wide">हिंदी अनुवाद</p>
                        <p>{translations[i]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 self-start max-w-[90%]">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={14} className="text-blue-700" aria-hidden="true" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm px-4">
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Suggestions */}
            {showSuggestions && !isLoading && (
              <div className="mt-2 space-y-2">
                <p className="text-xs text-slate-500 font-medium px-1 flex items-center gap-1">
                  <ChevronDown size={12} aria-hidden="true" /> Try asking:
                </p>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="w-full text-left text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* NLP Entity Tags — Detected Topics */}
            {nlpEntities.length > 0 && !isLoading && (
              <div className="mt-2 px-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-medium">Detected topics:</p>
                <div className="flex flex-wrap gap-1.5">
                  {nlpEntities.map((entity, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(`Tell me more about ${entity} in Indian elections`)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Ask about ${entity}`}
                    >
                      #{entity}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={200}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about elections..."
                aria-label="Type your message"
                disabled={isLoading}
                className="flex-1 bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-slate-800 disabled:opacity-60"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim() || input.length > 200}
                className="bg-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                aria-label="Send message"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-slate-500 text-center flex-1">
                ElectIQ 🇮🇳 · Non-partisan · <span lang="hi" className="font-hindi">निष्पक्ष जानकारी</span>
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {input.length}/200
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAB Toggle */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className={`${
          isOpen ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-900 hover:bg-blue-800'
        } text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
});

export default FloatingChatbot;
