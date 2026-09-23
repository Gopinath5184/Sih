import React from 'react';
import { X, Check, ShieldCheck, Tractor, Building2, Factory, Truck, ShoppingCart, Landmark } from 'lucide-react';
import { UserRole, UserSession } from '../../types';
import { DEMO_USERS } from '../../services/mockData';
import { stateService } from '../../services/stateService';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onRoleChanged: (newRole: UserRole) => void;
}

interface RoleOption {
  role: UserRole;
  title: string;
  icon: React.ReactNode;
  user: UserSession;
  desc: string;
  primaryTasks: string[];
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChanged
}) => {
  if (!isOpen) return null;

  const roleOptions: RoleOption[] = [
    {
      role: 'farmer',
      title: 'Farmer (Kisan)',
      icon: <Tractor className="w-5 h-5 text-emerald-700" />,
      user: DEMO_USERS.farmer,
      desc: 'Smallholder cultivator registering harvest, monitoring storage & accessing mandi rates.',
      primaryTasks: ['Register Produce', 'AI Quality Check', 'Check Mandi Prices', 'Apply for Schemes']
    },
    {
      role: 'fpo',
      title: 'FPO / Collection Center',
      icon: <Building2 className="w-5 h-5 text-teal-700" />,
      user: DEMO_USERS.fpo,
      desc: 'Farmer Producer Organization aggregating harvest lots and managing bulk contracts.',
      primaryTasks: ['Aggregate Farmer Lots', 'Weighbridge Receipts', 'Cold Storage Booking', 'Bulk B2B Lots']
    },
    {
      role: 'processor',
      title: 'Agro-Processor',
      icon: <Factory className="w-5 h-5 text-amber-700" />,
      user: DEMO_USERS.processor,
      desc: 'Food processing hub turning raw agricultural produce into value-added products.',
      primaryTasks: ['Procure Raw Produce', 'Batch Conversion Tracking', 'Yield & Waste Minimization']
    },
    {
      role: 'transporter',
      title: 'Cold-Chain Transporter',
      icon: <Truck className="w-5 h-5 text-indigo-700" />,
      user: DEMO_USERS.transporter,
      desc: 'Refrigerated and freight logistics fleet operator tracking transit & temperature.',
      primaryTasks: ['Fleet Tracking', 'IoT Chamber Temp Logs', 'Transit Route Optimization']
    },
    {
      role: 'buyer',
      title: 'Institutional Buyer / Retailer',
      icon: <ShoppingCart className="w-5 h-5 text-blue-700" />,
      user: DEMO_USERS.buyer,
      desc: 'Supermarket chain, wholesale distributor, or exporter purchasing verified quality lots.',
      primaryTasks: ['Direct Farm Procurement', 'Escrow Purchase Orders', 'Traceability Verification']
    },
    {
      role: 'admin',
      title: 'Government / APMC Admin',
      icon: <Landmark className="w-5 h-5 text-purple-700" />,
      user: DEMO_USERS.admin,
      desc: 'State agricultural marketing board monitoring post-harvest losses & state-wide distribution.',
      primaryTasks: ['Loss Reduction Indices', 'State Mandi Oversight', 'Buffer Stock Telemetry']
    }
  ];

  const handleSelectRole = (role: UserRole) => {
    stateService.switchUserRole(role);
    onRoleChanged(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-agri-300" />
              <h3 className="font-semibold font-display text-lg">Switch Stakeholder Perspective</h3>
            </div>
            <p className="text-xs text-agri-200/90 mt-1">
              Experience AgriFlow India through any of the 6 key agricultural ecosystem roles
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {roleOptions.map((opt) => {
            const isSelected = currentRole === opt.role;
            return (
              <div
                key={opt.role}
                onClick={() => handleSelectRole(opt.role)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-agri-600 bg-agri-50/70 ring-2 ring-agri-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs mt-0.5 shrink-0">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 font-display">{opt.title}</h4>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-agri-700 text-white">
                          Active Role
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      {opt.user.name} &bull; <span className="text-slate-500">{opt.user.organization}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {opt.primaryTasks.map((task, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100/90 text-slate-700 px-2 py-0.5 rounded border border-slate-200/60 font-medium">
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 self-end sm:self-center ${
                    isSelected
                      ? 'bg-agri-800 text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </>
                  ) : (
                    'Switch Role'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Demo data is synchronized across roles. Any action performed in one role reflects in the other dashboards.
        </div>
      </div>
    </div>
  );
};
