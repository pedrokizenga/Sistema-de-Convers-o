
import React from 'react';
import { THEME, ICONS, STRINGS } from '../constants';
import { Goal, UserProfile } from '../types';

interface GoalsProps {
  masterGoal: Goal | null;
  onDeleteMasterGoal: () => void;
  profile: UserProfile;
}

const Goals: React.FC<GoalsProps> = ({ masterGoal, onDeleteMasterGoal, profile }) => {
  const t = STRINGS[profile.language];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">{profile.language === 'en-US' ? 'Guidelines & Goals' : 'Diretrizes e Metas'}</h1>
          <p className="text-[#A3A3A3]">{profile.language === 'en-US' ? 'Your long-term progress vectors.' : 'Seus vetores de progresso a longo prazo.'}</p>
        </div>
        <button className="bg-[#00C2A8] text-black px-6 py-2 rounded-lg font-bold text-xs hover:bg-[#00C2A8]/90 transition-all flex items-center gap-2">
          <ICONS.Plus size={14} /> {t.newGoal}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {masterGoal ? (
          <div className="bg-[#171717] border border-[#262626] rounded-2xl p-6 hover:border-[#404040] transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{masterGoal.title}</h3>
                  <span className="bg-[#00C2A8]/10 text-[#00C2A8] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Master Goal
                  </span>
                </div>
                <p className="text-xs text-[#A3A3A3]">{profile.language === 'en-US' ? 'Deadline' : 'Prazo'}: {masterGoal.deadline}</p>
              </div>
              <button 
                onClick={onDeleteMasterGoal}
                className="p-2 text-[#404040] hover:text-[#FF4B4B] transition-colors"
                title={t.deleteGoal}
              >
                <ICONS.Trash size={18} />
              </button>
            </div>

            <div className="relative h-2 bg-[#262626] rounded-full overflow-hidden mb-6">
              <div 
                className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out bg-[#00C2A8]"
                style={{ width: `${masterGoal.progress}%` }}
              />
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest">Protocol Steps</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {masterGoal.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#0A0A0A] p-3 rounded-xl border border-[#262626]">
                    <div className="w-4 h-4 rounded bg-[#262626] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-white">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#171717] border border-[#262626] border-dashed rounded-2xl p-12 text-center">
            <p className="text-[#404040] font-bold uppercase tracking-widest">{t.noGoals}</p>
          </div>
        )}
      </div>

      {/* KPI SECTION */}
      <div className="bg-[#262626]/20 p-8 rounded-3xl border border-[#262626]">
        <h2 className="text-xl font-bold text-white mb-6">Métricas de Protocolo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest">Efficiency Score</p>
            <p className="text-3xl font-bold text-[#00C2A8]">92.4</p>
            <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
              <div className="h-full bg-[#00C2A8] w-[92%]" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest">Commitment Rate</p>
            <p className="text-3xl font-bold text-[#FFD100]">88%</p>
            <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD100] w-[88%]" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest">Sprint Velocity</p>
            <p className="text-3xl font-bold text-white">4.2x</p>
            <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
              <div className="h-full bg-white w-[75%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;