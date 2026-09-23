import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { TrendingDown, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

interface StageLossData {
  stage: string;
  traditional: number;
  agriflow: number;
  reduction: number;
}

export const LossComparison: React.FC = () => {
  const [commodity, setCommodity] = useState<'perishables' | 'onions' | 'grains'>('perishables');

  const lossDataByCommodity: Record<string, StageLossData[]> = {
    perishables: [
      { stage: 'Harvesting', traditional: 4.8, agriflow: 1.6, reduction: 3.2 },
      { stage: 'Sorting & Handling', traditional: 5.2, agriflow: 2.1, reduction: 3.1 },
      { stage: 'Storage & Cold Chain', traditional: 8.5, agriflow: 3.2, reduction: 5.3 },
      { stage: 'Transportation', traditional: 4.6, agriflow: 2.1, reduction: 2.5 },
      { stage: 'Mandi / Terminal', traditional: 3.7, agriflow: 1.5, reduction: 2.2 },
    ],
    onions: [
      { stage: 'Field Curing', traditional: 5.0, agriflow: 2.0, reduction: 3.0 },
      { stage: 'Grading / Bagging', traditional: 3.5, agriflow: 1.5, reduction: 2.0 },
      { stage: 'Traditional Chawl Storage', traditional: 14.0, agriflow: 5.5, reduction: 8.5 },
      { stage: 'Long Haul Transit', traditional: 4.0, agriflow: 2.0, reduction: 2.0 },
      { stage: 'Wholesale Yard Rot', traditional: 4.5, agriflow: 1.8, reduction: 2.7 },
    ],
    grains: [
      { stage: 'Combine Harvest Threshing', traditional: 3.0, agriflow: 1.2, reduction: 1.8 },
      { stage: 'Open Yard Drying', traditional: 2.5, agriflow: 0.8, reduction: 1.7 },
      { stage: 'Godown Pest Damage', traditional: 5.5, agriflow: 1.5, reduction: 4.0 },
      { stage: 'Bulk Freight Spillage', traditional: 2.0, agriflow: 0.7, reduction: 1.3 },
      { stage: 'Mandi Bag Tears', traditional: 1.5, agriflow: 0.5, reduction: 1.0 },
    ]
  };

  const activeData = lossDataByCommodity[commodity];

  const totalTraditional = activeData.reduce((acc, curr) => acc + curr.traditional, 0);
  const totalAgriFlow = activeData.reduce((acc, curr) => acc + curr.agriflow, 0);
  const netSavedPercent = (totalTraditional - totalAgriFlow).toFixed(1);

  // Example economic value calculation for 100 MT produce
  const avgProduceValuePerKg = commodity === 'perishables' ? 26 : commodity === 'onions' ? 31 : 38;
  const totalValue100MT = 100000 * avgProduceValuePerKg; // 100,000 kg * price
  const traditionalLossValue = (totalValue100MT * totalTraditional) / 100;
  const agriflowLossValue = (totalValue100MT * totalAgriFlow) / 100;
  const savedValue = traditionalLossValue - agriflowLossValue;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            <TrendingDown className="w-3.5 h-3.5" />
            Quantifiable Impact Analysis
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display mt-2">
            Post-Harvest Loss: Traditional vs. AgriFlow
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Data-backed simulation comparing conventional fragmented marketing versus digital cold-chain orchestration
          </p>
        </div>

        {/* Commodity Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setCommodity('perishables')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              commodity === 'perishables'
                ? 'bg-white text-agri-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Perishables (Tomatoes)
          </button>
          <button
            onClick={() => setCommodity('onions')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              commodity === 'onions'
                ? 'bg-white text-agri-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semi-Perishables (Onion/Potato)
          </button>
          <button
            onClick={() => setCommodity('grains')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              commodity === 'grains'
                ? 'bg-white text-agri-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foodgrains (Rice/Wheat)
          </button>
        </div>
      </div>

      {/* High-level KPI Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/70">
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider block">Traditional Supply Chain</span>
          <span className="text-2xl md:text-3xl font-bold text-rose-950 font-display mt-1 block">
            {totalTraditional.toFixed(1)}%
          </span>
          <span className="text-xs text-rose-700 mt-0.5 block">
            ₹{(traditionalLossValue / 100000).toFixed(2)} Lakhs lost per 100 MT
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">AgriFlow Monitored Chain</span>
          <span className="text-2xl md:text-3xl font-bold text-emerald-950 font-display mt-1 block">
            {totalAgriFlow.toFixed(1)}%
          </span>
          <span className="text-xs text-emerald-700 mt-0.5 block">
            ₹{(agriflowLossValue / 100000).toFixed(2)} Lakhs lost per 100 MT
          </span>
        </div>

        <div className="p-4 rounded-xl bg-agri-900 text-white shadow-xs">
          <span className="text-xs font-semibold text-agri-200 uppercase tracking-wider block">Net Revenue Recovered</span>
          <span className="text-2xl md:text-3xl font-bold text-white font-display mt-1 block">
            +{netSavedPercent}% Produce
          </span>
          <span className="text-xs text-agri-200 mt-0.5 block">
            ₹{(savedValue / 100000).toFixed(2)} Lakhs direct farmer recovery
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activeData}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
            <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
            <Tooltip 
              formatter={(value: any) => [`${value}% loss`, '']}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="traditional" name="Traditional Supply Chain" fill="#f87171" radius={[4, 4, 0, 0]} />
            <Bar dataKey="agriflow" name="AgriFlow Assisted Chain" fill="#15803d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Explanatory footer banner */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-5 h-5 text-agri-700 shrink-0" />
          <span>
            Primary savings driven by <strong>continuous cold chain monitoring</strong>, <strong>AI shelf-life warnings</strong>, and <strong>direct FPO-to-processor diversion</strong> before spoilage occurs.
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 shrink-0">
          Source: ICAR-CIPHET Post-Harvest Studies & AgriFlow Field Simulation
        </span>
      </div>
    </div>
  );
};
