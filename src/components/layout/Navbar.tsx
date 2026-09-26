import React, { useState } from 'react';
import { 
  Bell, 
  UserCircle2, 
  Menu, 
  X, 
  ChevronDown,
  LogIn,
  LogOut
} from 'lucide-react';
import { UserSession } from '../../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenNotifications: () => void;
  onOpenRoleSwitcher: () => void;
  onLogout: () => void;
  currentUser: UserSession;
  isAuthenticated: boolean;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenNotifications,
  onOpenRoleSwitcher,
  onLogout,
  currentUser,
  isAuthenticated,
  unreadNotificationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Overview' },
    { id: 'farmer', label: 'Dashboard' },
    { id: 'produce', label: 'Produce Lots' },
    { id: 'marketplace', label: 'Mandi Trade' },
    { id: 'price-intelligence', label: 'APMC Rates' },
    { id: 'storage', label: 'Cold Rooms' },
    { id: 'transport', label: 'Dispatch' },
    { id: 'traceability', label: 'Lot Trace' },
    { id: 'post-harvest-loss', label: 'Spoilage Log' },
    { id: 'schemes', label: 'Subsidies' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fdfcf9]/95 backdrop-blur-md border-b border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1a4129] text-white flex items-center justify-center shadow-2xs group-hover:bg-agri-800 transition-colors">
                <svg className="w-5 h-5 text-agri-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-lg text-slate-900 tracking-tight font-serif">
                    AgriFlow
                  </span>
                  <span className="font-semibold text-xs text-agri-800 uppercase tracking-wider">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  FPO Weighbridge, Cold Chain & APMC Trade
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === link.id
                    ? 'text-agri-950 bg-stone-200/75 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Account Controls */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-stone-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                {/* Active Persona / Role Switcher */}
                <button
                  onClick={onOpenRoleSwitcher}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 border border-stone-200 text-slate-800 transition-colors text-xs font-medium"
                  title="Switch active stakeholder role"
                >
                  <UserCircle2 className="w-4 h-4 text-agri-800" />
                  <span className="hidden md:inline capitalize">
                    {currentUser.name.split(' ')[0]} <span className="text-slate-400">({currentUser.role})</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Sign Out / Login Page Button */}
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors"
                  title="Sign out or switch account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-agri-800 hover:bg-agri-900 text-white font-semibold text-xs transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fdfcf9] border-b border-stone-200 px-4 pt-2 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-1 pb-3 border-b border-stone-200/70">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  currentPage === link.id
                    ? 'text-agri-950 bg-stone-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-slate-600">
            <span>
              Signed in: <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.role})
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoleSwitcher();
                }}
                className="text-agri-800 font-semibold underline"
              >
                Switch Role
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('auth');
                }}
                className="text-slate-700 font-semibold underline"
              >
                Login Page
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
