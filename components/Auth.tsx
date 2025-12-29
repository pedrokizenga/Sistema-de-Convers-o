
import React, { useState } from 'react';
import { THEME, ICONS } from '../constants';

interface AuthProps {
  onAuth: (userData: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    role: ''
  });

  const roles = ["Médico", "Estudante", "Gestor de Marketing", "Desenvolvedor", "Outro"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(formData);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#171717] border border-[#262626] rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 rounded-2xl bg-[#00C2A8]/10 mb-4">
            <ICONS.Zap size={40} color={THEME.PRIMARY} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">LULENGE</h1>
          <p className="text-[#A3A3A3] text-sm mt-2">{isLogin ? 'Bem-vindo de volta ao comando' : 'Inicie sua jornada de performance'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Nome" 
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white text-sm focus:border-[#00C2A8] outline-none transition-all"
                required
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
              <input 
                placeholder="Sobrenome" 
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white text-sm focus:border-[#00C2A8] outline-none transition-all"
                required
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          )}

          <input 
            type="email" 
            placeholder="E-mail" 
            className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white text-sm focus:border-[#00C2A8] outline-none transition-all"
            required
            onChange={e => setFormData({...formData, email: e.target.value})}
          />

          {!isLogin && (
            <>
              <input 
                type="tel" 
                placeholder="Telefone" 
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white text-sm focus:border-[#00C2A8] outline-none transition-all"
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                type="date" 
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-[#A3A3A3] text-sm focus:border-[#00C2A8] outline-none transition-all"
                onChange={e => setFormData({...formData, birthDate: e.target.value})}
              />
              <select 
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-sm text-[#A3A3A3] focus:border-[#00C2A8] outline-none"
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="">Selecione seu Cargo</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </>
          )}

          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 text-white text-sm focus:border-[#00C2A8] outline-none transition-all"
            required
            onChange={e => setFormData({...formData, password: e.target.value})}
          />

          <button 
            type="submit"
            className="w-full py-5 bg-[#00C2A8] text-black font-black rounded-2xl hover:bg-[#00C2A8]/90 transition-all shadow-lg shadow-[#00C2A8]/20"
          >
            {isLogin ? 'ENTRAR AGORA' : 'CRIAR CONTA LULENGE'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-[#A3A3A3] hover:text-[#00C2A8] transition-colors"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui conta? Inicie sessão'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
