import React from 'react';
import { ArrowRight, PhoneCall, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#142319] text-stone-300 border-t border-stone-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-agri-700 text-white flex items-center justify-center">
                <svg className="w-4 h-4 text-agri-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white font-serif">AgriFlow India</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Connecting cultivator collectives, FPO weighbridges, cold storage chambers, and regional APMC mandis on a single transparent trade ledger.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-agri-400" />
                <span className="font-mono tabular-nums">1800-425-1556</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-agri-400" />
                <span>Dharmapuri • Koyambedu • Lasalgaon</span>
              </span>
            </div>
          </div>

          {/* Field & Storage */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">Field & Storage</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => onNavigate('produce')} className="hover:text-white transition-colors">Produce Register</button></li>
              <li><button onClick={() => onNavigate('farmer')} className="hover:text-white transition-colors">AGMARK Lot Assay</button></li>
              <li><button onClick={() => onNavigate('storage')} className="hover:text-white transition-colors">Cold Rooms & Silos</button></li>
              <li><button onClick={() => onNavigate('processing')} className="hover:text-white transition-colors">Processing Units</button></li>
              <li><button onClick={() => onNavigate('transport')} className="hover:text-white transition-colors">Reefer Dispatch</button></li>
            </ul>
          </div>

          {/* Mandi & Rates */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">Mandi & Rates</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Wholesale Trade</button></li>
              <li><button onClick={() => onNavigate('price-intelligence')} className="hover:text-white transition-colors">APMC Modal Rates</button></li>
              <li><button onClick={() => onNavigate('traceability')} className="hover:text-white transition-colors">Batch Traceability</button></li>
              <li><button onClick={() => onNavigate('post-harvest-loss')} className="hover:text-white transition-colors">Spoilage Recovery</button></li>
              <li><button onClick={() => onNavigate('schemes')} className="hover:text-white transition-colors">AIF & PMFBY Subsidies</button></li>
            </ul>
          </div>

          {/* Member Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">Member Portal</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => onNavigate('auth')} className="hover:text-white transition-colors font-semibold text-agri-300 flex items-center gap-1">Sign In / Register <ArrowRight className="w-3 h-3" /></button></li>
              <li><button onClick={() => onNavigate('farmer')} className="hover:text-white transition-colors">Cultivator Workspace</button></li>
              <li><button onClick={() => onNavigate('fpo')} className="hover:text-white transition-colors">FPO Weighbridge Desk</button></li>
              <li><button onClick={() => onNavigate('buyer')} className="hover:text-white transition-colors">Institutional Buyers</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">APMC Board</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            <span>© 2026 AgriFlow India Trade Network. Compliant with AGMARK & e-NAM grading standards.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('auth')} className="hover:text-white transition-colors">Member Sign In</button>
            <span>•</span>
            <button onClick={() => onNavigate('traceability')} className="hover:text-white transition-colors">Verify Lot QR</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
