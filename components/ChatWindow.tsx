
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { ASSESSMENT_RULES } from '../constants';

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white shrink-0 shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
  </div>
);

const AIQAAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 shrink-0 border border-slate-300 shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M16.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-3.912 3.013a.75.75 0 00-.788.016 1.5 1.5 0 01-1.6 0 .75.75 0 00-.788-.016 4.414 4.414 0 00-.612.458V9.75a.75.75 0 00-1.5 0v3c0 .285.08.552.217.778l-1.042 1.042a.75.75 0 001.06 1.06l1.042-1.042c.226.137.493.217.778.217h6a.75.75 0 000-1.5h-4.331a.75.75 0 01-.397-.113 3 3 0 00-2.544 0 .75.75 0 01-.397.113H16.5a.75.75 0 000-1.5h-2.112a4.414 4.414 0 00-.612-.458z" />
    </svg>
  </div>
);

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isInterviewComplete: boolean;
  onExit: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  onSendMessage, 
  isLoading,
  isInterviewComplete,
  onExit
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isInterviewComplete) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full bg-white text-slate-900 shadow-2xl overflow-hidden">
      {/* Protocol Warning Banner */}
      <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center justify-center gap-3">
        <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] animate-pulse flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          Protocol Active: AI usage or long/structured answers will result in rejection.
        </span>
      </div>

      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <AIQAAvatar />
          <div>
            <h2 className="font-bold text-slate-800 tracking-tight text-sm">Automated Technical Panel</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Anti-LLM Audit Ongoing</p>
            </div>
          </div>
        </div>
        <button onClick={onExit} className="text-[9px] font-black text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:border-rose-100">
          Terminate Session
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {m.role === 'user' ? <UserAvatar /> : <AIQAAvatar />}
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm border ${
              m.role === 'user' 
              ? 'bg-slate-900 text-white border-slate-800 rounded-tr-none' 
              : 'bg-white text-slate-800 border-slate-200 rounded-tl-none font-medium'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <AIQAAvatar />
            <div className="bg-white border border-slate-200 rounded-2xl p-3 flex gap-2 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        {!isInterviewComplete ? (
          <div className="flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type short, direct response..."
                autoComplete="off"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 bg-slate-900 hover:bg-black disabled:bg-slate-100 disabled:text-slate-300 text-white rounded-xl transition-all shadow-md active:scale-95 font-bold text-sm"
              >
                <SendIcon />
              </button>
            </form>
            <div className="flex justify-between items-center px-1">
               <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Assessment in Progress</span>
               <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Suspected AI = 100% Rejection</span>
            </div>
          </div>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">Protocol Finished</span>
            <p className="text-slate-500 text-xs mt-1">Generating audit-ready technical report...</p>
          </div>
        )}
      </div>
    </div>
  );
};
