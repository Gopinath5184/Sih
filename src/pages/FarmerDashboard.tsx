import React, { useState } from 'react';
import { 
  Package, 
  Warehouse, 
  CheckCheck, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Scale, 
  QrCode, 
  ArrowRight, 
  Eye, 
  AlertTriangle
} from 'lucide-react';
import { Produce, MarketPrice, UserSession } from '../types';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { QualityInspector } from '../components/ai/QualityInspector';
import { QRCodeModal } from '../components/common/QRCodeModal';

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
  currentUser,
  onNavigate,
  onOpenAddProduce,
  onViewTraceability
}) => {
  const [selectedProduceForQR, setSelectedProduceForQR] = useState<Produce | null>(null);
  const [showAssayDesk, setShowAssayDesk] = useState<boolean>(false);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#163020] text-white border border-agri-900">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-agri-200">
            <span className="font-semibold uppercase tracking-wider">Cultivator Ledger</span>
            <span>•</span>
            <span>{currentUser.organization || 'Dharmapuri Horti FPO'} ({currentUser.location})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">
            Vanakkam, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200/90 max-w-xl">
            You have {produceList.length} active harvest lots recorded. Cold storage chambers in Kallakurichi are holding steady at 4.2°C, and Chennai Koyambedu tomato rates are up +8.5% this morning.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setShowAssayDesk(!showAssayDesk)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-2 border border-white/15 transition-colors"
          >
            <Scale className="w-4 h-4 text-agri-200" />
            <span>{showAssayDesk ? 'Close Grading Desk' : 'Lot Grading & Assay'}</span>
          </button>

          <button
            onClick={onOpenAddProduce}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Register Harvest Lot</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 tabular-nums">
        <StatCard
          title="Total Harvested"
          value={(totalQuantityKg / 1000).toFixed(1)}
          unit="MT"
          change={12.4}
          changeText="vs last season"
          icon={<Package className="w-5 h-5 text-agri-700" />}
          variant="agri"
        />

        <StatCard
          title="In Cold Rooms / Silos"
          value={(availableStockKg / 1000).toFixed(1)}
          unit="MT"
          icon={<Warehouse className="w-5 h-5 text-cyan-700" />}
          subtext="Ready for dispatch"
        />

        <StatCard
          title="Sold & Dispatched"
          value={(soldQuantityKg / 1000).toFixed(1)}
          unit="MT"
          change={18.0}
          changeText="Settled via escrow"
          icon={<CheckCheck className="w-5 h-5 text-blue-700" />}
        />

        <StatCard
          title="Estimated Realization"
          value={`₹${(expectedRevenue / 100000).toFixed(2)}`}
          unit="Lakhs"
          change={15.2}
          changeText="At current modal rates"
          icon={<DollarSign className="w-5 h-5 text-emerald-700" />}
          variant="agri"
        />

        <StatCard
          title="Storage Notices"
          value="1"
          unit="Lot"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          subtext="4 days keeping life left"
          variant="warning"
          onClick={() => onNavigate('storage')}
        />
      </div>

      {/* Today's Market Snapshot Ribbon */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-agri-700" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Morning APMC Modal Rates
            </h3>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">&bull; 07:00 AM Bulletin</span>
          </div>

          <button
            onClick={() => onNavigate('price-intelligence')}
            className="text-xs font-semibold text-agri-800 hover:text-agri-950 flex items-center gap-1"
          >
            <span>Compare Regional Mandis & Freight</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 tabular-nums">
          {marketSnapshot.map((item, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors"
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
              <p className="text-[10px] text-slate-500 truncate mt-1">{item.mandi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Lot Grading & Assay Desk */}
      {showAssayDesk && (
        <div className="animate-in fade-in duration-200">
          <QualityInspector 
            onProduceGraded={() => {
              onOpenAddProduce();
            }}
          />
        </div>
      )}

      {/* Produce Stock Inventory Table */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900 font-serif">
              Registered Harvest Lots & Weighbridge Receipts
            </h3>
            <p className="text-xs text-slate-500">
              Lots logged with FPO weighment slips, AGMARK grades, and cold-room bay assignments
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('produce')}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-slate-700 hover:bg-stone-50 text-xs font-semibold"
            >
              Full Lot Register
            </button>
            <button
              onClick={onOpenAddProduce}
              className="px-3.5 py-1.5 rounded-lg bg-[#1a4129] hover:bg-agri-900 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Lot
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tabular-nums">
            <thead>
              <tr className="bg-stone-50 text-slate-500 border-b border-stone-200">
                <th className="py-3 px-4 font-semibold">Lot ID</th>
                <th className="py-3 px-4 font-semibold">Crop & Variety</th>
                <th className="py-3 px-4 font-semibold">Net Weight</th>
                <th className="py-3 px-4 font-semibold">AGMARK Grade</th>
                <th className="py-3 px-4 font-semibold">Keeping Life</th>
                <th className="py-3 px-4 font-semibold">Current Stage</th>
                <th className="py-3 px-4 font-semibold">Modal Rate</th>
                <th className="py-3 px-4 font-semibold text-right">Pass & Trace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {produceList.slice(0, 6).map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
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
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => setSelectedProduceForQR(item)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-agri-800 hover:bg-stone-100 transition-colors"
                      title="View Batch QR Sticker"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onViewTraceability(item.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-agri-800 hover:bg-stone-100 transition-colors"
                      title="Inspect Custody Log"
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
