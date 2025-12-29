
import React from 'react';
import { ViewType } from '../types';
import { THEME, ICONS, STRINGS } from '../constants';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onToggle: () => void;
  language: 'pt-BR' | 'en-US';
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onToggle, language }) => {
  const t = STRINGS[language];
  const navItems = [
    { type: ViewType.DASHBOARD, label: 'Dashboard', icon: ICONS.Dashboard },
    { type: ViewType.GOALS, label: language === 'pt-BR' ? 'Metas' : 'Goals', icon: ICONS.Goals },
    { type: ViewType.CALENDAR, label: language === 'pt-BR' ? 'Calendário' : 'Calendar', icon: ICONS.Calendar },
    { type: ViewType.LOG, label: 'Log de Atividades', icon: ICONS.Log },
    { type: ViewType.PERFORMANCE, label: 'Análise', icon: ICONS.Performance },
    { type: ViewType.CALCULATOR, label: 'Calculadora', icon: ICONS.Calculator },
    { type: ViewType.SETTINGS, label: 'Configurações', icon: ICONS.Settings },
  ];

  return (
    <div className={`fixed lg:relative z-40 h-screen transition-all duration-300 border-r border-[#262626] flex flex-col ${isOpen ? 'w-64' : 'w-0 lg:w-20'} overflow-hidden`} style={{ backgroundColor: THEME.BASE }}>
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#00C2A8]/10 flex-shrink-0">
          <ICONS.Zap size={24} color={THEME.PRIMARY} />
        </div>
        <span className="text-xl font-black tracking-tighter text-white whitespace-nowrap">LULENGE</span>
      </div>

      <nav className="flex-1 w-full px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.type;
          return (
            <button
              key={item.type}
              onClick={() => {
                onViewChange(item.type);
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative ${
                isActive ? 'bg-[#262626] text-[#00C2A8]' : 'text-[#A3A3A3] hover:bg-[#262626]/50 hover:text-white'
              }`}
            >
              <item.icon size={22} className="flex-shrink-0" />
              <span className={`font-medium text-sm transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>{item.label}</span>
              {isActive && <div className="absolute left-0 w-1 h-6 bg-[#00C2A8] rounded-r-full" />}
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-[#262626]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00C2A8] to-[#FFD100] flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
            LG
          </div>
          <div className={`overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
            <p className="text-white text-sm font-semibold truncate">Operador</p>
            <p className="text-xs text-[#A3A3A3] truncate">Modo Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
