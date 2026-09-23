import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Package, 
  Warehouse, 
  CheckCheck, 
  Plus, 
  Search, 
  Printer, 
  DollarSign,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  X
} from 'lucide-react';
import { Produce, UserSession } from '../types';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { stateService } from '../services/stateService';

interface FpoDashboardProps {
  produceList: Produce[];
  currentUser: UserSession;
  onNavigate: (page: string) => void;
  onViewTraceability: (produceId: string) => void;
}

interface InwardCollectionRecord {
  receiptId: string;
  farmerName: string;
  crop: string;
  variety: string;
  weightGrossKg: number;
  tareWeightKg: number;
  netWeightKg: number;
  grade: 'A' | 'B' | 'C';
  pricePerKg: number;
  totalPayout: number;
  date: string;
  status: 'Weighed & Stored' | 'Pending Grading' | 'Paid';
}

export const FpoDashboard: React.FC<FpoDashboardProps> = ({
  produceList,
  currentUser,
  onNavigate,
  onViewTraceability
}) => {
  const [isWeighbridgeModalOpen, setIsWeighbridgeModalOpen] = useState(false);
  const [receiptSuccess, setReceiptSuccess] = useState<InwardCollectionRecord | null>(null);

  // Weighbridge Form
  const [wbFarmerName, setWbFarmerName] = useState('K. Murugesan');
  const [wbCrop, setWbCrop] = useState('Tomato');
  const [wbVariety, setWbVariety] = useState('Sivam Hybrid');
  const [wbGrossKg, setWbGrossKg] = useState<number>(2580);
  const [wbTareKg, setWbTareKg] = useState<number>(80);
  const [wbGrade, setWbGrade] = useState<'A' | 'B' | 'C'>('A');
  const [wbPricePerKg, setWbPricePerKg] = useState<number>(26);

  const [inwardRecords, setInwardRecords] = useState<InwardCollectionRecord[]>([
    {
      receiptId: 'WB-2026-8812',
      farmerName: 'K. Murugesan',
      crop: 'Tomato',
      variety: 'Sivam Hybrid',
      weightGrossKg: 2580,
      tareWeightKg: 80,
      netWeightKg: 2500,
      grade: 'A',
      pricePerKg: 26,
      totalPayout: 65000,
      date: 'Today, 09:30 AM',
      status: 'Weighed & Stored'
    },
    {
      receiptId: 'WB-2026-8811',
      farmerName: 'M. Selvaraj',
      crop: 'Banana',
      variety: 'Grand Naine G9',
      weightGrossKg: 3620,
      tareWeightKg: 120,
      netWeightKg: 3500,
      grade: 'A',
      pricePerKg: 24,
      totalPayout: 84000,
      date: 'Today, 08:15 AM',
      status: 'Weighed & Stored'
    },
    {
      receiptId: 'WB-2026-8809',
      farmerName: 'S. Ramanathan',
      crop: 'Onion',
      variety: 'Bellary Medium',
      weightGrossKg: 4100,
      tareWeightKg: 100,
      netWeightKg: 4000,
      grade: 'B',
      pricePerKg: 28,
      totalPayout: 112000,
      date: 'Yesterday, 05:40 PM',
      status: 'Paid'
    }
  ]);

  const handleCreateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    const net = wbGrossKg - wbTareKg;
    const payout = net * wbPricePerKg;
    const newRecord: InwardCollectionRecord = {
      receiptId: `WB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: wbFarmerName,
      crop: wbCrop,
      variety: wbVariety,
      weightGrossKg: wbGrossKg,
      tareWeightKg: wbTareKg,
      netWeightKg: net,
      grade: wbGrade,
      pricePerKg: wbPricePerKg,
      totalPayout: payout,
      date: 'Just now',
      status: 'Weighed & Stored'
    };

    setInwardRecords([newRecord, ...inwardRecords]);
    setReceiptSuccess(newRecord);
  };

  const totalRegisteredFarmers = 420;
  const todayCollectionKg = inwardRecords.reduce((acc, r) => acc + r.netWeightKg, 0);
  const totalInventoryKg = produceList.reduce((acc, p) => acc + p.quantityKg, 0);
  const pendingOrdersCount = 2;

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-teal-100 text-teal-800 rounded-xl">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                FPO & Collection Center Hub
              </h1>
              <p className="text-xs text-slate-500">
                Farmer producer collective aggregation, weighbridge ticket issuance, and bulk institutional contracting
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsWeighbridgeModalOpen(true);
            setReceiptSuccess(null);
          }}
          className="px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Weighbridge Ticket</span>
        </button>
      </div>

      {/* 4 KPIs for FPO (Section 18) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Member Farmers"
          value={totalRegisteredFarmers}
          unit="Cultivators"
          change={8.5}
          changeText="Active members"
          icon={<Users className="w-5 h-5 text-teal-700" />}
        />

        <StatCard
          title="Today's Collection"
          value={(todayCollectionKg / 1000).toFixed(1)}
          unit="MT"
          change={15.0}
          changeText="Inward flow"
          icon={<Package className="w-5 h-5 text-emerald-600" />}
          variant="agri"
        />

        <StatCard
          title="Total Aggregated Inventory"
          value={(totalInventoryKg / 1000).toFixed(1)}
          unit="MT"
          icon={<Warehouse className="w-5 h-5 text-cyan-700" />}
          subtext="In Kallakurichi cold store"
        />

        <StatCard
          title="Pending Bulk Orders"
          value={pendingOrdersCount}
          unit="Contracts"
          icon={<DollarSign className="w-5 h-5 text-amber-600" />}
          subtext="FreshMart Supermarkets"
          variant="warning"
          onClick={() => onNavigate('marketplace')}
        />
      </div>

      {/* Collection Table (Section 18) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Today's Inward Produce Collection Log
            </h3>
            <p className="text-xs text-slate-500">
              Electronic weighbridge receipts and fair-price farmer disbursements
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Weighbridge #1 Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4 font-semibold">Ticket ID</th>
                <th className="py-3 px-4 font-semibold">Farmer Name</th>
                <th className="py-3 px-4 font-semibold">Crop & Variety</th>
                <th className="py-3 px-4 font-semibold">Gross / Tare</th>
                <th className="py-3 px-4 font-semibold">Net Weight</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Settlement Rate</th>
                <th className="py-3 px-4 font-semibold">Total Payout</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inwardRecords.map((r) => (
                <tr key={r.receiptId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{r.receiptId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{r.farmerName}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{r.crop}</span>
                    <span className="text-[11px] text-slate-400">{r.variety}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {r.weightGrossKg} / {r.tareWeightKg} kg
                  </td>
                  <td className="py-3 px-4 font-extrabold text-slate-900 font-display">
                    {r.netWeightKg.toLocaleString('en-IN')} kg
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={r.grade} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    ₹{r.pricePerKg}/kg
                  </td>
                  <td className="py-3 px-4 font-extrabold text-agri-900 font-display">
                    ₹{r.totalPayout.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weighbridge Modal */}
      {isWeighbridgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">Electronic Weighbridge Receipt</h3>
                <p className="text-xs text-teal-200/90">Inward produce weighment and instant ticket</p>
              </div>
              <button 
                onClick={() => setIsWeighbridgeModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {receiptSuccess ? (
              <div className="p-6 text-center space-y-4 text-xs">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-slate-900 font-display">
                  Weighment Ticket Generated!
                </h4>
                <p className="font-mono font-bold text-slate-800">{receiptSuccess.receiptId}</p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1">
                  <p><strong>Farmer:</strong> {receiptSuccess.farmerName}</p>
                  <p><strong>Net Produce:</strong> {receiptSuccess.netWeightKg} kg {receiptSuccess.crop}</p>
                  <p><strong>Gross Payout:</strong> ₹{receiptSuccess.totalPayout.toLocaleString('en-IN')} (Direct Bank Transfer)</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                  >
                    Print Weighment Slip
                  </button>
                  <button
                    onClick={() => setIsWeighbridgeModalOpen(false)}
                    className="flex-1 py-2 rounded-lg bg-teal-800 text-white font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateReceipt} className="p-6 space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Farmer Name</label>
                  <input
                    type="text"
                    value={wbFarmerName}
                    onChange={(e) => setWbFarmerName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Crop</label>
                    <select
                      value={wbCrop}
                      onChange={(e) => setWbCrop(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    >
                      <option value="Tomato">Tomato</option>
                      <option value="Onion">Onion</option>
                      <option value="Banana">Banana</option>
                      <option value="Potato">Potato</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Variety</label>
                    <input
                      type="text"
                      value={wbVariety}
                      onChange={(e) => setWbVariety(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Gross Weight (kg)</label>
                    <input
                      type="number"
                      value={wbGrossKg}
                      onChange={(e) => setWbGrossKg(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tare / Crate (kg)</label>
                    <input
                      type="number"
                      value={wbTareKg}
                      onChange={(e) => setWbTareKg(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Quality Grade</label>
                    <select
                      value={wbGrade}
                      onChange={(e) => setWbGrade(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                    >
                      <option value="A">Grade A</option>
                      <option value="B">Grade B</option>
                      <option value="C">Grade C</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Agreed Price (₹/kg)</label>
                    <input
                      type="number"
                      value={wbPricePerKg}
                      onChange={(e) => setWbPricePerKg(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 flex justify-between font-semibold">
                  <span>Net Produce: <strong>{wbGrossKg - wbTareKg} kg</strong></span>
                  <span>Payout: <strong>₹{((wbGrossKg - wbTareKg) * wbPricePerKg).toLocaleString('en-IN')}</strong></span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsWeighbridgeModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-bold shadow-xs"
                  >
                    Generate Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
