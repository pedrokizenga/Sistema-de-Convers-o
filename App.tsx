
import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import ActivityLog from './components/ActivityLog';
import Performance from './components/Performance';
import AIChat from './components/AIChat';
import Onboarding from './components/Onboarding';
import Settings from './components/Settings';
import CalendarComponent from './components/Calendar';
import CalculatorComponent from './components/Calculator';
import { ViewType, UserProfile, Goal, Activity } from './types';
import { THEME, ICONS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    role: '',
    workType: 'Foco Profundo',
    chronotype: 'Matutino',
    skills: [],
    interests: [],
    aiPersona: 'Amigável',
    customAiPrompt: '',
    language: 'pt-BR',
    timezone: 'WAT (UTC+1) - Luanda, Angola',
    autoTimezone: true,
    weekStart: 'Segunda'
  });

  const handleAuth = (userData: any) => {
    setProfile({
      ...profile,
      ...userData
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(ViewType.DASHBOARD);
  };

  const handleActivityLogged = (newActivity: Activity) => {
    setActivities(prev => [newActivity, ...prev]);
  };

  useEffect(() => {
    if (isAuthenticated && goals.length === 0 && currentView !== ViewType.ONBOARDING && currentView !== ViewType.SETTINGS) {
      setCurrentView(ViewType.ONBOARDING);
    }
  }, [goals, currentView, isAuthenticated]);

  const handleOnboardingComplete = (goalData: any) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalData.title,
      steps: goalData.steps || [],
      estimatedValue: 30, 
      timeUnit: 'Dias',
      deadline: goalData.deadline || '30 dias',
      progress: 0,
      color: THEME.PRIMARY
    };
    setGoals([newGoal]);
    setCurrentView(ViewType.DASHBOARD);
  };

  if (!isAuthenticated) {
    return <Auth onAuth={handleAuth} />;
  }

  const renderContent = () => {
    if (goals.length === 0 && currentView === ViewType.ONBOARDING) {
      return <Onboarding language={profile.language} onComplete={handleOnboardingComplete} />;
    }

    switch (currentView) {
      case ViewType.DASHBOARD:
        return <Dashboard userName={profile.firstName} onAnalyzeTrigger={() => setCurrentView(ViewType.PERFORMANCE)} />;
      case ViewType.GOALS:
        return <Goals masterGoal={goals[0] || null} onDeleteMasterGoal={() => setGoals([])} profile={profile} />;
      case ViewType.LOG:
        return <ActivityLog profile={profile} onActivityLogged={handleActivityLogged} />;
      case ViewType.PERFORMANCE:
        return <Performance profile={profile} />;
      case ViewType.CALENDAR:
        return <CalendarComponent language={profile.language} activities={activities} />;
      case ViewType.CALCULATOR:
        return <CalculatorComponent language={profile.language} />;
      case ViewType.SETTINGS:
        return <Settings profile={profile} onUpdate={setProfile} goals={goals} onOpenOnboarding={() => setCurrentView(ViewType.ONBOARDING)} onLogout={handleLogout} />;
      default:
        return <Dashboard userName={profile.firstName} onAnalyzeTrigger={() => setCurrentView(ViewType.PERFORMANCE)} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-[#A3A3A3] overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        language={profile.language}
      />

      <main className="flex-1 overflow-y-auto relative bg-gradient-to-br from-[#0A0A0A] to-[#121212] transition-all duration-300 custom-scrollbar">
        <header className="sticky top-0 z-30 p-4 lg:p-6 flex items-center gap-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#262626]">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white hover:bg-[#262626] rounded-xl transition-colors">
            <ICONS.Menu size={24} />
          </button>
          <div className="h-4 w-px bg-[#262626]" />
          <span className="text-[10px] font-black text-[#404040] uppercase tracking-[0.2em]">LULENGE SYSTEM // {currentView}</span>
        </header>
        
        {renderContent()}
      </main>

      <AIChat profile={profile} />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#171717] border-t border-[#262626] flex items-center justify-around z-40">
         <button onClick={() => setCurrentView(ViewType.DASHBOARD)} className={currentView === ViewType.DASHBOARD ? 'text-[#00C2A8]' : ''}><ICONS.Dashboard size={20}/></button>
         <button onClick={() => setCurrentView(ViewType.GOALS)} className={currentView === ViewType.GOALS ? 'text-[#00C2A8]' : ''}><ICONS.Goals size={20}/></button>
         <button onClick={() => setCurrentView(ViewType.LOG)} className={currentView === ViewType.LOG ? 'text-[#00C2A8]' : ''}><ICONS.Log size={20}/></button>
         <button onClick={() => setCurrentView(ViewType.CALENDAR)} className={currentView === ViewType.CALENDAR ? 'text-[#00C2A8]' : ''}><ICONS.Calendar size={20}/></button>
      </div>
    </div>
  );
};

export default App;
