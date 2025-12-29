
export enum ViewType {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  GOALS = 'GOALS',
  LOG = 'LOG',
  CALENDAR = 'CALENDAR',
  PERFORMANCE = 'PERFORMANCE',
  SETTINGS = 'SETTINGS',
  ONBOARDING = 'ONBOARDING',
  CALCULATOR = 'CALCULATOR'
}

export type TimeUnit = 'Dias' | 'Semanas' | 'Meses' | 'Anos';

export interface Goal {
  id: string;
  title: string;
  steps: string[];
  estimatedValue: number;
  timeUnit: TimeUnit;
  deadline: string;
  progress: number;
  color: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
  workType: 'Foco Profundo' | 'Criativo' | 'Gestão/Operacional';
  chronotype: 'Matutino' | 'Vespertino' | 'Noturno';
  skills: string[];
  interests: string[];
  aiPersona: 'Amigável' | 'Crítico/Arrogante';
  customAiPrompt: string;
  language: 'pt-BR' | 'en-US';
  timezone: string;
  autoTimezone: boolean;
  weekStart: 'Segunda' | 'Domingo';
}

export interface Activity {
  id: string;
  title: string;
  type: 'Foco Profundo' | 'Superficial' | 'Manutenção' | 'Desvio';
  timestamp: string;
  duration: number; 
  energyLevel: number;
  mood: string;
  goalId?: string;
  impactNote?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
