
import React, { useState } from 'react';
import { THEME, ICONS, STRINGS } from '../constants';
import { generateSmartGoal } from '../services/geminiService';
import { Goal } from '../types';

interface OnboardingProps {
  language: 'pt-BR' | 'en-US';
  // Corrected: use a specific interface for the initial goal data sent from Onboarding to App.tsx
  onComplete: (goal: { title: string; steps: string[]; estimatedTotalTime: string; deadline: string }) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ language, onComplete }) => {
  const [step, setStep] = useState<'initial' | 'config'>('initial');
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = STRINGS[language];

  const handleSmartGen = async () => {
    setIsLoading(true);
    const result = await generateSmartGoal(input, language);
    if (result) {
      onComplete({
        title: result.title,
        steps: result.steps_how_to,
        estimatedTotalTime: result.estimated_time_total,
        deadline: result.deadline
      });
    }
    setIsLoading(false);
  };

  if (step === 'initial') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0A] p-4 text-center">
        <div className="mb-12 animate-pulse">
          <div className="p-6 rounded-3xl bg-[#00C2A8]/5 border border-[#00C2A8]/20 inline-block mb-4">
            <ICONS.Zap size={64} color={THEME.PRIMARY} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">{t.onboardingTitle}</h1>
        </div>
        
        <button 
          onClick={() => setStep('config')}
          className="group relative px-12 py-6 bg-transparent border-2 border-[#00C2A8] text-[#00C2A8] rounded-2xl font-black text-xl overflow-hidden transition-all hover:bg-[#00C2A8] hover:text-black animate-bounce"
        >
          <span className="relative z-10">{t.onboardingBtn}</span>
          <div className="absolute inset-0 bg-[#00C2A8]/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0A0A0A] p-6 animate-in fade-in duration-1000">
      <div className="max-w-2xl w-full bg-[#171717] border border-[#262626] rounded-[2rem] p-10 space-y-8 shadow-2xl">
        <div className="flex gap-4">
          <button 
            onClick={() => setMode('ai')}
            className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all ${mode === 'ai' ? 'bg-[#00C2A8] text-black' : 'bg-[#262626] text-[#A3A3A3]'}`}
          >
            {t.aiMode}
          </button>
          <button 
            onClick={() => setMode('manual')}
            className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all ${mode === 'manual' ? 'bg-[#00C2A8] text-black' : 'bg-[#262626] text-[#A3A3A3]'}`}
          >
            {t.manualMode}
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'ai' ? 'Descreva seu objetivo mestre...' : 'Configure seu protocolo manual'}
          </h2>
          {mode === 'ai' ? (
            <textarea 
              className="w-full h-40 bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 text-white text-lg placeholder-[#404040] focus:outline-none focus:border-[#00C2A8]"
              placeholder="Ex: Quero aprender Rust em 3 meses para construir um motor gráfico..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <div className="space-y-4">
               <input className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white" placeholder="Título da Meta" />
               <input className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white" placeholder="Prazo (DD/MM/AAAA)" />
            </div>
          )}
        </div>

        <button 
          onClick={handleSmartGen}
          disabled={isLoading || (mode === 'ai' && !input)}
          className="w-full py-5 bg-[#00C2A8] text-black font-black rounded-2xl hover:bg-[#00C2A8]/90 transition-all disabled:opacity-50"
        >
          {isLoading ? 'ESTRUTURANDO PELA IA...' : t.saveGoal}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;