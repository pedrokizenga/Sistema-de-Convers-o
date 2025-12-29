
import React from 'react';
import { THEME, ICONS } from '../constants';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface DashboardProps {
  onAnalyzeTrigger: () => void;
  userName: string;
}

const data = [
  { name: 'Seg', momentum: 40 },
  { name: 'Ter', momentum: 30 },
  { name: 'Qua', momentum: 65 },
  { name: 'Qui', momentum: 45 },
  { name: 'Sex', momentum: 80 },
  { name: 'Sab', momentum: 55 },
  { name: 'Dom', momentum: 70 },
];

const Dashboard: React.FC<DashboardProps> = ({ onAnalyzeTrigger, userName }) => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-white tracking-tight">Comando Central</h1>
        <p className="text-[#A3A3A3]">Status operacional: Ativo. Bem-vindo, {userName}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#262626]/40 p-6 rounded-[2rem] border border-[#262626] hover:border-[#00C2A8]/30 transition-all group">
          <div className="p-3 bg-[#00C2A8]/10 rounded-2xl w-fit mb-4 group-hover:bg-[#00C2A8] transition-all">
            <ICONS.Growth size={20} className="text-[#00C2A8] group-hover:text-black" />
          </div>
          <h3 className="text-[#A3A3A3] text-[10px] uppercase tracking-widest font-black">Streak Lulenge</h3>
          <p className="text-3xl font-black text-white mt-1">14 dias</p>
        </div>

        <div className="bg-[#262626]/40 p-6 rounded-[2rem] border border-[#262626]">
          <div className="p-3 bg-[#FFD100]/10 rounded-2xl w-fit mb-4">
            <ICONS.Clock size={20} color={THEME.TERTIARY} />
          </div>
          <h3 className="text-[#A3A3A3] text-[10px] uppercase tracking-widest font-black">Foco Profundo</h3>
          <p className="text-3xl font-black text-white mt-1">3h 15m</p>
        </div>

        <div className="bg-[#262626]/40 p-6 rounded-[2rem] border border-[#262626]">
          <div className="p-3 bg-[#FF4B4B]/10 rounded-2xl w-fit mb-4">
            <ICONS.Alert size={20} color={THEME.SECONDARY} />
          </div>
          <h3 className="text-[#A3A3A3] text-[10px] uppercase tracking-widest font-black">Desvios</h3>
          <p className="text-3xl font-black text-white mt-1">2 alertas</p>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#262626]/20 p-6 rounded-[2rem] border border-[#00C2A8]/20 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="p-3 bg-white/5 rounded-2xl w-fit mb-4">
              <ICONS.Agent size={20} color="#FFFFFF" />
            </div>
            <h3 className="text-[#00C2A8] text-[10px] uppercase tracking-widest font-black">IA SUGERE</h3>
            <p className="text-sm font-bold text-white mt-1">Realizar Análise de Performance</p>
            <button 
              onClick={onAnalyzeTrigger}
              className="mt-4 w-full py-3 bg-[#00C2A8] hover:bg-[#00C2A8]/90 text-black text-xs font-black rounded-xl transition-all shadow-lg shadow-[#00C2A8]/10 active:scale-95"
            >
              INICIAR AGORA
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <ICONS.Brain size={120} />
          </div>
        </div>
      </div>

      <div className="bg-[#262626]/20 p-8 rounded-[2.5rem] border border-[#262626]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Momentum de Entrega</h2>
            <p className="text-xs text-[#404040]">Variação de performance nos últimos 7 dias operacionais.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00C2A8]" />
              <span className="text-[10px] font-bold text-[#A3A3A3] uppercase">Índice de Eficiência</span>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#262626" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: '#404040', fontWeight: 'bold' }}
              />
              <YAxis 
                stroke="#262626" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: '#404040', fontWeight: 'bold' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #262626', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#00C2A8', fontSize: '12px', fontWeight: 'bold' }}
                cursor={{ stroke: '#262626', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="momentum" 
                stroke="#00C2A8" 
                strokeWidth={4} 
                dot={{ r: 0 }}
                activeDot={{ r: 8, fill: '#00C2A8', stroke: '#0A0A0A', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
