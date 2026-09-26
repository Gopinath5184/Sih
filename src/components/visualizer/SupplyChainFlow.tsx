import React, { useState } from 'react';
import { 
  Tractor, 
  Building2, 
  Scale, 
  Warehouse, 
  Factory, 
  Truck, 
  ShoppingCart,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  metric: string;
  metricLabel: string;
  description: string;
  technology: string;
  lossMitigation: string;
}

export const SupplyChainFlow: React.FC<{ onExploreStage?: (stageId: string) => void }> = ({ onExploreStage }) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('storage');

  const stages: Stage[] = [
    {
      id: 'farm',
      name: '1. Farm Harvest',
      subtitle: 'Morning Picking',
      icon: <Tractor className="w-5 h-5 text-emerald-700" />,
      metric: '12,450',
      metricLabel: 'Member Cultivators',
      description: 'Cultivators log harvest lots with crop variety, picking date, and crate count directly from their village.',
      technology: 'Offline-first mobile entry & village lot tagging',
      lossMitigation: 'Cuts field heat exposure and late-picking spoilage by 3.2%'
    },
    {
      id: 'fpo',
      name: '2. FPO Weighbridge',
      subtitle: 'Lot Aggregation',
      icon: <Building2 className="w-5 h-5 text-teal-700" />,
      metric: '328',
      metricLabel: 'Collection Centers',
      description: 'FPO centers weigh incoming crates on digital scales, deduct tare weight, and issue printed weighment slips.',
      technology: 'Electronic weighbridge slip & QR batch label',
      lossMitigation: 'Eliminates manual handling spillage and weight disputes by 2.1%'
    },
    {
      id: 'quality',
      name: '3. Lot Grading',
      subtitle: 'AGMARK Assay',
      icon: <Scale className="w-5 h-5 text-amber-700" />,
      metric: 'Grade A/B',
      metricLabel: 'Standardized Norms',
      description: 'Sample crates are inspected for moisture, firmness, and surface blemish percentage to issue an objective grade.',
      technology: 'Optical sample assay & moisture meter log',
      lossMitigation: 'Prevents mixing bruised or split produce into long-haul lots'
    },
    {
      id: 'storage',
      name: '4. Cold Rooms',
      subtitle: 'Chamber Telemetry',
      icon: <Warehouse className="w-5 h-5 text-cyan-700" />,
      metric: '4.2°C',
      metricLabel: 'Chamber Temp',
      description: 'Pre-cooled cold chambers and ventilated onion godowns log hourly temperature and humidity with keeping-day alerts.',
      technology: 'Chamber temp/RH loggers & early dispatch alerts',
      lossMitigation: 'Prevents rot and premature bulb sprouting by 5.3%'
    },
    {
      id: 'processing',
      name: '5. Processing Hub',
      subtitle: 'Surplus Intake',
      icon: <Factory className="w-5 h-5 text-purple-700" />,
      metric: '28.0%',
      metricLabel: 'Puree Yield',
      description: 'Diverts Grade-B or glut-season produce to nearby processing units for puree, paste, and dehydrated flakes.',
      technology: 'Batch yield accounting & byproduct valorization',
      lossMitigation: 'Recovers 94% of secondary produce that would otherwise be dumped'
    },
    {
      id: 'transport',
      name: '6. Reefer Transit',
      subtitle: 'Insulated Fleet',
      icon: <Truck className="w-5 h-5 text-indigo-700" />,
      metric: '18',
      metricLabel: 'Active Lorries',
      description: 'Refrigerated lorries maintain 4°C–6°C along highway corridors with checkpoint updates and digital delivery receipts.',
      technology: 'GPS route tracking & compartment temp log',
      lossMitigation: 'Reduces highway heat shrinkage and transit bruising by 2.5%'
    },
    {
      id: 'market',
      name: '7. Mandi & Buyers',
      subtitle: 'Escrow Settlement',
      icon: <ShoppingCart className="w-5 h-5 text-blue-700" />,
      metric: '₹18.4 Cr',
      metricLabel: 'Settled Trade',
      description: 'Direct wholesale orders from supermarkets, processors, and terminal APMCs with escrow-backed bank payouts.',
      technology: 'Regional mandi rate spread calculator & escrow',
      lossMitigation: 'Avoids multi-day auction yard delays, saving 2.2% at terminal'
    }
  ];

  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[3];

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-card p-6 md:p-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-agri-800">
            Crate-to-Market Custody Chain
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-serif mt-1">
            How a Harvest Lot Moves Through AgriFlow
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Select any stage below to see how weights, temperatures, and payouts are recorded along the journey
          </p>
        </div>

        <div className="text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 self-start md:self-auto">
          7 Recorded Custody Checkpoints
        </div>
      </div>

      {/* Interactive Flow Nodes */}
      <div className="pt-8 pb-6 overflow-x-auto">
        <div className="min-w-[760px] relative flex items-center justify-between px-4">
          {/* Connecting Path Line */}
          <div className="absolute left-10 right-10 top-7 h-0.5 bg-stone-200 z-0">
            <div 
              className="h-full bg-agri-700 transition-all duration-300"
              style={{
                width: `${(stages.findIndex(s => s.id === selectedStageId) / (stages.length - 1)) * 100}%`
              }}
            />
          </div>

          {stages.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className="relative z-10 flex flex-col items-center group text-center focus:outline-hidden"
              >
                <div 
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#1a4129] text-white shadow-sm ring-4 ring-agri-100'
                      : 'bg-white text-slate-700 border border-stone-300 hover:border-agri-600'
                  }`}
                >
                  <div className={isSelected ? 'text-white' : 'text-slate-700'}>
                    {stage.icon}
                  </div>
                </div>

                <div className="mt-3">
                  <span className={`text-xs font-bold block ${isSelected ? 'text-agri-950' : 'text-slate-800'}`}>
                    {stage.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {stage.subtitle}
                  </span>
                  <span className="mt-1 inline-block text-[10px] font-semibold text-slate-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 tabular-nums">
                    {stage.metric}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep Dive Card */}
      <div className="mt-4 p-6 rounded-xl bg-[#f6f4ee] border border-stone-200/90">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-agri-900 bg-white px-2.5 py-0.5 rounded border border-stone-200">
                Checkpoint Note
              </span>
              <h4 className="text-base font-bold text-slate-900 font-serif">
                {currentStage.name} — {currentStage.subtitle}
              </h4>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {currentStage.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <span className="text-slate-400 block font-medium">Field Record / Method</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{currentStage.technology}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-agri-200/80">
                <span className="text-agri-800 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Spoilage Reduction
                </span>
                <span className="font-semibold text-slate-900 mt-0.5 block">{currentStage.lossMitigation}</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 text-center flex flex-col justify-between h-full">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Recorded Figure</p>
              <p className="text-3xl font-bold text-agri-900 font-serif mt-2 tabular-nums">{currentStage.metric}</p>
              <p className="text-xs font-medium text-slate-600 mt-1">{currentStage.metricLabel}</p>
            </div>

            <button
              onClick={() => onExploreStage && onExploreStage(currentStage.id)}
              className="mt-4 w-full py-2.5 px-3 rounded-lg bg-[#1a4129] hover:bg-agri-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Open {currentStage.subtitle} Desk</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
