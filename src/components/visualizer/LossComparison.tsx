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
import { TrendingDown, ShieldCheck } from 'lucide-react';

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
      { stage: 'Sorting & Crating', traditional: 5.2, agriflow: 2.1, reduction: 3.1 },
      { stage: 'Cold Storage', traditional: 8.5, agriflow: 3.2, reduction: 5.3 },
      { stage: 'Transit', traditional: 4.6, agriflow: 2.1, reduction: 2.5 },
      { stage: 'Mandi Yard', traditional: 3.7, agriflow: 1.5, reduction: 2.2 },
    ],
    onions: [
      { stage: 'Field Curing', traditional: 5.0, agriflow: 2.0, reduction: 3.0 },
      { stage: 'Grading / Bagging', traditional: 3.5, agriflow: 1.5, reduction: 2.0 },
      { stage: 'Chawl Storage', traditional: 14.0, agriflow: 5.5, reduction: 8.5 },
      { stage: 'Long Haul Transit', traditional: 4.0, agriflow: 2.0, reduction: 2.0 },
      { stage: 'Wholesale Yard', traditional: 4.5, agriflow: 1.8, reduction: 2.7 },
    ],
    grains: [
      { stage: 'Combine Threshing', traditional: 3.0, agriflow: 1.2, reduction: 1.8 },
      { stage: 'Yard Drying', traditional: 2.5, agriflow: 0.8, reduction: 1.7 },
      { stage: 'Godown Moisture/Pest', traditional: 5.5, agriflow: 1.5, reduction: 4.0 },
      { stage: 'Bulk Freight', traditional: 2.0, agriflow: 0.7, reduction: 1.3 },
      { stage: 'Mandi Handling', traditional: 1.5, agriflow: 0.5, reduction: 1.0 },
    ]
  };

  const activeData = lossDataByCommodity[commodity];

  const totalTraditional = activeData.reduce((acc, curr) => acc + curr.traditional, 0);
  const totalAgriFlow = activeData.reduce((acc, curr) => acc + curr.agriflow, 0);
  const netSavedPercent = (totalTraditional - totalAgriFlow).toFixed(1);

  const avgProduceValuePerKg = commodity === 'perishables' ? 26 : commodity === 'onions' ? 31 : 38;
  const totalValue100MT = 100000 * avgProduceValuePerKg;
  const traditionalLossValue = (totalValue100MT * totalTraditional) / 100;
  const agriflowLossValue = (totalValue100MT * totalAgriFlow) / 100;
  const savedValue = traditionalLossValue - agriflowLossValue;

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-card p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
            <TrendingDown className="w-3.5 h-3.5" />
            ICAR-CIPHET Benchmark Comparison
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-serif mt-2">
            Post-Harvest Shrinkage: Unmonitored vs. Cold-Chain Managed
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Stage-wise weight and spoilage loss across 100 MT of harvested produce
          </p>
        </div>

        {/* Commodity Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setCommodity('perishables')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              commodity === 'perishables'
                ? 'bg-white text-agri-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tomatoes & Perishables
          </button>
          <button
            onClick={() => setCommodity('onions')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              commodity === 'onions'
                ? 'bg-white text-agri-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Onions & Potatoes
          </button>
          <button
            onClick={() => setCommodity('grains')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              commodity === 'grains'
                ? 'bg-white text-agri-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paddy & Wheat
          </button>
        </div>
      </div>

      {/* High-level KPI Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 tabular-nums">
        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/70">
          <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider block">Open-Truck & Uncooled Chain</span>
          <span className="text-2xl md:text-3xl font-bold text-rose-950 font-serif mt-1 block">
            {totalTraditional.toFixed(1)}%
          </span>
          <span className="text-xs text-rose-800 mt-0.5 block">
            ₹{(traditionalLossValue / 100000).toFixed(2)} Lakhs lost per 100 MT
          </span>
        </div>

        <div className="p-4 rounded-xl bg-agri-50/80 border border-agri-200/80">
          <span className="text-xs font-semibold text-agri-900 uppercase tracking-wider block">Pre-Cooled & Assayed Chain</span>
          <span className="text-2xl md:text-3xl font-bold text-agri-950 font-serif mt-1 block">
            {totalAgriFlow.toFixed(1)}%
          </span>
          <span className="text-xs text-agri-800 mt-0.5 block">
            ₹{(agriflowLossValue / 100000).toFixed(2)} Lakhs lost per 100 MT
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#1a4129] text-white">
          <span className="text-xs font-semibold text-agri-200 uppercase tracking-wider block">Net Harvest Retained</span>
          <span className="text-2xl md:text-3xl font-bold text-white font-serif mt-1 block">
            +{netSavedPercent}% Weight
          </span>
          <span className="text-xs text-agri-200 mt-0.5 block">
            ₹{(savedValue / 100000).toFixed(2)} Lakhs preserved per 100 MT
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
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#57534e' }} stroke="#d6d3d1" />
            <YAxis unit="%" tick={{ fontSize: 11, fill: '#57534e' }} stroke="#d6d3d1" />
            <Tooltip 
              formatter={(value: any) => [`${value}% loss`, '']}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="traditional" name="Conventional Open Chain" fill="#e11d48" radius={[4, 4, 0, 0]} />
            <Bar dataKey="agriflow" name="FPO Cold-Chain Managed" fill="#1a4129" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Explanatory footer banner */}
      <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-5 h-5 text-agri-800 shrink-0" />
          <span>
            Savings achieved through <strong>plastic crate field sorting</strong>, <strong>4°C chamber pre-cooling</strong>, and <strong>direct FPO-to-processor diversion</strong> of Grade-B lots.
          </span>
        </div>
        <span className="text-[11px] font-mono text-stone-500 shrink-0">
          Reference: ICAR-CIPHET Post-Harvest Loss Norms
        </span>
      </div>
    </div>
  );
};
