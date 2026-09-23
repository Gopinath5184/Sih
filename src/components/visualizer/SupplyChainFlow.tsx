import React, { useState } from 'react';
import { 
  Tractor, 
  Building2, 
  Sparkles, 
  Warehouse, 
  Factory, 
  Truck, 
  ShoppingCart,
  ChevronRight,
  Info,
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
      name: 'Farm Harvest',
      subtitle: 'Precision Harvesting',
      icon: <Tractor className="w-5 h-5 text-emerald-700" />,
      metric: '12,450',
      metricLabel: 'Active Farmers',
      description: 'Farmers register harvest lots with crop variety, maturity index, and estimated yield directly from the field.',
      technology: 'Mobile offline sync, GPS geofencing, harvest date stamping',
      lossMitigation: 'Reduces improper harvest timing losses by 3.2%'
    },
    {
      id: 'fpo',
      name: 'Collection / FPO',
      subtitle: 'Aggregation Hubs',
      icon: <Building2 className="w-5 h-5 text-teal-700" />,
      metric: '328',
      metricLabel: 'Collection Centers',
      description: 'Primary agricultural cooperative hubs aggregate smaller farm lots, issue electronic weighbridge receipts, and lot-seal produce.',
      technology: 'Automated weighbridge integration, lot barcode labeling',
      lossMitigation: 'Eliminates unmeasured handling spillage by 2.1%'
    },
    {
      id: 'quality',
      name: 'AI Quality Check',
      subtitle: 'Computer Vision',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      metric: '98.4%',
      metricLabel: 'Grading Accuracy',
      description: 'Instant computer vision inspection classifies produce into Grade A, B, or C, estimating surface blemishes, defect probability, and remaining shelf life.',
      technology: 'On-device vision neural networks, freshness index scoring',
      lossMitigation: 'Prevents mixing diseased produce into healthy lots'
    },
    {
      id: 'storage',
      name: 'Smart Storage',
      subtitle: 'Cold Chain & Silos',
      icon: <Warehouse className="w-5 h-5 text-cyan-700" />,
      metric: '4.2°C',
      metricLabel: 'Active Telemetry',
      description: 'Precision temperature, relative humidity, and ethylene gas monitoring with real-time countdown alerts for approaching shelf-life limits.',
      technology: 'IoT LoRaWAN wireless sensors, automated alert dispatch',
      lossMitigation: 'Prevents rotting and premature sprouting by 4.8%'
    },
    {
      id: 'processing',
      name: 'Processing Hub',
      subtitle: 'Value Addition',
      icon: <Factory className="w-5 h-5 text-purple-700" />,
      metric: '28.4%',
      metricLabel: 'Puree Yield',
      description: 'Diverts surplus or Grade-B produce into value-added puree, paste, flakes, and feeds, completely eliminating cosmetic produce dumping.',
      technology: 'Batch conversion tracking (PROC-ID), waste valorization balance',
      lossMitigation: 'Converts 95% of surplus distress produce into shelf-stable revenue'
    },
    {
      id: 'transport',
      name: 'Transportation',
      subtitle: 'Reefer Logistics',
      icon: <Truck className="w-5 h-5 text-indigo-700" />,
      metric: '18',
      metricLabel: 'Active Fleets',
      description: 'Refrigerated transit with GPS tracking and live chamber temperature logs, ensuring unbroken cold chains directly to demand centers.',
      technology: 'OBD-II vehicle telemetry, thermal continuous loggers',
      lossMitigation: 'Reduces transit spoilage and heat stress by 2.5%'
    },
    {
      id: 'market',
      name: 'Market & Buyer',
      subtitle: 'Transparent Trade',
      icon: <ShoppingCart className="w-5 h-5 text-blue-700" />,
      metric: '₹18.4 Cr',
      metricLabel: 'Produce Managed',
      description: 'Direct B2B marketplace connecting farmers and FPOs with supermarket chains, institutional bulk buyers, and terminal APMC mandis.',
      technology: 'Smart Mandi Price Arbitrage engine, Escrow payments',
      lossMitigation: 'Eliminates 3 to 4 middleman delays, cutting terminal decay by 2.2%'
    }
  ];

  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[3];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agri-700 bg-agri-100 px-2.5 py-1 rounded-full">
            Full Lifecycle Integration
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display mt-2">
            The AgriFlow Produce Highway
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Click any milestone along the 7-stage chain to inspect real-time telemetry and loss mitigation technology
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-agri-800 bg-agri-50 px-3 py-1.5 rounded-lg border border-agri-200/80 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Ecosystem Status: 100% Synchronized
        </div>
      </div>

      {/* Interactive Flow Nodes */}
      <div className="pt-8 pb-6 overflow-x-auto">
        <div className="min-w-[760px] relative flex items-center justify-between px-4">
          {/* Connecting Path Line */}
          <div className="absolute left-10 right-10 top-7 h-1 bg-slate-200 z-0">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 via-agri-600 to-blue-600 transition-all duration-500"
              style={{
                width: `${(stages.findIndex(s => s.id === selectedStageId) / (stages.length - 1)) * 100}%`
              }}
            />
          </div>

          {stages.map((stage, idx) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className="relative z-10 flex flex-col items-center group text-center focus:outline-hidden"
              >
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-agri-800 text-white shadow-lift ring-4 ring-agri-200 scale-110'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-agri-500 hover:scale-105'
                  }`}
                >
                  <div className={isSelected ? 'text-white' : 'text-slate-700'}>
                    {stage.icon}
                  </div>
                </div>

                <div className="mt-3">
                  <span className={`text-xs font-bold block ${isSelected ? 'text-agri-900' : 'text-slate-800'}`}>
                    {stage.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {stage.subtitle}
                  </span>
                  <span className="mt-1 inline-block text-[10px] font-semibold text-agri-800 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {stage.metric}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep Dive Card */}
      <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-agri-50/30 border border-slate-200/80 animate-in fade-in duration-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-agri-800 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                Stage Detail
              </span>
              <h4 className="text-lg font-bold text-slate-900 font-display">
                {currentStage.name} &bull; {currentStage.subtitle}
              </h4>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {currentStage.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 block font-medium">Underlying Technology</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{currentStage.technology}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-200/80 bg-emerald-50/30">
                <span className="text-emerald-700 block font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Post-Harvest Impact
                </span>
                <span className="font-semibold text-slate-900 mt-0.5 block">{currentStage.lossMitigation}</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center shadow-xs flex flex-col justify-between h-full">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Live Platform Telemetry</p>
              <p className="text-3xl font-extrabold text-agri-900 font-display mt-2">{currentStage.metric}</p>
              <p className="text-xs font-medium text-slate-600 mt-1">{currentStage.metricLabel}</p>
            </div>

            <button
              onClick={() => onExploreStage && onExploreStage(currentStage.id)}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-agri-800 hover:bg-agri-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Inspect {currentStage.name} Module</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
