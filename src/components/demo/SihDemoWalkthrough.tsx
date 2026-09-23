import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Tractor, 
  CheckCircle2, 
  Warehouse, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingCart, 
  Truck, 
  QrCode, 
  Award, 
  Play, 
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SihDemoWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen: (screenId: string) => void;
}

interface DemoStep {
  stepNumber: number;
  title: string;
  badge: string;
  targetScreen: string;
  targetScreenLabel: string;
  icon: React.ReactNode;
  problem: string;
  agriflowAction: string;
  visualHighlight: string;
  kpi: string;
}

export const SihDemoWalkthrough: React.FC<SihDemoWalkthroughProps> = ({
  isOpen,
  onClose,
  onNavigateToScreen
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompactDock, setIsCompactDock] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const demoSteps: DemoStep[] = [
    {
      stepNumber: 1,
      title: 'Farmer Registers Harvest Produce',
      badge: 'Step 1: Farm Origin',
      targetScreen: 'produce',
      targetScreenLabel: 'Produce Management',
      icon: <Tractor className="w-6 h-6 text-emerald-600" />,
      problem: 'Farmers lack standard digital records of harvest date, lot size, and initial field condition.',
      agriflowAction: 'Farmer K. Murugesan logs 2,500 kg of hybrid tomatoes from Palacode Farm. System assigns unique lot identifier AGR-2026-004582.',
      visualHighlight: 'Produce Registration form auto-generates digital lot passport and sets up cold-chain requirements.',
      kpi: '100% digital provenance from first mile'
    },
    {
      stepNumber: 2,
      title: 'AI Computer Vision Quality Grading',
      badge: 'Step 2: AI Inspection',
      targetScreen: 'farmer',
      targetScreenLabel: 'AI Quality Inspector',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      problem: 'Subjective manual grading at village mandis leads to unfair price deductions and distress selling.',
      agriflowAction: 'Edge computer vision evaluates tomato sample. Grades produce as Grade A (92% freshness index, 6% surface defect, 8-day shelf life).',
      visualHighlight: 'Real-time defect bounding boxes and scientific chromatic assessment with transparent prototype disclaimer.',
      kpi: 'Grade-A Certified & 98.4% grading accuracy'
    },
    {
      stepNumber: 3,
      title: 'Produce Ingress into Precision Cold Storage',
      badge: 'Step 3: Cold Chain Ingress',
      targetScreen: 'storage',
      targetScreenLabel: 'Storage & Cold Chain Hub',
      icon: <Warehouse className="w-6 h-6 text-cyan-600" />,
      problem: 'Over 16% of Indian tomatoes rot within 72 hours due to lack of immediate cold chain storage.',
      agriflowAction: 'Lot routed to Kallakurichi Precision Cold Hub (Bay 3, Chamber 2). Active sensors monitor temperature at 4.2°C and humidity at 68% RH.',
      visualHighlight: 'Continuous IoT sensor graphs monitor temperature fluctuations in real-time.',
      kpi: 'Shelf life extended by +5 days'
    },
    {
      stepNumber: 4,
      title: 'Automated Shelf-Life Risk Detection',
      badge: 'Step 4: Smart Alert',
      targetScreen: 'storage',
      targetScreenLabel: 'Storage Alerts Panel',
      icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
      problem: 'Produce left unchecked in storage quietly spoils before managers notice expiring shelf life.',
      agriflowAction: 'System triggers automatic high-priority alert: "⚠ 1,200 kg tomatoes approaching 4-day shelf life limit. Priority market allocation advised."',
      visualHighlight: 'Predictive countdown timer prevents warehouse decay before losses can occur.',
      kpi: 'Zero unmonitored spoilage in storage'
    },
    {
      stepNumber: 5,
      title: 'Market Intelligence Identifies Price Arbitrage',
      badge: 'Step 5: Market Intelligence',
      targetScreen: 'price-intelligence',
      targetScreenLabel: 'Market Price Intelligence',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      problem: 'Local village mandi pays only ₹22/kg, while metropolitan centers experience acute supply shortages.',
      agriflowAction: 'AgriFlow scans APMC arrivals: Chennai Koyambedu is offering ₹28/kg (+8.5% surge). After ₹1.80/kg reefer freight, net profit is +₹8,500 higher.',
      visualHighlight: 'Interactive price comparison chart and net margin arbitrage calculator.',
      kpi: '+18% higher revenue vs local distress sale'
    },
    {
      stepNumber: 6,
      title: 'Supermarket Buyer Places Escrow Bulk Order',
      badge: 'Step 6: Fair Marketplace',
      targetScreen: 'marketplace',
      targetScreenLabel: 'B2B Smart Marketplace',
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      problem: 'Intermediary trader cartels delay farmer payments by 30 to 90 days.',
      agriflowAction: 'FreshMart Supermarkets places verified purchase order ORD-2026-9041 for 2,000 kg at ₹28/kg. Total ₹56,000 locked into escrow.',
      visualHighlight: 'Direct B2B purchase with transparent quality verification and secured payout guarantee.',
      kpi: 'Same-day digital escrow settlement'
    },
    {
      stepNumber: 7,
      title: 'Dispatched via Temperature-Monitored Reefer',
      badge: 'Step 7: Logistics',
      targetScreen: 'transport',
      targetScreenLabel: 'Transport & Fleet Logistics',
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      problem: 'Rough open-truck transport causes bruising and temperature shock on highway transits.',
      agriflowAction: 'Shipment AGT-20382 assigned to Reefer Truck TN-25-AX-4819. Live GPS and thermal logger stream unbroken 4.1°C reading from Tiruvannamalai to Chennai.',
      visualHighlight: 'Animated transit map displaying vehicle coordinates, chamber thermal stability, and checkpoint arrival logs.',
      kpi: 'Transit loss reduced from 4.6% to 2.1%'
    },
    {
      stepNumber: 8,
      title: 'Consumer Scans Produce QR Code for Provenance',
      badge: 'Step 8: Traceability',
      targetScreen: 'traceability',
      targetScreenLabel: 'Produce Traceability & QR',
      icon: <QrCode className="w-6 h-6 text-slate-800" />,
      problem: 'Consumers and export buyers have zero visibility into who grew the produce or pesticide safety.',
      agriflowAction: 'Retail consumers in Chennai scan batch QR code AGR-2026-004582 to view farmer Murugesan\'s photo, harvest date, AI Grade-A badge, and temperature logs.',
      visualHighlight: 'Interactive Digital Produce Passport showing verifiable custody chain from farm to fork.',
      kpi: '100% transparent food trust'
    },
    {
      stepNumber: 9,
      title: 'Final Hackathon Impact: Value Multiplied',
      badge: 'Step 9: Measured Impact',
      targetScreen: 'post-harvest-loss',
      targetScreenLabel: 'Post-Harvest Loss Intelligence',
      icon: <Award className="w-6 h-6 text-amber-600" />,
      problem: 'India loses ₹1.5 Lakh Crore annually in post-harvest agricultural decay.',
      agriflowAction: 'AgriFlow demonstrates a 14.8% reduction in total produce losses, +22% average farmer income improvement, and 3x faster turnaround times.',
      visualHighlight: 'Interactive impact comparator: Traditional 26.8% loss slashed to 12.0% with verifiable financial savings.',
      kpi: '₹2.4 Lakhs saved per 100 MT produce'
    }
  ];

  const currentStep = demoSteps[currentStepIndex];

  // Sync background application screen when step changes
  useEffect(() => {
    if (isOpen) {
      onNavigateToScreen(currentStep.targetScreen);
    }
  }, [currentStepIndex, isOpen]);

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isOpen && isAutoPlay) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < demoSteps.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlay(false);
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
            return prev;
          }
        });
      }, 8000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isAutoPlay, demoSteps.length]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === demoSteps.length - 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Compact Dock Mode (renders at bottom of screen so judge can view and interact with the live page)
  if (isCompactDock) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto bg-slate-950/95 text-white rounded-2xl border-2 border-amber-400 shadow-2xl p-4 backdrop-blur-md animate-in slide-in-from-bottom duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold shrink-0">
              {currentStepIndex + 1}/{demoSteps.length}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 font-display">{currentStep.badge}:</span>
                <h4 className="font-bold text-sm text-white">{currentStep.title}</h4>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">{currentStep.agriflowAction}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsCompactDock(false)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              title="Expand Presentation Storyboard"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg text-slate-300 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === demoSteps.length - 1}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <span>{currentStepIndex === demoSteps.length - 1 ? 'Finish' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Presentation Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-agri-950 via-agri-900 to-agri-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <Play className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-display">AgriFlow SIH Guided Demo</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-amber-950">
                  Judge Presentation Mode (3–5 Mins)
                </span>
              </div>
              <p className="text-xs text-agri-200/90">
                Synchronized live walkthrough from farm harvest to consumer verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsCompactDock(true)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Dock to bottom to view full live screen underneath"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progression Ribbon */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5">
            {demoSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded-md transition-all shrink-0 ${
                  idx === currentStepIndex
                    ? 'bg-agri-800 text-white shadow-2xs'
                    : idx < currentStepIndex
                    ? 'bg-agri-100 text-agri-900 hover:bg-agri-200'
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                <span>{idx + 1}</span>
                <span className="hidden sm:inline truncate max-w-[80px]">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1 border transition-colors ${
              isAutoPlay 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoPlay ? 'Auto-Advancing (8s)' : 'Auto-Play'}</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Milestone Banner */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs shrink-0">
                {currentStep.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-agri-700 bg-agri-50 px-2.5 py-0.5 rounded-md border border-agri-200">
                  {currentStep.badge}
                </span>
                <h4 className="text-xl font-bold text-slate-900 font-display mt-1">
                  {currentStep.title}
                </h4>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono text-slate-400 block">Step {currentStepIndex + 1} of {demoSteps.length}</span>
              <span className="inline-block mt-1 px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-full border border-emerald-300">
                {currentStep.kpi}
              </span>
            </div>
          </div>

          {/* Problem vs AgriFlow Solution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-rose-800 block text-[11px]">
                Conventional Breakdown:
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {currentStep.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-agri-50/80 border border-agri-200 text-xs space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-agri-800 block text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-agri-700" />
                AgriFlow Production Workflow:
              </span>
              <p className="text-slate-900 leading-relaxed font-normal">
                {currentStep.agriflowAction}
              </p>
            </div>
          </div>

          {/* Interactive Screen Preview Cue */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-agri-300 font-semibold block text-[11px] uppercase tracking-wider">
                Live Background Screen Active:
              </span>
              <p className="text-slate-200 mt-0.5">{currentStep.visualHighlight}</p>
            </div>

            <button
              onClick={() => setIsCompactDock(true)}
              className="px-3.5 py-2 rounded-lg bg-agri-600 hover:bg-agri-500 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Dock & Interact Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex(0)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {currentStepIndex === demoSteps.length - 1 ? (
              <button
                onClick={() => {
                  confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
                  onClose();
                  onNavigateToScreen('post-harvest-loss');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-agri-800 hover:bg-agri-900 text-white shadow-lift flex items-center gap-1.5 transition-all"
              >
                <span>Complete SIH Presentation</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-agri-800 hover:bg-agri-900 text-white shadow-lift flex items-center gap-1.5 transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
