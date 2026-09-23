import React, { useState } from 'react';
import { 
  Sprout, 
  Play, 
  Bell, 
  UserCircle2, 
  Menu, 
  X, 
  ChevronDown, 
  TrendingUp,
  Warehouse,
  Truck,
  QrCode,
  Award,
  Layers,
  FileText
} from 'lucide-react';
import { UserRole, UserSession } from '../../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSihDemo: () => void;
  onOpenNotifications: () => void;
  onOpenRoleSwitcher: () => void;
  currentUser: UserSession;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSihDemo,
  onOpenNotifications,
  onOpenRoleSwitcher,
  currentUser,
  unreadNotificationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'farmer', label: 'Dashboard' },
    { id: 'produce', label: 'Produce' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'price-intelligence', label: 'Mandi Prices' },
    { id: 'storage', label: 'Storage' },
    { id: 'transport', label: 'Logistics' },
    { id: 'traceability', label: 'Trace Produce' },
    { id: 'post-harvest-loss', label: 'Loss Monitor' },
    { id: 'schemes', label: 'Agri Schemes' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-900 to-agri-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight font-display">
                    AgriFlow
                  </span>
                  <span className="font-bold text-lg text-agri-700 font-display">India</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  Farm to Market &bull; Smarter, Faster, Better
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'text-agri-900 bg-agri-100/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2.5">
            {/* SIH Demo Walkthrough Button */}
            <button
              onClick={onOpenSihDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-harvest-600 hover:from-amber-600 hover:to-harvest-700 text-slate-950 font-extrabold text-xs shadow-xs hover:shadow-lift transition-all hover:scale-102"
              title="Start SIH Judge Interactive Presentation"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>▶ Start SIH Demo</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Active Persona / Role Switcher */}
            <button
              onClick={onOpenRoleSwitcher}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 transition-colors text-xs font-semibold"
            >
              <UserCircle2 className="w-4 h-4 text-agri-700" />
              <span className="hidden md:inline capitalize">{currentUser.role}: {currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-1 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  currentPage === link.id
                    ? 'text-agri-900 bg-agri-100 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Logged in as: <strong className="text-slate-800 capitalize">{currentUser.role}</strong></span>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoleSwitcher();
              }}
              className="text-agri-800 font-bold underline"
            >
              Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
