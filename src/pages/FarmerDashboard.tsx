import React, { useState } from 'react';
import { 
  Package, 
  Warehouse, 
  CheckCheck, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Sparkles, 
  QrCode, 
  ArrowRight, 
  Eye, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Produce, MarketPrice, UserSession } from '../types';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { QualityInspector } from '../components/ai/QualityInspector';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { stateService } from '../services/stateService';

interface FarmerDashboardProps {
  produceList: Produce[];
  marketPrices: MarketPrice[];
  currentUser: UserSession;
  onNavigate: (page: string) => void;
  onOpenAddProduce: () => void;
  onViewTraceability: (produceId: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  produceList,
  marketPrices,
  currentUser,
  onNavigate,
  onOpenAddProduce,
  onViewTraceability
}) => {
  const [selectedProduceForQR, setSelectedProduceForQR] = useState<Produce | null>(null);
  const [showAiInspector, setShowAiInspector] = useState<boolean>(false);

  // Compute Farmer Dashboard Metrics
  const totalQuantityKg = produceList.reduce((acc, p) => acc + p.quantityKg, 0);
  const availableStockKg = produceList
    .filter((p) => p.status === 'harvested' || p.status === 'quality_checked' || p.status === 'stored' || p.status === 'listed')
    .reduce((acc, p) => acc + p.quantityKg, 0);
  const soldQuantityKg = produceList
    .filter((p) => p.status === 'sold' || p.status === 'delivered')
    .reduce((acc, p) => acc + p.quantityKg, 0);
  const expectedRevenue = produceList.reduce(
    (acc, p) => acc + p.quantityKg * (p.currentMarketPricePerKg || p.expectedPricePerKg), 
    0
  );

  // Today's Market Snapshot Items
  const marketSnapshot = [
    { crop: 'Tomato', variety: 'Hybrid Round', price: 28, unit: '₹/kg', delta: 8.5, mandi: 'Koyambedu (Chennai)' },
    { crop: 'Onion', variety: 'Nashik Red', price: 31, unit: '₹/kg', delta: -3.2, mandi: 'Lasalgaon (Nashik)' },
    { crop: 'Rice', variety: 'Sona Masoori', price: 42, unit: '₹/kg', delta: 4.8, mandi: 'Kurnool APMC' },
    { crop: 'Potato', variety: 'Kufri Jyoti', price: 19.5, unit: '₹/kg', delta: 2.1, mandi: 'Agra APMC' },
    { crop: 'Wheat', variety: 'Sharbati Durum', price: 29.5, unit: '₹/kg', delta: 3.2, mandi: 'Khanna Market' },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-agri-950 via-agri-900 to-agri-800 text-white shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-agri-500/20 text-agri-300 border border-agri-500/30 uppercase tracking-wider">
              Farmer Control Center &bull; Kisan Dashboard
            </span>
            <span className="text-xs text-agri-300/80">Kallakurichi / Dharmapuri Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
            Vanakkam, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-agri-200/90 max-w-xl">
            You have {produceList.length} registered produce lots. Cold chain telemetry is normal and today's Koyambedu tomato market is surging (+8.5%).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setShowAiInspector(!showAiInspector)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 backdrop-blur-xs border border-white/15 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{showAiInspector ? 'Hide AI Inspector' : 'AI Quality Test'}</span>
          </button>

          <button
            onClick={onOpenAddProduce}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lift transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>Register Produce</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Produce"
          value={(totalQuantityKg / 1000).toFixed(1)}
          unit="MT"
          change={12.4}
          changeText="vs last harvest"
          icon={<Package className="w-5 h-5 text-agri-700" />}
          variant="agri"
        />

        <StatCard
          title="Available Stock"
          value={(availableStockKg / 1000).toFixed(1)}
          unit="MT"
          icon={<Warehouse className="w-5 h-5 text-cyan-700" />}
          subtext="In cold hubs & silos"
        />

        <StatCard
          title="Sold / Dispatched"
          value={(soldQuantityKg / 1000).toFixed(1)}
          unit="MT"
          change={18.0}
          changeText="Fast clearance"
          icon={<CheckCheck className="w-5 h-5 text-blue-700" />}
        />

        <StatCard
          title="Expected Revenue"
          value={`₹${(expectedRevenue / 100000).toFixed(2)}`}
          unit="Lakhs"
          change={15.2}
          changeText="Arbitrage optimized"
          icon={<DollarSign className="w-5 h-5 text-emerald-700" />}
          variant="agri"
        />

        <StatCard
          title="Active Alerts"
          value="1"
          unit="Notice"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          subtext="Shelf-life warning"
          variant="warning"
          onClick={() => onNavigate('storage')}
        />
      </div>

      {/* Today's Market Snapshot Ribbon */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="font-bold text-slate-900 text-sm font-display">
              Today's Live Mandi Snapshot
            </h3>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">&bull; 07:00 AM APMC Feed</span>
          </div>

          <button
            onClick={() => onNavigate('price-intelligence')}
            className="text-xs font-semibold text-agri-800 hover:text-agri-950 flex items-center gap-1"
          >
            <span>View All Regional Mandis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {marketSnapshot.map((item, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">{item.crop}</span>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                  item.delta >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {item.delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(item.delta)}%
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-slate-900 font-display">
                  ₹{item.price}
                </span>
                <span className="text-[11px] text-slate-500">/kg</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-1">{item.mandi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible / Embedded AI Quality Inspector */}
      {showAiInspector && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <QualityInspector 
            onProduceGraded={(data) => {
              onOpenAddProduce();
            }}
          />
        </div>
      )}

      {/* Produce Stock Inventory Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900 font-display">
              My Produce Batches & Inventory
            </h3>
            <p className="text-xs text-slate-500">
              Active crops registered with digital passports, cold chain states, and market allocations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('produce')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              Full Produce Manager
            </button>
            <button
              onClick={onOpenAddProduce}
              className="px-3.5 py-1.5 rounded-lg bg-agri-800 hover:bg-agri-900 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Lot
            </button>
          </div>
        </div>

        {/* Responsive Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4 font-semibold">Produce ID</th>
                <th className="py-3 px-4 font-semibold">Crop & Variety</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Quality Grade</th>
                <th className="py-3 px-4 font-semibold">Shelf Life</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Market Valuation</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {produceList.slice(0, 6).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-agri-900">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{item.cropName}</span>
                    <span className="text-[11px] text-slate-500">{item.cropVariety}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.quantityKg.toLocaleString('en-IN')} kg
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.qualityGrade} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-semibold ${item.remainingShelfLifeDays <= 4 ? 'text-amber-700' : 'text-slate-700'}`}>
                      {item.remainingShelfLifeDays} / {item.shelfLifeDays} Days
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4 font-display font-semibold text-slate-900">
                    ₹{item.currentMarketPricePerKg}/kg
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedProduceForQR(item)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-agri-800 hover:bg-slate-100 transition-colors"
                      title="View Batch QR Passport"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onViewTraceability(item.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-agri-800 hover:bg-slate-100 transition-colors"
                      title="Inspect Provenance Timeline"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Modal */}
      <QRCodeModal
        produce={selectedProduceForQR}
        isOpen={!!selectedProduceForQR}
        onClose={() => setSelectedProduceForQR(null)}
        onViewTraceability={onViewTraceability}
      />
    </div>
  );
};
