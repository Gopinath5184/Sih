import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  UserCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Tractor,
  Building2,
  Factory,
  Truck,
  ShoppingCart,
  Landmark,
  CheckCircle2,
  Info
} from 'lucide-react';
import { UserRole } from '../types';
import { DEMO_USERS } from '../services/mockData';
import { stateService } from '../services/stateService';

interface AuthPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLoginSuccess,
  onNavigate
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [emailOrPhone, setEmailOrPhone] = useState('murugesan.farmer@agriflow.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const demoRoles: { role: UserRole; title: string; name: string; org: string; icon: React.ReactNode }[] = [
    {
      role: 'farmer',
      title: 'Farmer',
      name: 'K. Murugesan',
      org: 'Dharmapuri Cultivators',
      icon: <Tractor className="w-4 h-4 text-emerald-700" />
    },
    {
      role: 'fpo',
      title: 'FPO Aggregator',
      name: 'R. Velan',
      org: 'Dharmapuri FPO Co.',
      icon: <Building2 className="w-4 h-4 text-teal-700" />
    },
    {
      role: 'processor',
      title: 'Agro Processor',
      name: 'Dr. Anand Kumar',
      org: 'Cauvery Bio-Foods',
      icon: <Factory className="w-4 h-4 text-amber-700" />
    },
    {
      role: 'transporter',
      title: 'Reefer Logistics',
      name: 'S. Shanmugam',
      org: 'TN Fleet Express',
      icon: <Truck className="w-4 h-4 text-indigo-700" />
    },
    {
      role: 'buyer',
      title: 'Retail Buyer',
      name: 'R. Senthil Nathan',
      org: 'FreshMart Hypermarkets',
      icon: <ShoppingCart className="w-4 h-4 text-blue-700" />
    },
    {
      role: 'admin',
      title: 'Gov & APMC Admin',
      name: 'P. Rajeshwaran, IAS',
      org: 'Dept of Agriculture',
      icon: <Landmark className="w-4 h-4 text-purple-700" />
    }
  ];

  const handleQuickDemoLogin = (role: UserRole) => {
    stateService.switchUserRole(role);
    const user = DEMO_USERS[role];
    setEmailOrPhone(user.email);
    setSelectedRole(role);
    onLoginSuccess(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stateService.switchUserRole(selectedRole);
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#faf9f5] to-slate-100">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Left Side: Illustration & Value Prop (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-agri-950 via-agri-900 to-agri-800 text-white p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span className="font-extrabold text-xl font-display">AgriFlow India</span>
            </div>

            <h2 className="text-2xl font-bold font-display leading-snug text-agri-100">
              India's Unified Produce Lifecycle Highway
            </h2>

            <p className="text-xs text-agri-200/80 leading-relaxed">
              Log in to manage harvests, inspect cold storage telemetry, list wholesale produce, and access fair-trade market intelligence.
            </p>
          </div>

          {/* Quick Demo Credentials Box (Section 27) */}
          <div className="my-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
              1-Click Demo Login (SIH Judges)
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {demoRoles.map((d) => (
                <button
                  key={d.role}
                  type="button"
                  onClick={() => handleQuickDemoLogin(d.role)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-left transition-colors border border-white/10"
                >
                  <span className="font-bold text-white block text-[11px]">{d.title}</span>
                  <span className="text-[10px] text-agri-200 truncate block">{d.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-agri-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Smart India Hackathon 2026 Innovation</span>
          </div>
        </div>

        {/* Right Side: Auth Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            {/* Mode Switcher */}
            <div className="flex border-b border-slate-200 pb-3 justify-between items-center text-xs">
              <div className="flex gap-4 font-bold">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setInfoMessage(null);
                  }}
                  className={`transition-colors ${authMode === 'login' ? 'text-agri-900 border-b-2 border-agri-800 pb-2' : 'text-slate-400'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setInfoMessage('New farmer onboarding: Direct verification via Aadhaar & FPO membership.');
                  }}
                  className={`transition-colors ${authMode === 'register' ? 'text-agri-900 border-b-2 border-agri-800 pb-2' : 'text-slate-400'}`}
                >
                  New Registration
                </button>
              </div>

              <span className="text-[11px] text-slate-400 font-mono">256-Bit SSL Secured</span>
            </div>

            {/* Info Message Notice */}
            {infoMessage && (
              <div className="mt-4 p-3 rounded-xl bg-agri-50 border border-agri-200 text-xs text-agri-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-agri-700 shrink-0 mt-0.5" />
                <span>{infoMessage}</span>
              </div>
            )}

            {/* Role Radio Group */}
            <div className="mt-6 space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Your Stakeholder Role:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {(['farmer', 'fpo', 'processor', 'transporter', 'buyer', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r);
                      setEmailOrPhone(DEMO_USERS[r].email);
                    }}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center capitalize border transition-all ${
                      selectedRole === r
                        ? 'bg-agri-800 text-white border-agri-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-agri-700"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setInfoMessage('Demo mode password: Any password or demo credentials will grant access.')}
                    className="text-[11px] text-agri-800 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-agri-700"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-agri-800 focus:ring-agri-700"
                  />
                  <span className="text-slate-600 text-[11px]">Remember login on this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Enter AgriFlow Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>New Cultivator? </span>
            <button 
              onClick={() => setInfoMessage('Cultivator Onboarding: Connect with your nearest FPO center for instant weighbridge registration.')}
              className="text-agri-800 font-bold underline"
            >
              Register with Aadhaar / FPO ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
