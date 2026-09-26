import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Warehouse, 
  Activity, 
  Factory, 
  Truck, 
  QrCode, 
  FileText, 
  Building2, 
  ShoppingCart, 
  Landmark,
  PhoneCall
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const primaryMenuItems = [
    { id: 'farmer', label: 'Farmer Workspace', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'produce', label: 'Produce Register', icon: <Package className="w-4 h-4" /> },
    { id: 'marketplace', label: 'Wholesale Mandi', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'price-intelligence', label: 'APMC Rate Board', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'storage', label: 'Cold Rooms & Silos', icon: <Warehouse className="w-4 h-4" /> },
    { id: 'post-harvest-loss', label: 'Spoilage & Recovery', icon: <Activity className="w-4 h-4" /> },
    { id: 'processing', label: 'Processing Units', icon: <Factory className="w-4 h-4" /> },
    { id: 'transport', label: 'Reefer Dispatch', icon: <Truck className="w-4 h-4" /> },
    { id: 'traceability', label: 'Lot Trace & QR', icon: <QrCode className="w-4 h-4" /> },
    { id: 'schemes', label: 'Subsidies & AIF', icon: <FileText className="w-4 h-4" /> },
  ];

  const roleHubs = [
    { id: 'fpo', label: 'FPO Weighbridge Desk', icon: <Building2 className="w-4 h-4" /> },
    { id: 'buyer', label: 'Buyer Procurement', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'admin', label: 'APMC & State Board', icon: <Landmark className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-60 bg-[#fdfcf9] border-r border-stone-200/90 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        {/* Core Navigation */}
        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
            Mandi & Operations
          </span>
          <nav className="space-y-0.5">
            {primaryMenuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1a4129] text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                  }`}
                >
                  <span className={isActive ? 'text-agri-200' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Stakeholder Portals */}
        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
            Partner Desks
          </span>
          <nav className="space-y-0.5">
            {roleHubs.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1a4129] text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                  }`}
                >
                  <span className={isActive ? 'text-agri-200' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Kisan Mandi Helpdesk Footer */}
      <div className="pt-4 border-t border-stone-200/80">
        <div className="p-3 rounded-xl bg-stone-100/80 border border-stone-200 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <PhoneCall className="w-3.5 h-3.5 text-agri-800" />
            <span>Kisan Mandi Desk</span>
          </div>
          <p className="text-[11px] font-mono text-agri-900 font-semibold mt-1 tabular-nums">
            1800-425-1556 (Toll-Free)
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Tamil, Hindi, Marathi & Telugu
          </p>
        </div>
      </div>
    </aside>
  );
};
