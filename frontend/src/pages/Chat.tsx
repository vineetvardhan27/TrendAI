import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant } from '../services/api';
import type { Product } from '../types';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  products?: Product[];
}

const SUGGESTIONS = [
  'Show immunity products',
  'Top ingredients for sleep?',
  'Which claims are growing?',
  'Best energy supplements',
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I\'m your AI Market Intelligence Assistant powered by Groq. Ask me anything about the product database — categories, ingredients, claims, or trends.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Message = { role: 'user', text: t };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const response = await chatWithAssistant(t);
      setMessages(prev => [...prev, { role: 'assistant', text: response.answer, products: response.relevantProducts }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error analyzing the data.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex-shrink-0 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">AI Chat Intelligence</h1>
          <p className="text-secondary text-sm mt-1">Query the market database using natural language.</p>
        </div>
        <div className="flex items-center space-x-2 glass-card px-4 py-2.5">
          <Sparkles size={15} className="text-accent" />
          <span className="text-xs font-semibold text-secondary">llama-3.1-8b-instant</span>
        </div>
      </div>

      {/* Suggestion chips */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-6 flex-shrink-0">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => handleSend(s)}
              className="text-xs px-3 py-2 rounded-xl glass-card text-secondary hover:text-accent hover:border-accent/30 transition-all font-medium">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-5 min-h-0 pr-2">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-white ${
                  msg.role === 'user' ? 'bg-accent' : 'bg-gradient-to-br from-purple-600 to-indigo-600'
                }`}>
                  {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
                </div>

                <div className="flex flex-col space-y-2 flex-1">
                  {/* Bubble */}
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-tr-none'
                      : 'glass-card text-primary rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {/* Product cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {msg.products.slice(0, 4).map(p => (
                        <div key={p._id} className="glass-card p-3 min-w-[160px] flex-shrink-0 hover:border-accent/30 transition-colors cursor-pointer">
                          <p className="text-xs font-semibold text-primary truncate">{p.productName}</p>
                          <p className="text-[10px] text-secondary truncate mt-0.5">{p.brandName}</p>
                          <span className="inline-block mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                            {p.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600">
                <Bot size={15} className="text-white" />
              </div>
              <div className="glass-card px-5 py-3 rounded-2xl rounded-tl-none flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <span className="text-xs text-secondary">Analyzing database...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 mt-4">
        <form onSubmit={e => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-3 glass-card p-2 pl-4">
          <MessageSquare size={16} className="text-secondary flex-shrink-0" />
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about products, categories, ingredients..."
            className="flex-1 bg-transparent text-primary text-sm placeholder-secondary outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 flex-shrink-0"
          >
            <Send size={14} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
