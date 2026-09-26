import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  Truck, 
  Calculator
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MarketPrice } from '../types';

interface PriceIntelligenceProps {
  marketPrices: MarketPrice[];
  onNavigate: (page: string) => void;
}

export const PriceIntelligence: React.FC<PriceIntelligenceProps> = ({
  marketPrices,
  onNavigate
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [timeframe, setTimeframe] = useState<'7d' | '30d'>('7d');

  const filteredPrices = marketPrices.filter((mp) => mp.crop === selectedCrop);
  const primaryRecord = filteredPrices[0] || marketPrices[0];

  const regionalMandiPrices = [
    { city: 'Chennai (Koyambedu)', price: 28, distanceKm: 185, freightPerKg: 1.8, demand: 'High', supply: 'Deficit' },
    { city: 'Madurai (Mattuthavani)', price: 27, distanceKm: 160, freightPerKg: 1.5, demand: 'High', supply: 'Adequate' },
    { city: 'Salem (V.O.C. Market)', price: 24, distanceKm: 45, freightPerKg: 0.6, demand: 'Moderate', supply: 'Surplus' },
    { city: 'Coimbatore (Thyagi Kumaran)', price: 25, distanceKm: 140, freightPerKg: 1.3, demand: 'Moderate', supply: 'Adequate' },
  ];

  const chartData = timeframe === '7d' ? primaryRecord.trend7d : primaryRecord.trend30d;

  // Net realization computation for a 2,000 kg lot
  const lotSizeKg = 2000;
  const localMandiPrice = 24; // Salem
  const bestMandiPrice = 28; // Chennai
  const transportCost = 1.8 * lotSizeKg; // ₹3,600
  const localRevenue = localMandiPrice * lotSizeKg; // ₹48,000
  const remoteRevenue = bestMandiPrice * lotSizeKg; // ₹56,000
  const netAdvantage = remoteRevenue - transportCost - localRevenue; // +₹4,400

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-agri-100 text-agri-800 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-serif">
                APMC Mandi Rate Board & Freight Calculator
              </h1>
              <p className="text-xs text-slate-500">
                Compare morning modal prices across regional terminals with round-trip lorry freight deducted
              </p>
            </div>
          </div>
        </div>

        {/* Commodity Switcher */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {['Tomato', 'Onion', 'Rice', 'Potato', 'Wheat'].map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                selectedCrop === crop
                  ? 'bg-[#1a4129] text-white border-[#1a4129] shadow-2xs'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Net Realization & Freight Spread Panel */}
      <div className="p-6 rounded-2xl bg-[#163020] text-white border border-agri-900">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-agri-200">
                Regional Rate Spread & Freight Worksheet (2,000 kg Lot)
              </span>
            </div>

            <div className="text-[11px] text-stone-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
              <span>Morning 07:00 AM APMC Arrival Rates</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
            Dispatching your {lotSizeKg.toLocaleString('en-IN')} kg {selectedCrop} lot to Chennai Koyambedu yields +₹{netAdvantage.toLocaleString('en-IN')} more than local Salem Mandi after freight.
          </h3>

          {/* Worksheet Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 tabular-nums">
            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[11px] text-stone-300 block">Destination Terminal</span>
              <span className="text-sm font-bold text-white mt-1 block">Chennai Koyambedu</span>
              <span className="text-[10px] text-agri-200">185 km via NH-44</span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[11px] text-stone-300 block">Modal Rate</span>
              <span className="text-base font-bold text-emerald-300 mt-1 block">₹28 / kg</span>
              <span className="text-[10px] text-agri-200">+₹4/kg vs local Salem (₹24)</span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[11px] text-stone-300 block">Reefer Lorry Freight</span>
              <span className="text-base font-bold text-stone-200 mt-1 block">₹3,600</span>
              <span className="text-[10px] text-agri-200">₹1.80/kg crate freight</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
              <span className="text-[11px] text-emerald-200 block font-semibold">Net Gain After Freight</span>
              <span className="text-xl font-extrabold text-emerald-300 mt-0.5 block font-display">
                +₹{netAdvantage.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-200">Direct bank settlement</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-stone-300 max-w-xl">
              Calculated using today’s gate arrival volumes and standard FPO multi-drop reefer tariffs.
            </p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>List Lot for Chennai Buyers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Price Trend Chart & Regional Mandi Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Price History Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-display">
                {selectedCrop} Price Movement & Volatility Curve
              </h3>
              <p className="text-xs text-slate-500">
                Primary terminal: {primaryRecord.mandi} ({primaryRecord.district}, {primaryRecord.state})
              </p>
            </div>

            <div className="inline-flex p-1 rounded-lg bg-slate-100 text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setTimeframe('7d')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  timeframe === '7d' ? 'bg-white text-agri-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeframe('30d')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  timeframe === '30d' ? 'bg-white text-agri-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis unit="₹" stroke="#94a3b8" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <Tooltip
                  formatter={(value: any) => [`₹${value} / kg`, 'Modal Rate']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#15803d' }}
                  activeDot={{ r: 6, stroke: '#15803d', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Indicators row */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[11px]">24h Movement</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +{primaryRecord.changePercent24h}%
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[11px]">Demand Indicator</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{primaryRecord.demandLevel} Demand</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[11px]">Supply Balance</span>
              <span className="font-bold text-rose-700 mt-0.5 block">{primaryRecord.supplyLevel}</span>
            </div>
          </div>
        </div>

        {/* Regional Mandi Comparison Table (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900 font-display">
              Regional Mandi Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Real-time APMC price spread across Tamil Nadu hubs
            </p>
          </div>

          <div className="space-y-3">
            {regionalMandiPrices.map((mandi, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{mandi.city}</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {mandi.distanceKm} km away &bull; Freight: ₹{mandi.freightPerKg}/kg
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-agri-900 font-display">
                    ₹{mandi.price}
                  </span>
                  <span className="text-slate-500 text-[11px]"> / kg</span>
                  <span className={`block text-[10px] font-semibold mt-0.5 ${
                    mandi.supply === 'Deficit' ? 'text-rose-700' : 'text-slate-600'
                  }`}>
                    {mandi.demand} Demand ({mandi.supply})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('transport')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Book Reefer Vehicle to Chennai Mandi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
