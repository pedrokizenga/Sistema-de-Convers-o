
import React, { useState } from 'react';
import { THEME, ICONS } from '../constants';
import { analyzeActivity } from '../services/geminiService';
import { UserProfile, Activity } from '../types';

interface ActivityLogProps {
  profile: UserProfile;
  onActivityLogged: (activity: Activity) => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ profile, onActivityLogged }) => {
  const [step, setStep] = useState(1);
  const [logContent, setLogContent] = useState('');
  const [impactLevel, setImpactLevel] = useState('Neutro');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRegister = async () => {
    setIsAnalyzing(true);
    await analyzeActivity(logContent, profile);
    
    const newLog: Activity = {
      id: Date.now().toString(),
      title: logContent,
      type: 'Superficial',
      timestamp: new Date().toISOString(),
      duration: 1,
      energyLevel: 3,
      mood: 'Ok',
      impactNote: impactLevel
    };

    onActivityLogged(newLog);
    setLogContent('');
    setStep(1);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Registro Operacional</h1>
        <p className="text-[#A3A3A3]">Documente seu progresso e sincronize com o sistema central.</p>
      </header>

      <div className="bg-[#171717] p-10 rounded-[3rem] border border-[#262626] shadow-2xl relative overflow-hidden">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <label className="text-xl font-black text-white block mb-6">O que você concluiu hoje?</label>
            <textarea 
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-3xl p-8 text-white text-xl placeholder-[#404040] focus:outline-none focus:border-[#00C2A8] transition-all min-h-[200px] resize-none shadow-inner"
              placeholder="Descreva suas conquistas..."
              value={logContent}
              onChange={(e) => setLogContent(e.target.value)}
            />
            <button 
              disabled={!logContent}
              onClick={() => setStep(2)}
              className="mt-8 bg-[#00C2A8] text-black px-12 py-5 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-[#00C2A8]/10"
            >
              PRÓXIMO PASSO
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-8">
            <h3 className="text-2xl font-black text-white">Esta atividade te aproxima da sua meta principal?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Aproxima', 'Distancia', 'Neutro'].map(val => (
                <button
                  key={val}
                  onClick={() => setImpactLevel(val)}
                  className={`py-8 rounded-3xl border-2 font-black text-sm transition-all ${
                    impactLevel === val 
                    ? 'border-[#00C2A8] bg-[#00C2A8]/10 text-white' 
                    : 'border-[#262626] text-[#A3A3A3] hover:border-[#404040]'
                  }`}
                >
                  {val.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-4 border-t border-[#262626]">
              <button onClick={() => setStep(1)} className="px-8 py-5 text-[#404040] font-black uppercase text-xs tracking-widest">Voltar</button>
              <button 
                onClick={handleRegister}
                disabled={isAnalyzing}
                className="flex-1 bg-[#00C2A8] text-black px-12 py-5 rounded-2xl font-black text-sm hover:bg-[#00C2A8]/90 transition-all shadow-xl shadow-[#00C2A8]/10"
              >
                {isAnalyzing ? 'SINCRONIZANDO COM CALENDÁRIO...' : 'CONFIRMAR E REGISTRAR'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
