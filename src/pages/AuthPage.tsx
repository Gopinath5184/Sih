import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Eye,
  EyeOff,
  Tractor,
  Building2,
  Factory,
  Truck,
  ShoppingCart,
  Landmark,
  MapPin,
  CheckCircle2,
  KeyRound
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
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  // Sign In fields
  const [emailOrPhone, setEmailOrPhone] = useState('+91 98421 78201');
  const [password, setPassword] = useState('kisan2026');
  const [otpCode, setOtpCode] = useState('482910');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regDistrict, setRegDistrict] = useState('Dharmapuri');
  const [regState, setRegState] = useState('Tamil Nadu');
  const [regPassword, setRegPassword] = useState('');

  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'info' | 'success' } | null>(null);

  const roleProfiles: { role: UserRole; title: string; subtitle: string; name: string; org: string; icon: React.ReactNode }[] = [
    {
      role: 'farmer',
      title: 'Farmer / Cultivator',
      subtitle: 'Harvest lots & mandi prices',
      name: 'K. Murugesan',
      org: 'Palacode, Dharmapuri',
      icon: <Tractor className="w-4 h-4 text-agri-700" />
    },
    {
      role: 'fpo',
      title: 'FPO Center',
      subtitle: 'Weighbridge & aggregation',
      name: 'R. Velan',
      org: 'Dharmapuri Horti FPO',
      icon: <Building2 className="w-4 h-4 text-teal-700" />
    },
    {
      role: 'processor',
      title: 'Food Processor',
      subtitle: 'Batch intake & conversion',
      name: 'Dr. Anand Kumar',
      org: 'Cauvery Bio-Foods',
      icon: <Factory className="w-4 h-4 text-amber-700" />
    },
    {
      role: 'transporter',
      title: 'Fleet Operator',
      subtitle: 'Reefer dispatch & transit logs',
      name: 'S. Shanmugam',
      org: 'TN Fleet Express',
      icon: <Truck className="w-4 h-4 text-indigo-700" />
    },
    {
      role: 'buyer',
      title: 'Wholesale Buyer',
      subtitle: 'Direct procurement & escrow',
      name: 'R. Senthil Nathan',
      org: 'FreshMart Retail',
      icon: <ShoppingCart className="w-4 h-4 text-blue-700" />
    },
    {
      role: 'admin',
      title: 'Mandi / APMC Officer',
      subtitle: 'Regional stock & arrivals',
      name: 'P. Rajeshwaran',
      org: 'Directorate of Agri Marketing',
      icon: <Landmark className="w-4 h-4 text-stone-700" />
    }
  ];

  const handleSelectProfile = (role: UserRole) => {
    const user = DEMO_USERS[role];
    setSelectedRole(role);
    setEmailOrPhone(user.phone || user.email);
    setStatusMessage({
      text: `Loaded credentials for ${user.name} (${user.organization || role.toUpperCase()}). Click Sign In below to continue.`,
      type: 'info'
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stateService.loginUser(selectedRole, emailOrPhone.trim());
    onLoginSuccess(selectedRole);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = {
      role: selectedRole,
      name: regName.trim() || 'Registered Member',
      phone: regPhone.trim() || '+91 98400 11223',
      email: regEmail.trim() || `${selectedRole}@agriflow.in`,
      organization: regOrg.trim() || `${regDistrict} Agri Collective`,
      location: `${regDistrict}, ${regState}`
    };
    stateService.registerUser(newSession);
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#f6f4ee]">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl border border-stone-200/90 shadow-lift overflow-hidden">
        
        {/* Left Column: Editorial Context & Saved Accounts (5 cols) */}
        <div className="lg:col-span-5 bg-[#163020] text-stone-100 p-8 sm:p-9 flex flex-col justify-between relative">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-agri-700/80 border border-agri-500/40 flex items-center justify-center">
                  <svg className="w-5 h-5 text-agri-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-lg tracking-tight text-white font-display block leading-none">
                    AgriFlow India
                  </span>
                  <span className="text-[11px] text-agri-200/80">Mandi & Cold-Chain Portal</span>
                </div>
              </button>
            </div>

            <div className="pt-2 space-y-2.5">
              <h2 className="text-2xl sm:text-[26px] font-bold font-serif leading-snug text-white">
                Every harvest lot accounted for, from field crate to market settlement.
              </h2>
              <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed">
                Sign in with your registered mobile number or FPO member ID to record weighbridge slips, check cold-room temperatures, and compare regional APMC modal rates.
              </p>
            </div>

            {/* Live Morning Mandi Bulletin Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-agri-200 font-medium">
                <span>Morning APMC Bulletin</span>
                <span className="font-mono text-[11px] tabular-nums">07:00 AM IST</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 tabular-nums">
                <div className="p-2 rounded-lg bg-white/5">
                  <span className="text-[10px] text-stone-300 block">Koyambedu Tomato</span>
                  <span className="font-bold text-white text-sm">₹28/kg</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <span className="text-[10px] text-stone-300 block">Lasalgaon Onion</span>
                  <span className="font-bold text-white text-sm">₹31/kg</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <span className="text-[10px] text-stone-300 block">Kurnool Sona Rice</span>
                  <span className="font-bold text-white text-sm">₹42/kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Workspace Profiles for Quick Testing */}
          <div className="my-6 pt-5 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-agri-200">
                Switch Workspace Profile
              </span>
              <span className="text-[11px] text-stone-400">Click to autofill</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {roleProfiles.map((d) => {
                const isSelected = selectedRole === d.role;
                return (
                  <button
                    key={d.role}
                    type="button"
                    onClick={() => handleSelectProfile(d.role)}
                    className={`p-2.5 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'bg-agri-700/60 border-agri-400/60 text-white'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-stone-200'
                    }`}
                  >
                    <span className="font-semibold text-white block text-xs">{d.title}</span>
                    <span className="text-[11px] text-agri-200/90 truncate block">{d.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-stone-300/80 flex items-center justify-between pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-agri-300 shrink-0" />
              <span>e-NAM & FPO Registry Linked</span>
            </span>
            <span className="font-mono text-[11px]">Helpline: 1800-425-1556</span>
          </div>
        </div>

        {/* Right Column: Login / Registration Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Top Mode Tabs */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex gap-6 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setStatusMessage(null);
                  }}
                  className={`pb-3 -mb-3.5 transition-colors border-b-2 ${
                    authMode === 'login'
                      ? 'text-agri-900 border-agri-800'
                      : 'text-slate-400 border-transparent hover:text-slate-700'
                  }`}
                >
                  Sign In to Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setStatusMessage(null);
                  }}
                  className={`pb-3 -mb-3.5 transition-colors border-b-2 ${
                    authMode === 'register'
                      ? 'text-agri-900 border-agri-800'
                      : 'text-slate-400 border-transparent hover:text-slate-700'
                  }`}
                >
                  New Member Registration
                </button>
              </div>
            </div>

            {statusMessage && (
              <div className="mt-4 p-3 rounded-xl bg-agri-50 border border-agri-200 text-xs text-agri-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-agri-700 shrink-0" />
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Stakeholder Role Selector */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Your Role in the Supply Chain
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {roleProfiles.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.role);
                      if (authMode === 'login') {
                        setEmailOrPhone(DEMO_USERS[r.role].phone || DEMO_USERS[r.role].email);
                      }
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                      selectedRole === r.role
                        ? 'bg-agri-50/90 border-agri-700 text-agri-950 ring-1 ring-agri-700/30'
                        : 'bg-stone-50/70 text-slate-700 border-stone-200 hover:bg-stone-100/80'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">{r.icon}</div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block truncate">{r.title}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{r.subtitle}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {authMode === 'login' ? (
              /* SIGN IN FORM */
              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">
                    Registered Mobile Number or Email ID
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="e.g. +91 98421 78201 or name@fpo.in"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700 focus:ring-2 focus:ring-agri-700/15"
                      required
                    />
                  </div>
                </div>

                {/* Toggle between Password & SMS OTP */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="font-semibold text-slate-700">
                      {loginMethod === 'password' ? 'Account Password' : '6-Digit SMS Verification Code'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginMethod(loginMethod === 'password' ? 'otp' : 'password')}
                      className="text-xs font-semibold text-agri-800 hover:underline"
                    >
                      {loginMethod === 'password' ? 'Sign in with SMS OTP instead' : 'Use password instead'}
                    </button>
                  </div>

                  {loginMethod === 'password' ? (
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700 focus:ring-2 focus:ring-agri-700/15"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          maxLength={6}
                          placeholder="6-digit OTP"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 font-mono font-bold tracking-widest text-slate-900 focus:outline-hidden focus:border-agri-700"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setStatusMessage({
                            text: `Verification OTP sent via SMS to ${emailOrPhone}`,
                            type: 'info'
                          })
                        }
                        className="px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 font-semibold text-slate-700 shrink-0"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-agri-800 focus:ring-agri-700"
                    />
                    <span className="text-slate-600">Keep me signed in on this terminal</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('otp');
                      setStatusMessage({
                        text: 'Switched to SMS OTP verification so you can sign in without a password.',
                        type: 'info'
                      });
                    }}
                    className="text-slate-500 hover:text-agri-800 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
                >
                  <span>Sign In to {roleProfiles.find((r) => r.role === selectedRole)?.title} Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="mt-5 space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. M. Subramanian"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98420 00000"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">FPO / Firm / Farm Name</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={regOrg}
                        onChange={(e) => setRegOrg(e.target.value)}
                        placeholder="e.g. Kaveri Farmers Producer Co."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@domain.in"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">District</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">State</label>
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 bg-white focus:outline-hidden focus:border-agri-700"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Create Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-medium text-slate-900 focus:outline-hidden focus:border-agri-700"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Create Account & Enter Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Footer Switcher */}
          <div className="pt-5 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {authMode === 'login' ? "Don't have a member account yet?" : 'Already registered with an FPO or Mandi?'}
            </span>
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setStatusMessage(null);
              }}
              className="text-agri-800 font-bold hover:underline"
            >
              {authMode === 'login' ? 'Register New Account →' : 'Sign In Here →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
