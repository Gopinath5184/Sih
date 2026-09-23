import React from 'react';
import { Sprout, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenSihDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSihDemo }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Pre-footer Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-slate-800/80">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-agri-950 via-agri-900 to-slate-900 border border-agri-800/50 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-agri-600/10 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-agri-500/20 text-agri-300 border border-agri-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Smart India Hackathon Initiative
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Build a Smarter Agricultural Supply Chain
            </h3>

            <p className="text-sm sm:text-base text-agri-100/90 leading-relaxed font-normal">
              "Technology should not replace the farmer. It should give farmers better information, better access, and better opportunities."
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('farmer')}
                className="px-6 py-3 rounded-xl bg-agri-500 hover:bg-agri-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lift transition-all hover:scale-102"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenSihDemo}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-xs transition-colors"
              >
                <span>View SIH Judge Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-agri-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🌾
              </div>
              <span className="font-extrabold text-xl text-white font-display">AgriFlow India</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An intelligent, unified digital platform managing agricultural produce from harvest to market — reducing post-harvest losses, empowering farmers, and establishing full transparency.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Problem Statement: Student Innovation - Enhancing the Primary Sector of India (Agriculture) & Produce Management.
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">Solutions</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('produce')} className="hover:text-agri-400">Produce Management</button></li>
              <li><button onClick={() => onNavigate('farmer')} className="hover:text-agri-400">AI Quality Inspection</button></li>
              <li><button onClick={() => onNavigate('storage')} className="hover:text-agri-400">Smart Cold Storage</button></li>
              <li><button onClick={() => onNavigate('processing')} className="hover:text-agri-400">Processing Hub</button></li>
              <li><button onClick={() => onNavigate('transport')} className="hover:text-agri-400">Reefer Logistics</button></li>
            </ul>
          </div>

          {/* Marketplace & Intel */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">Market & Data</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-agri-400">B2B Marketplace</button></li>
              <li><button onClick={() => onNavigate('price-intelligence')} className="hover:text-agri-400">APMC Mandi Prices</button></li>
              <li><button onClick={() => onNavigate('traceability')} className="hover:text-agri-400">Produce Traceability</button></li>
              <li><button onClick={() => onNavigate('post-harvest-loss')} className="hover:text-agri-400">Loss Reduction Intel</button></li>
              <li><button onClick={() => onNavigate('schemes')} className="hover:text-agri-400">Government Schemes</button></li>
            </ul>
          </div>

          {/* Stakeholders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">Ecosystem</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('farmer')} className="hover:text-agri-400">For Farmers</button></li>
              <li><button onClick={() => onNavigate('fpo')} className="hover:text-agri-400">For FPO Aggregators</button></li>
              <li><button onClick={() => onNavigate('buyer')} className="hover:text-agri-400">For Retail Buyers</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-agri-400">For APMC & Govt</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Built with passion for Indian agriculture</span>
            <span className="text-agri-400 font-semibold">&bull; Smart India Hackathon</span>
          </div>

          <div>
            <span>© 2026 AgriFlow India. All rights reserved. Prototype simulation for SIH.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
