
import React, { useState } from 'react';
import { THEME, ICONS } from '../constants';
import { Activity } from '../types';

interface CalendarProps {
  language: 'pt-BR' | 'en-US';
  activities: Activity[];
}

const CalendarComponent: React.FC<CalendarProps> = ({ language, activities }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleSyncEmail = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const monthName = currentDate.toLocaleString(language === 'pt-BR' ? 'pt-BR' : 'en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  const daysArr = Array.from({ length: daysInMonth(year, currentDate.getMonth()) }, (_, i) => i + 1);
  const paddingArr = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Calendário Operacional</h1>
          <p className="text-[#A3A3A3]">Visualização de progresso e sincronização Lulenge.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSyncEmail}
            disabled={isSyncing}
            className="bg-[#171717] border border-[#262626] text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-[#262626] transition-all disabled:opacity-50"
          >
            {isSyncing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <ICONS.Globe size={16} color={THEME.PRIMARY} />}
            {isSyncing ? 'SINCRONIZANDO...' : 'SINCRONIZAR E-MAIL'}
          </button>
          <div className="flex bg-[#171717] border border-[#262626] rounded-2xl p-1">
            <button onClick={prevMonth} className="p-2 text-white hover:bg-[#262626] rounded-xl"><ICONS.X className="rotate-180" size={18} /></button>
            <div className="px-4 flex items-center font-bold text-white text-sm uppercase tracking-widest">{monthName} {year}</div>
            <button onClick={nextMonth} className="p-2 text-white hover:bg-[#262626] rounded-xl"><ICONS.ChevronRight size={18} /></button>
          </div>
        </div>
      </header>

      <div className="bg-[#171717] border border-[#262626] rounded-[2.5rem] p-8 shadow-2xl">
        <div className="grid grid-cols-7 gap-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
            <div key={d} className="p-2 text-center text-[10px] font-black text-[#404040] uppercase tracking-widest">{d}</div>
          ))}
          
          {paddingArr.map(p => <div key={`p-${p}`} className="h-32 bg-[#0A0A0A]/20 rounded-3xl" />)}
          
          {daysArr.map(day => {
            const dateStr = new Date(year, currentDate.getMonth(), day).toDateString();
            const dayActivities = activities.filter(a => new Date(a.timestamp).toDateString() === dateStr);
            const isToday = new Date().toDateString() === dateStr;

            return (
              <div key={day} className={`h-36 bg-[#0A0A0A] border border-[#262626] rounded-3xl p-3 flex flex-col group hover:border-[#00C2A8]/40 transition-all ${isToday ? 'ring-2 ring-[#00C2A8]/20' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-black ${isToday ? 'text-[#00C2A8]' : 'text-[#404040]'}`}>{day}</span>
                  {dayActivities.length === 0 && day < new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && (
                    <div className="w-2 h-2 rounded-full bg-[#FF4B4B] animate-pulse" title="Relatório Pendente" />
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                  {dayActivities.map(act => (
                    <div key={act.id} className="text-[9px] px-2 py-1 rounded-lg bg-[#00C2A8]/10 text-[#00C2A8] font-bold border border-[#00C2A8]/20 truncate">
                      {act.title}
                    </div>
                  ))}
                  {dayActivities.length > 3 && (
                    <div className="text-[8px] text-[#404040] font-bold text-center">+{dayActivities.length - 3} mais</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
