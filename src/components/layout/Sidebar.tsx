import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Sparkles, 
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
  User,
  ShieldCheck
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
  currentRole
}) => {
  const primaryMenuItems = [
    { id: 'farmer', label: 'Farmer Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'produce', label: 'Produce Management', icon: <Package className="w-4 h-4" /> },
    { id: 'marketplace', label: 'Smart Marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'price-intelligence', label: 'Price Intelligence', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'storage', label: 'Cold Storage & Silos', icon: <Warehouse className="w-4 h-4" /> },
    { id: 'post-harvest-loss', label: 'Loss Monitor & Intel', icon: <Activity className="w-4 h-4" /> },
    { id: 'processing', label: 'Processing Hub', icon: <Factory className="w-4 h-4" /> },
    { id: 'transport', label: 'Transport & Fleets', icon: <Truck className="w-4 h-4" /> },
    { id: 'traceability', label: 'Trace Produce & QR', icon: <QrCode className="w-4 h-4" /> },
    { id: 'schemes', label: 'Government Schemes', icon: <FileText className="w-4 h-4" /> },
  ];

  const roleHubs = [
    { id: 'fpo', label: 'FPO Aggregation Hub', icon: <Building2 className="w-4 h-4" /> },
    { id: 'buyer', label: 'Buyer Procurement', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'admin', label: 'Gov & APMC Admin', icon: <Landmark className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        {/* Core Navigation */}
        <div>
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Operations & Analytics
          </span>
          <nav className="space-y-1">
            {primaryMenuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-agri-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
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
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Stakeholder Portals
          </span>
          <nav className="space-y-1">
            {roleHubs.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-agri-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Badge */}
      <div className="pt-4 border-t border-slate-100">
        <div className="p-3 rounded-xl bg-agri-50/70 border border-agri-200/70 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-agri-950">
            <ShieldCheck className="w-4 h-4 text-agri-700" />
            <span>Smart India Hackathon</span>
          </div>
          <p className="text-[11px] text-agri-800 mt-0.5">
            Enhancing Indian Agriculture produce lifecycle & food security
          </p>
        </div>
      </div>
    </aside>
  );
};
