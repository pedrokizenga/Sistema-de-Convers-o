
import React, { useState } from 'react';
import { THEME, ICONS, STRINGS } from '../constants';

const CalculatorComponent: React.FC<{ language: 'pt-BR' | 'en-US' }> = ({ language }) => {
  const t = STRINGS[language];
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [inputs, setInputs] = useState({
    workHours: 8,
    interruptions: 2,
    taskComplexity: 5,
    projectDeadline: 30,
    energyLevel: 80,
    parallelProjects: 1
  });

  const handleCalculate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Lógica de cálculo avançada Lulenge
      const netHours = inputs.workHours - (inputs.interruptions * 0.45);
      const projectEffort = (inputs.taskComplexity * 10) / inputs.projectDeadline;
      const cognitiveLoad = (projectEffort * inputs.parallelProjects) / (netHours * (inputs.energyLevel / 100));
      
      const viability = cognitiveLoad < 0.4 ? 'Ótima' : cognitiveLoad < 0.7 ? 'Moderada' : 'Baixa (Risco de Burnout)';
      
      setResult({
        dailyCapacity: (1 / cognitiveLoad).toFixed(1),
        viability,
        suggestedHours: (inputs.workHours * (cognitiveLoad > 0.7 ? 1.25 : 1)).toFixed(1),
        riskLevel: cognitiveLoad > 0.8 ? 'CRÍTICO' : cognitiveLoad > 0.5 ? 'ATENÇÃO' : 'SEGURO'
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <header>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Motor de Viabilidade Lulenge</h1>
        <p className="text-[#A3A3A3]">Mapeamento de recursos temporais e carga cognitiva.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#171717] p-10 rounded-[3rem] border border-[#262626] space-y-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#404040] uppercase tracking-[0.2em]">Disponibilidade (h/dia)</label>
              <input 
                type="number" 
                value={inputs.workHours}
                onChange={e => setInputs({...inputs, workHours: Number(e.target.value)})}
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-2xl p-5 text-white focus:border-[#00C2A8] outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#404040] uppercase tracking-[0.2em]">Frequência de Interrupções</label>
              <input 
                type="number" 
                value={inputs.interruptions}
                onChange={e => setInputs({...inputs, interruptions: Number(e.target.value)})}
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-2xl p-5 text-white focus:border-[#00C2A8] outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#404040] uppercase tracking-[0.2em]">Complexidade do Projeto (1-10)</label>
              <input 
                type="number" 
                value={inputs.taskComplexity}
                onChange={e => setInputs({...inputs, taskComplexity: Number(e.target.value)})}
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-2xl p-5 text-white focus:border-[#00C2A8] outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#404040] uppercase tracking-[0.2em]">Prazo Estimado (Dias)</label>
              <input 
                type="number" 
                value={inputs.projectDeadline}
                onChange={e => setInputs({...inputs, projectDeadline: Number(e.target.value)})}
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-2xl p-5 text-white focus:border-[#00C2A8] outline-none"
              />
            </div>
          </div>

          <button 
            onClick={handleCalculate}
            disabled={isProcessing}
            className="w-full py-6 bg-[#00C2A8] text-black font-black rounded-[1.5rem] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#00C2A8]/10"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                PROCESSANDO DIAGNÓSTICO...
              </div>
            ) : (
              <>EFETUAR CÁLCULO DE PERFORMANCE</>
            )}
          </button>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
              <div className={`p-10 rounded-[3rem] border flex flex-col items-center text-center shadow-2xl ${
                result.riskLevel === 'CRÍTICO' ? 'bg-[#FF4B4B]/5 border-[#FF4B4B]/20' : 'bg-[#00C2A8]/5 border-[#00C2A8]/20'
              }`}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#404040] mb-4">Eficiência do Sprint</p>
                <h3 className="text-7xl font-black text-white">{result.dailyCapacity}x</h3>
                <span className={`mt-6 px-6 py-2 rounded-full text-[10px] font-black tracking-widest ${
                  result.riskLevel === 'CRÍTICO' ? 'bg-[#FF4B4B] text-white' : 'bg-[#00C2A8] text-black'
                }`}>{result.riskLevel}</span>
              </div>

              <div className="bg-[#171717] border border-[#262626] p-8 rounded-[3rem] space-y-6">
                <div className="flex justify-between items-center border-b border-[#262626] pb-4">
                  <span className="text-[#404040] text-xs font-black uppercase tracking-widest">Viabilidade:</span>
                  <span className={`text-sm font-black ${result.viability.includes('Baixa') ? 'text-[#FF4B4B]' : 'text-[#00C2A8]'}`}>{result.viability}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#404040] text-xs font-black uppercase tracking-widest">Alocação Ideal:</span>
                  <span className="text-[#FFD100] font-black text-lg">{result.suggestedHours}h/dia</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-[#171717]/30 border-2 border-dashed border-[#262626] rounded-[3rem] flex flex-col items-center justify-center text-center p-10">
              <ICONS.Brain size={64} className="text-[#262626] mb-6" />
              <p className="text-[#404040] font-bold text-sm leading-relaxed">Aguardando parâmetros para análise de viabilidade cognitiva.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorComponent;
