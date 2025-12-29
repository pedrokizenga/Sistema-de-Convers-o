
import React, { useState } from 'react';
import { THEME, ICONS, STRINGS } from '../constants';
import { UserProfile, Goal } from '../types';

interface SettingsProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  goals: Goal[];
  onOpenOnboarding: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ profile, onUpdate, goals, onOpenOnboarding, onLogout }) => {
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);
  const [showToast, setShowToast] = useState(false);
  const t = STRINGS[profile.language];

  const handleSave = () => {
    onUpdate(localProfile);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <header className="flex justify-between items-center border-b border-[#262626] pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Painel Lulenge</h1>
          <p className="text-[#A3A3A3]">Gerencie sua identidade e o cérebro da sua IA.</p>
        </div>
        <button 
          onClick={onLogout}
          className="p-3 rounded-xl bg-[#FF4B4B]/10 text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white transition-all flex items-center gap-2 font-bold text-xs"
        >
          <ICONS.LogOut size={16} /> SAIR
        </button>
      </header>

      {/* Perfil */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ICONS.User size={24} color={THEME.PRIMARY} />
          <h2 className="text-xl font-bold text-white">Meu Perfil Lulenge</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#404040] uppercase tracking-widest">Cargo Atual</label>
            <input 
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white focus:border-[#00C2A8] outline-none"
              value={localProfile.role}
              onChange={(e) => setLocalProfile({...localProfile, role: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#404040] uppercase tracking-widest">Interesses</label>
            <input 
              placeholder="Interesses separados por vírgula"
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white focus:border-[#00C2A8] outline-none"
              value={localProfile.interests.join(', ')}
              onChange={(e) => setLocalProfile({...localProfile, interests: e.target.value.split(',').map(i => i.trim())})}
            />
          </div>
        </div>
      </section>

      {/* IA Prompt */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ICONS.Brain size={24} color={THEME.TERTIARY} />
          <h2 className="text-xl font-bold text-white">Configuração do Agente</h2>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-[#404040] uppercase tracking-widest block">Prompt de Instrução do Agente (Cérebro da IA)</label>
          <textarea 
            className="w-full h-40 bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 text-white text-sm focus:border-[#00C2A8] outline-none resize-none"
            placeholder="Ex: Você é um mentor focado em produtividade para médicos. Use terminologia clínica e seja muito rigoroso com horários."
            value={localProfile.customAiPrompt}
            onChange={(e) => setLocalProfile({...localProfile, customAiPrompt: e.target.value})}
          />
          <p className="text-[10px] text-[#404040]">Este prompt será injetado em todas as conversas com a IA para aumentar sua eficiência.</p>
        </div>
      </section>

      <div className="pt-8 flex justify-end gap-4">
        <button 
          onClick={handleSave}
          className="bg-[#00C2A8] text-black px-12 py-5 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-[#00C2A8]/20"
        >
          SALVAR ALTERAÇÕES
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#00C2A8] text-black px-8 py-4 rounded-full font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          Protocolo Lulenge Sincronizado.
        </div>
      )}
    </div>
  );
};

export default Settings;
