
import React, { useState, useRef, useEffect } from 'react';
import { THEME, ICONS } from '../constants';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage, UserProfile } from '../types';

interface AIChatProps {
  profile: UserProfile;
}

const AIChat: React.FC<AIChatProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: profile.language === 'en-US' 
        ? 'Protocol activated. I am your Ascendant AI. How shall we optimize your performance today?' 
        : 'Protocolo ativado. Sou sua IA Ascendant. Como vamos otimizar sua performance hoje?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const responseText = await getAIResponse(input, messages, profile);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-[#0A0A0A] border border-[#262626] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-5 border-b border-[#262626] bg-[#171717] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ICONS.Agent size={20} color={THEME.PRIMARY} />
              <h3 className="text-white font-bold text-sm">Ascendant AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#A3A3A3] hover:text-white">
              <ICONS.X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#00C2A8] text-black font-medium rounded-tr-none' 
                    : 'bg-[#171717] text-white border border-[#262626] rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-[#00C2A8] animate-pulse">Pensando...</div>}
          </div>

          <div className="p-4 border-t border-[#262626] bg-[#171717]">
            <div className="relative">
              <input 
                type="text" 
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl py-3 px-4 pr-12 text-xs text-white placeholder-[#404040] focus:outline-none focus:border-[#00C2A8]"
                placeholder="Perguntar algo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00C2A8]">
                <ICONS.Chat size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#00C2A8] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all group"
      >
        <ICONS.Chat size={28} color="#000" className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default AIChat;
