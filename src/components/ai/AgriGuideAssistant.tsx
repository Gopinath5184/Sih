import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { generateAiChatResponse } from '../../services/aiRecommendation';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actionUrl?: string;
  timestamp: string;
}

interface AgriGuideAssistantProps {
  onNavigate: (page: string) => void;
}

export const AgriGuideAssistant: React.FC<AgriGuideAssistantProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Namaste! I am AgriGuide AI, your intelligent assistant for Indian agriculture produce management. You can ask me about live mandi prices, optimal cold storage conditions, market arbitrage, or government subsidy schemes.',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const suggestedQuestions = [
    'What is the current price of tomatoes?',
    'Where can I sell my produce for highest profit?',
    'How should I store onions to prevent rotting?',
    'How much stock is expiring in cold storage?',
    'What government schemes apply for cold storage subsidy?'
  ];

  const handleSendMessage = (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulate AI thinking and response
    setTimeout(() => {
      const { response, relatedAction } = generateAiChatResponse(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response,
        actionUrl: relatedAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-agri-900 hover:bg-agri-800 text-white rounded-full shadow-lift hover:scale-105 transition-all duration-200 border-2 border-agri-600/40 group"
          aria-label="Open AgriGuide AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-agri-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-bold font-display tracking-wide pr-1">
            AgriGuide AI
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-[560px] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 text-agri-200 backdrop-blur-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-display">AgriGuide AI</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Assistant
                  </span>
                </div>
                <p className="text-[11px] text-agri-200/80">Kisan Decision Support & Market Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto whitespace-nowrap flex gap-1.5 text-xs">
            {suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sq)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-agri-500 hover:text-agri-900 text-[11px] shrink-0 transition-colors font-medium"
              >
                {sq}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center shrink-0 mt-0.5 border border-agri-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-agri-800 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-2xs'
                }`}>
                  <p>{m.text}</p>
                  
                  {m.actionUrl && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate(m.actionUrl!);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-agri-50 hover:bg-agri-100 text-agri-900 font-semibold text-[11px] border border-agri-200 transition-colors"
                    >
                      <span>Open Recommended Screen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  <span className={`block text-[10px] mt-1.5 ${m.sender === 'user' ? 'text-white/70 text-right' : 'text-slate-400'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about crops, prices, storage, schemes..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-agri-600 focus:ring-2 focus:ring-agri-200 text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2 rounded-xl bg-agri-800 hover:bg-agri-900 disabled:opacity-40 text-white transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-1.5">
              Prototype AI Decision Support &bull; Smart India Hackathon 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
};
