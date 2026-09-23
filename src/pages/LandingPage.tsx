import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Warehouse, 
  Truck, 
  QrCode, 
  Factory, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Building2, 
  Tractor, 
  ShoppingCart, 
  Landmark,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { SupplyChainFlow } from '../components/visualizer/SupplyChainFlow';
import { LossComparison } from '../components/visualizer/LossComparison';
import { UserRole } from '../types';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onOpenSihDemo: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenSihDemo,
  onSelectRole
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('farmer');

  const liveMetrics = [
    { label: 'Registered Farmers', value: '12,450', sub: '+18% this season' },
    { label: 'Collection Centers', value: '328', sub: 'Across 6 states' },
    { label: 'Produce Managed', value: '₹18.4 Cr', sub: 'Gross market trade' },
    { label: 'Loss Reduction', value: '14.8%', sub: 'Produce preserved' },
  ];

  const problemCards = [
    {
      title: 'Post-Harvest Losses',
      icon: <TrendingDown className="w-5 h-5 text-rose-600" />,
      problem: 'Perishable produce loses up to 25–30% of market value because of inadequate cold storage and delayed transport.',
      impact: '₹1.5 Lakh Crore annual loss to Indian agricultural economy, severely crippling smallholder income.',
      solution: 'Real-time inventory registration, AI shelf-life countdowns, and automated diversion to nearby processing hubs.'
    },
    {
      title: 'Lack of Storage Visibility',
      icon: <Warehouse className="w-5 h-5 text-amber-600" />,
      problem: 'Farmers and FPOs have no real-time telemetry on whether local cold storages are full, over-humid, or decaying.',
      impact: 'Sudden rotting and premature sprouting of stored onions and potatoes without warning.',
      solution: 'IoT chamber sensor telemetry tracking temperature, relative humidity, and automated expiry threshold alerts.'
    },
    {
      title: 'Price Volatility & Distress Sales',
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      problem: 'Harvest gluts force farmers to sell at rock-bottom prices to local middlemen while terminal cities face high prices.',
      impact: 'Farmers earn as low as ₹4/kg while metropolitan consumers pay ₹35/kg.',
      solution: 'Mandi price intelligence comparing APMC rates within a 200km radius, calculating transport costs and net profit gain.'
    },
    {
      title: 'Lack of Quality Transparency',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      problem: 'Subjective manual grading at mandi gates causes unjustified price cuts based on trader discretion.',
      impact: 'Farmers lose 10%–20% of their rightful revenue due to arbitrary quality deductions.',
      solution: 'Instant AI Computer Vision grading analyzing surface blemishes, color uniformity, and issuing certified Grade-A/B passes.'
    },
    {
      title: 'Transportation Inefficiencies',
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      problem: 'Open non-refrigerated trucks subject perishables to extreme ambient heat and transit delays on highways.',
      impact: 'Thermal shock causing produce softening, weight shrinkage, and pathogen development before arrival.',
      solution: 'Monitored reefer fleet network with continuous GPS tracking, thermal data loggers, and route optimization.'
    },
    {
      title: 'Fragmented Processing Ecosystem',
      icon: <Factory className="w-5 h-5 text-purple-600" />,
      problem: 'Surplus or Grade-B produce is dumped in fields instead of being channeled into secondary food processing.',
      impact: 'Enormous food wastage and zero value-addition for secondary grade agricultural produce.',
      solution: 'Direct B2B connection to agro-processors for instant conversion into purees, pastes, and dehydrated products.'
    }
  ];

  const roleEcosystemData: Record<UserRole, {
    title: string;
    icon: React.ReactNode;
    responsibilities: string;
    features: string[];
    benefits: string;
    targetPage: string;
  }> = {
    farmer: {
      title: 'Farmer (Kisan)',
      icon: <Tractor className="w-6 h-6 text-emerald-600" />,
      responsibilities: 'Harvest registration, running on-device AI quality assessment, monitoring storage, and choosing optimal mandis.',
      features: ['Add Harvest Lots & Get QR Passport', 'AI Produce Freshness Grading', 'Real-Time APMC Mandi Rates', 'Government Scheme Eligibility'],
      benefits: 'Average 18–22% higher net income, zero middleman cheating, and elimination of distress selling.',
      targetPage: 'farmer'
    },
    fpo: {
      title: 'FPO / Collection Center',
      icon: <Building2 className="w-6 h-6 text-teal-600" />,
      responsibilities: 'Aggregating member farmers harvest, issuing digital weighbridge receipts, booking bulk cold storage, and listing wholesale lots.',
      features: ['Farmer Member Management', 'Weighbridge Ticket Generation', 'Cold Chain Space Reservation', 'Bulk Order Aggregation'],
      benefits: 'Enhanced collective bargaining power, institutional contracts with supermarkets, and streamlined operations.',
      targetPage: 'fpo'
    },
    processor: {
      title: 'Food Processor Hub',
      icon: <Factory className="w-6 h-6 text-amber-600" />,
      responsibilities: 'Procuring raw produce, managing batch conversion (puree/paste/flakes), tracking input-output yield, and valorizing organic byproducts.',
      features: ['Batch Conversion Tracking (PROC-ID)', 'Yield & Waste Balance Monitor', 'Direct Farm Raw Material Procurement', 'Quality Brix Certification'],
      benefits: 'Consistent supply of standardized raw material, minimal factory idle time, and complete byproduct monetization.',
      targetPage: 'processing'
    },
    transporter: {
      title: 'Cold-Chain Transporter',
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      responsibilities: 'Fleet logistics, managing refrigerated containers, real-time GPS telemetry, and unbroken cold-chain temperature compliance.',
      features: ['Active Shipment Dispatch', 'Chamber Temperature Logger (IoT)', 'Checkpoint Route Tracking', 'Proof of Delivery (e-POD)'],
      benefits: 'Higher fleet utilization rates, reduced transit disputes, and premium freight rates for verified cold chains.',
      targetPage: 'transport'
    },
    buyer: {
      title: 'Institutional Buyer & Retailer',
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      responsibilities: 'Direct farm procurement for supermarkets, hotel chains, and exporters, escrow contract management, and traceability audits.',
      features: ['Verified Produce Marketplace', 'Digital Escrow Purchase Orders', 'QR Provenance Verification', 'Automated Logistics Scheduling'],
      benefits: '3-day fresher shelf life in stores, direct farm-gate pricing, and transparent food safety credentials.',
      targetPage: 'buyer'
    },
    admin: {
      title: 'Government & APMC Authority',
      icon: <Landmark className="w-6 h-6 text-purple-600" />,
      responsibilities: 'Macro monitoring of state-wide post-harvest loss indices, MSP compliance, buffer stock security, and infrastructure deficits.',
      features: ['State-wise Production Heatmap', 'Post-Harvest Loss Reduction Index', 'Storage Capacity Allocation', 'Scheme Disbursement Oversight'],
      benefits: 'Data-driven food security decisions, targeted cold storage subsidies, and prevention of price cartels.',
      targetPage: 'admin'
    },
    government: {
      title: 'Government Policy Stakeholder',
      icon: <Landmark className="w-6 h-6 text-purple-600" />,
      responsibilities: 'Formulating agricultural infrastructure policy, monitoring AIF and PMFBY rollouts, and tracking national food security reserves.',
      features: ['National Agri Dashboard', 'Post-Harvest Loss Index', 'Infrastructure Gap Analysis', 'Inter-State Produce Mobility'],
      benefits: 'Granular field telemetry to guide national agricultural investments and emergency buffer stock allocation.',
      targetPage: 'admin'
    }
  };

  const activeRoleData = roleEcosystemData[selectedRoleTab] || roleEcosystemData.farmer;

  return (
    <div className="w-full bg-[#faf9f5] space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 bg-gradient-to-b from-white via-sand-50/50 to-sand-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agri-100 text-agri-900 border border-agri-200 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-agri-600 animate-pulse" />
              <span>Smart India Hackathon 2026 Innovation</span>
              <span className="text-agri-400">&bull;</span>
              <span className="text-agri-700">Student Innovation for Agriculture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display tracking-tight leading-[1.15]">
              Transforming India's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-800 via-agri-700 to-harvest-600">
                Agricultural Produce Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              One intelligent platform to manage agricultural produce from harvest to market — reducing losses, improving transparency, and creating better opportunities for farmers.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('farmer')}
                className="px-6 py-3.5 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-sm flex items-center gap-2 shadow-lift hover:scale-102 transition-all"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSihDemo}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-harvest-600 hover:from-amber-600 hover:to-harvest-700 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xs transition-all hover:scale-102"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>▶ See How It Works (SIH Demo)</span>
              </button>
            </div>
          </div>

          {/* Live Platform Metric Strip */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {liveMetrics.map((m, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-card text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">{m.value}</p>
                <p className="text-xs font-bold text-agri-800 uppercase tracking-wider mt-1">{m.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Interactive Supply Chain Flow Visualizer */}
          <div className="mt-14 max-w-6xl mx-auto">
            <SupplyChainFlow onExploreStage={(stageId) => {
              if (stageId === 'farm') onNavigate('produce');
              else if (stageId === 'fpo') onNavigate('fpo');
              else if (stageId === 'quality') onNavigate('farmer');
              else if (stageId === 'storage') onNavigate('storage');
              else if (stageId === 'processing') onNavigate('processing');
              else if (stageId === 'transport') onNavigate('transport');
              else if (stageId === 'market') onNavigate('marketplace');
            }} />
          </div>
        </div>
      </section>

      {/* Problem Section: "India's agriculture doesn't end at harvest" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Real-World Structural Bottlenecks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            India's agriculture doesn't end at harvest.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Every year, billions of kilograms of hard-earned produce are lost between the farm gate and the dining table. Here is how AgriFlow solves each breakdown.
          </p>
        </div>

        {/* 6 Problem / Impact / Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemCards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-lift transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-agri-50 group-hover:border-agri-200 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 font-display">
                    {card.title}
                  </h3>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100">
                    <span className="font-bold text-rose-900 block mb-0.5">Problem:</span>
                    <p className="text-slate-700">{card.problem}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-0.5">Impact:</span>
                    <p className="text-slate-600">{card.impact}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <span className="font-bold text-agri-800 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-agri-700" />
                  AgriFlow Solution:
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {card.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-agri-800 bg-agri-100 px-3 py-1 rounded-full border border-agri-200">
              Multi-Stakeholder Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Built for Every Player in the Agricultural Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select any role below to preview specialized tools, workflows, and economic incentives
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(['farmer', 'fpo', 'processor', 'transporter', 'buyer', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRoleTab(r)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  selectedRoleTab === r
                    ? 'bg-agri-800 text-white border-agri-800 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{roleEcosystemData[r].icon}</span>
                <span>{roleEcosystemData[r].title}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Role Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-agri-50/20 border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    {activeRoleData.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">{activeRoleData.title}</h3>
                    <p className="text-xs text-agri-800 font-medium">Core Capabilities & Digital Workflows</p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeRoleData.responsibilities}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeRoleData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Economic Advantage
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-3 leading-snug">
                    {activeRoleData.benefits}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectRole(selectedRoleTab);
                    onNavigate(activeRoleData.targetPage);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Open {activeRoleData.title} Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Harvest Loss Intelligence Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LossComparison />
      </section>
    </div>
  );
};
