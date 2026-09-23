import React from 'react';
import { 
  Activity, 
  TrendingDown, 
  ShieldCheck, 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Zap,
  BarChart2
} from 'lucide-react';
import { LossComparison } from '../components/visualizer/LossComparison';
import { StatCard } from '../components/common/StatCard';

interface PostHarvestLossProps {
  onNavigate: (page: string) => void;
}

export const PostHarvestLoss: React.FC<PostHarvestLossProps> = ({ onNavigate }) => {
  const stageBreakdowns = [
    {
      stage: '1. Harvesting Stage',
      traditionalLoss: '4.8%',
      agriflowLoss: '1.6%',
      mitigation: 'Weather-aligned harvest scheduling via AgriGuide AI & morning picking protocols.',
      saved: '3.2% Recovered'
    },
    {
      stage: '2. Handling & Sorting',
      traditionalLoss: '5.2%',
      agriflowLoss: '2.1%',
      mitigation: 'Computer-vision grading eliminates rough handling and prevents mixing rot-damaged fruits.',
      saved: '3.1% Recovered'
    },
    {
      stage: '3. Storage & Cold Chain',
      traditionalLoss: '8.5%',
      agriflowLoss: '3.2%',
      mitigation: 'Precision temperature/RH IoT telemetry and predictive shelf-life expiry alerts.',
      saved: '5.3% Recovered'
    },
    {
      stage: '4. Long-Haul Transport',
      traditionalLoss: '4.6%',
      agriflowLoss: '2.1%',
      mitigation: 'Refrigerated container tracking with GPS geofencing and zero-break thermal logs.',
      saved: '2.5% Recovered'
    },
    {
      stage: '5. Mandi & Retail Handoff',
      traditionalLoss: '3.7%',
      agriflowLoss: '1.5%',
      mitigation: 'Pre-matched B2B purchase orders avoiding 4-day mandi yard dumping delays.',
      saved: '2.2% Recovered'
    },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-100 text-rose-800 rounded-xl">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Post-Harvest Loss Intelligence
              </h1>
              <p className="text-xs text-slate-500">
                Quantifiable food loss mitigation across every node of the agricultural produce supply chain
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>National Target: 50% Reduction in Post-Harvest Decay</span>
        </div>
      </div>

      {/* Top 4 KPI Cards (Section 13) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Produce Managed"
          value="18,420"
          unit="MT"
          icon={<BarChart2 className="w-5 h-5 text-slate-700" />}
          subtext="Season 2026 cumulative"
        />

        <StatCard
          title="Estimated Traditional Loss"
          value="4,936"
          unit="MT"
          icon={<TrendingDown className="w-5 h-5 text-rose-600" />}
          subtext="26.8% unmonitored benchmark"
          variant="warning"
        />

        <StatCard
          title="Recovered Value"
          value="₹4.62"
          unit="Cr"
          change={14.8}
          changeText="Produce saved"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
          variant="agri"
        />

        <StatCard
          title="AgriFlow Loss Rate"
          value="12.0%"
          unit="Rate"
          change={-14.8}
          changeText="Reduction from 26.8%"
          icon={<Zap className="w-5 h-5 text-agri-700" />}
          variant="agri"
        />
      </div>

      {/* Visual Loss Highway Pipeline (Harvest -> Handling -> Storage -> Transport -> Market) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            Cumulative Attrition Breakdown
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-display mt-2">
            The 5 Leakage Points in India's Fresh Produce Highway
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            How AgriFlow closes each structural leak to retain 88% of harvested value
          </p>
        </div>

        <div className="space-y-4">
          {stageBreakdowns.map((step, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm font-display">{step.stage}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {step.saved}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{step.mitigation}</p>
              </div>

              <div className="flex items-center gap-6 shrink-0 text-right">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Traditional</span>
                  <span className="text-sm font-bold text-rose-700 font-mono line-through">
                    {step.traditionalLoss}
                  </span>
                </div>

                <div className="text-slate-300">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">AgriFlow</span>
                  <span className="text-base font-extrabold text-emerald-800 font-mono">
                    {step.agriflowLoss}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Deep Interactive Loss Comparison Charts */}
      <LossComparison />
    </div>
  );
};
