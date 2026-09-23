import React, { useState } from 'react';
import { 
  Landmark, 
  MapPin, 
  TrendingDown, 
  Warehouse, 
  Users, 
  DollarSign, 
  Factory, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { UserSession } from '../types';

interface AdminGovDashboardProps {
  currentUser: UserSession;
  onNavigate: (page: string) => void;
}

interface StateAgriProfile {
  state: string;
  farmers: number;
  produceManagedCr: number;
  lossRate: number;
  lossReduction: number;
  storageCapacityMT: number;
  storageOccupancyPercent: number;
  primaryCrops: string[];
  status: 'Surplus' | 'Adequate' | 'High Deficit';
}

export const AdminGovDashboard: React.FC<AdminGovDashboardProps> = ({
  currentUser,
  onNavigate
}) => {
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');

  // Realistic sample Indian state data explicitly labeled as DEMO DATA (Section 20)
  const stateProfiles: StateAgriProfile[] = [
    {
      state: 'Tamil Nadu',
      farmers: 3850,
      produceManagedCr: 5.2,
      lossRate: 11.4,
      lossReduction: 15.2,
      storageCapacityMT: 85000,
      storageOccupancyPercent: 78,
      primaryCrops: ['Tomato', 'Banana', 'Rice', 'Groundnut'],
      status: 'Adequate'
    },
    {
      state: 'Maharashtra',
      farmers: 2940,
      produceManagedCr: 4.8,
      lossRate: 12.8,
      lossReduction: 14.5,
      storageCapacityMT: 120000,
      storageOccupancyPercent: 84,
      primaryCrops: ['Onion', 'Mango (Alphonso)', 'Sugarcane', 'Cotton'],
      status: 'Surplus'
    },
    {
      state: 'Karnataka',
      farmers: 1820,
      produceManagedCr: 2.9,
      lossRate: 11.8,
      lossReduction: 13.9,
      storageCapacityMT: 65000,
      storageOccupancyPercent: 72,
      primaryCrops: ['Rice (Sona Masoori)', 'Tomato', 'Maize', 'Coffee'],
      status: 'Adequate'
    },
    {
      state: 'Andhra Pradesh',
      farmers: 1410,
      produceManagedCr: 2.4,
      lossRate: 12.2,
      lossReduction: 14.1,
      storageCapacityMT: 75000,
      storageOccupancyPercent: 68,
      primaryCrops: ['Cotton (MCU-5)', 'Chilli', 'Rice', 'Mango'],
      status: 'Adequate'
    },
    {
      state: 'Punjab',
      farmers: 980,
      produceManagedCr: 1.8,
      lossRate: 8.2,
      lossReduction: 9.4,
      storageCapacityMT: 180000,
      storageOccupancyPercent: 91,
      primaryCrops: ['Wheat (Sharbati)', 'Paddy', 'Mustard'],
      status: 'Surplus'
    },
    {
      state: 'Uttar Pradesh',
      farmers: 1120,
      produceManagedCr: 1.9,
      lossRate: 14.2,
      lossReduction: 13.1,
      storageCapacityMT: 145000,
      storageOccupancyPercent: 86,
      primaryCrops: ['Potato (Kufri Jyoti)', 'Sugarcane', 'Wheat'],
      status: 'Adequate'
    },
    {
      state: 'Kerala',
      farmers: 450,
      produceManagedCr: 0.8,
      lossRate: 13.0,
      lossReduction: 12.5,
      storageCapacityMT: 35000,
      storageOccupancyPercent: 64,
      primaryCrops: ['Spices', 'Coconut', 'Rubber', 'Banana'],
      status: 'High Deficit'
    },
    {
      state: 'Telangana',
      farmers: 680,
      produceManagedCr: 1.1,
      lossRate: 12.5,
      lossReduction: 13.6,
      storageCapacityMT: 52000,
      storageOccupancyPercent: 70,
      primaryCrops: ['Cotton', 'Red Gram', 'Rice', 'Turmeric'],
      status: 'Adequate'
    }
  ];

  const activeStateData = stateProfiles.find((s) => s.state === selectedState) || stateProfiles[0];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header with clear DEMO DATA badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-100 text-purple-800 rounded-xl">
              <Landmark className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                National Agricultural Oversight & Macro Analytics
              </h1>
              <p className="text-xs text-slate-500">
                Ministry of Agriculture & State APMC Marketing Board Decision Support Portal
              </p>
            </div>
          </div>
        </div>

        {/* DEMO DATA badge explicitly required by Section 20 */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold self-start sm:self-auto">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
          <span>DEMO DATA &bull; SIH Prototype Simulation</span>
        </div>
      </div>

      {/* Top 6 Macro Government Metrics (Section 20) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Farmers Registered"
          value="12,450"
          unit="Kisan"
          change={18.4}
          icon={<Users className="w-4 h-4 text-emerald-700" />}
          variant="agri"
        />

        <StatCard
          title="Produce Managed"
          value="₹18.4"
          unit="Cr"
          change={22.1}
          icon={<DollarSign className="w-4 h-4 text-agri-700" />}
          variant="agri"
        />

        <StatCard
          title="Storage Utilization"
          value="78.4%"
          unit="National"
          icon={<Warehouse className="w-4 h-4 text-cyan-700" />}
          subtext="652,000 MT capacity"
        />

        <StatCard
          title="Processing Volume"
          value="2,840"
          unit="MT"
          icon={<Factory className="w-4 h-4 text-purple-700" />}
          subtext="Value added"
        />

        <StatCard
          title="Market Transactions"
          value="3,410"
          unit="Trades"
          icon={<BarChart3 className="w-4 h-4 text-blue-700" />}
          subtext="Zero middleman delays"
        />

        <StatCard
          title="Post-Harvest Loss"
          value="12.0%"
          unit="Index"
          change={-14.8}
          changeText="vs 26.8% benchmark"
          icon={<TrendingDown className="w-4 h-4 text-rose-600" />}
          variant="agri"
        />
      </div>

      {/* Map-Style Regional State Activity Matrix (Section 20: Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala, Maharashtra, Punjab, UP) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              State-Wise Agriculture Heatmap
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display mt-1">
              Inter-State Agricultural Performance & Cold Storage Distribution
            </h3>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Source: AgriFlow National Ingress Stream (Demo Data)
          </span>
        </div>

        {/* State Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stateProfiles.map((item) => {
            const isSelected = item.state === selectedState;
            return (
              <div
                key={item.state}
                onClick={() => setSelectedState(item.state)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-600 ring-2 ring-purple-500/20 bg-purple-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 font-display">{item.state}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Surplus' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : item.status === 'Adequate' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Farmers:</span>
                      <span className="font-bold text-slate-800">{item.farmers.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Trade Volume:</span>
                      <span className="font-bold text-slate-900">₹{item.produceManagedCr} Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Loss Rate:</span>
                      <span className="font-bold text-emerald-800 font-mono">{item.lossRate}% (-{item.lossReduction}%)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1">
                  {item.primaryCrops.map((c, i) => (
                    <span key={i} className="text-[10px] font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                      {c.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected State Detailed Deep Dive */}
        {activeStateData && (
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 font-display">
                {activeStateData.state} Infrastructure & Buffer Stock Audit
              </h4>
              <span className="font-mono text-purple-900 font-semibold">
                Storage: {activeStateData.storageOccupancyPercent}% Occupied ({activeStateData.storageCapacityMT.toLocaleString('en-IN')} MT total)
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              AgriFlow monitors active mandi arrivals and cold chain temperature continuity across {activeStateData.state}. Post-harvest losses have dropped by {activeStateData.lossReduction}% through automated redirection of ripening lots into processing clusters.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigate('post-harvest-loss')}
                className="px-3.5 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs"
              >
                Inspect State Loss Analytics
              </button>
              <button
                onClick={() => onNavigate('schemes')}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs"
              >
                View AIF Scheme Allocations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
