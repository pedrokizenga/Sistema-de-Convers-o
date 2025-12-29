
import React, { useState } from 'react';
import { THEME, ICONS, STRINGS } from '../constants';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';
import { UserProfile } from '../types';

interface PerformanceProps {
  profile: UserProfile;
}

const pieData = [
  { name: 'Meta', value: 60, color: THEME.PRIMARY },
  { name: 'Manutenção', value: 25, color: THEME.NEUTRAL_MED },
  { name: 'Dreno/Desperdício', value: 15, color: THEME.SECONDARY },
];

const Performance: React.FC<PerformanceProps> = ({ profile }) => {
  const t = STRINGS[profile.language];
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [deepInsights, setDeepInsights] = useState<string | null>(null);

  const handleDeepAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setDeepInsights(profile.language === 'pt-BR' 
        ? `Diagnóstico Lulenge: Como ${profile.role}, você está com uma consistência de 85% nas metas de Foco Profundo. Para melhorar, sugerimos antecipar reuniões de Manutenção para o bloco Vespertino, aproveitando seu cronotipo ${profile.chronotype}.`
        : `Lulenge Diagnostic: As a ${profile.role}, your consistency is at 85% in Deep Work goals. To improve, move Maintenance meetings to the Evening block, aligning with your ${profile.chronotype} chronotype.`);
      setIsAnalyzing(false);
    }, 2000);
  };

  const translatedPieData = pieData.map(d => ({
    ...d,
    name: d.color === THEME.PRIMARY ? t.perfGoal : d.color === THEME.NEUTRAL_MED ? t.perfMaint : t.perfWaste
  }));

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">Análise Lulenge</h1>
          <p className="text-[#A3A3A3]">Métricas de produtividade e cargo: {profile.role}</p>
        </div>
        <button 
          onClick={handleDeepAnalysis}
          disabled={isAnalyzing}
          className="bg-[#FFD100] text-black px-6 py-3 rounded-xl font-black text-xs hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-[#FFD100]/20"
        >
          {isAnalyzing ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <ICONS.Brain size={16} />}
          {isAnalyzing ? 'PROCESSANDO...' : 'ANÁLISE PROFUNDA'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#171717] p-10 rounded-[2.5rem] border border-[#262626] flex flex-col items-center relative overflow-hidden">
          <h2 className="text-xl font-black text-white mb-10 self-start uppercase tracking-tight">Círculo de Alocação</h2>
          <div className="w-full h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={translatedPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={150}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {translatedPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-5xl font-black text-white">85%</p>
              <p className="text-[10px] text-[#A3A3A3] uppercase tracking-widest font-bold">Eficiência Total</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
            {translatedPieData.map((item) => (
              <div key={item.name} className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#262626] text-center">
                <p className="text-[8px] text-[#A3A3A3] uppercase font-black mb-1">{item.name}</p>
                <p className="text-xl font-black" style={{ color: item.color }}>{item.value}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#171717] p-8 rounded-[2rem] border border-[#262626] relative overflow-hidden">
             <div className="relative z-10">
              <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Métricas por Cargo</h2>
              <div className="p-6 rounded-[1.5rem] bg-[#0A0A0A] border border-[#262626] mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-black tracking-widest">Cargo Identificado</span>
                  <span className="text-xs text-[#00C2A8] font-black">{profile.role}</span>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs">
                     <span className="text-[#404040]">Metas Cumpridas</span>
                     <span className="text-white font-bold">12/15</span>
                   </div>
                   <div className="h-1 w-full bg-[#171717] rounded-full">
                     <div className="h-full bg-[#00C2A8] w-[80%] rounded-full shadow-[0_0_10px_rgba(0,194,168,0.5)]" />
                   </div>
                </div>
              </div>
             </div>
             <div className="absolute right-0 top-0 opacity-5">
                <ICONS.User size={150} />
             </div>
          </div>

          {deepInsights && (
            <div className="bg-[#FFD100]/10 border border-[#FFD100]/30 p-8 rounded-[2rem] animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <ICONS.Agent color={THEME.TERTIARY} size={24} />
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Resultado da Análise Profunda</h3>
              </div>
              <p className="text-white text-sm leading-relaxed italic">"{deepInsights}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Performance;
