import React, { useState } from 'react';
import { 
  ArrowRight, 
  Scale, 
  TrendingUp, 
  Warehouse, 
  Truck, 
  Factory, 
  CheckCircle2, 
  Building2, 
  Tractor, 
  ShoppingCart, 
  Landmark,
  ChevronRight,
  TrendingDown,
  MapPin,
  LogIn
} from 'lucide-react';
import { SupplyChainFlow } from '../components/visualizer/SupplyChainFlow';
import { LossComparison } from '../components/visualizer/LossComparison';
import { UserRole } from '../types';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSelectRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectRole
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('farmer');

  const liveMetrics = [
    { label: 'Member Cultivators', value: '12,450', sub: 'Across 18 FPO clusters' },
    { label: 'Weighbridge & Cold Hubs', value: '328', sub: 'TN, MH, KA, AP, UP & PB' },
    { label: 'Settled Mandi Trade', value: '₹18.4 Cr', sub: 'Direct bank settlements' },
    { label: 'Spoilage Avoided', value: '14.8%', sub: 'Measured crate-to-buyer' },
  ];

  const fieldNotes = [
    {
      title: 'Cold-Room Visibility Before Harvest',
      category: 'Storage & Keeping Life',
      icon: <Warehouse className="w-5 h-5 text-agri-800" />,
      summary: 'Most post-harvest rot happens when harvested crates wait in the sun because the local cold room is already full.',
      practice: 'Check live bay occupancy and chamber humidity in Kallakurichi, Lasalgaon, or Vellore before loading the tractor.'
    },
    {
      title: 'Regional Mandi Rate Spreads',
      category: 'APMC Price Discovery',
      icon: <TrendingUp className="w-5 h-5 text-amber-800" />,
      summary: 'Selling into a local glut often yields ₹18–₹22/kg while a terminal market 160 km away faces a shortage.',
      practice: 'Compare modal rates across nearby APMCs with round-trip diesel and reefer freight already deducted.'
    },
    {
      title: 'Fair Grading at the Gate',
      category: 'AGMARK Assay',
      icon: <Scale className="w-5 h-5 text-teal-800" />,
      summary: 'Arbitrary visual deductions at mandi gates routinely shave 10–15% off a cultivator’s rightful payout.',
      practice: 'Record moisture, blemish percentage, and crate weight on a standardized FPO weighbridge slip with QR provenance.'
    },
    {
      title: 'Monitored Reefer Dispatch',
      category: 'Cold-Chain Transit',
      icon: <Truck className="w-5 h-5 text-indigo-800" />,
      summary: 'Open tarpaulin lorries expose perishables to highway heat, causing weight shrinkage before arrival.',
      practice: 'Book multi-drop reefer vans with continuous chamber temperature logs from FPO pack-house to buyer dock.'
    },
    {
      title: 'Secondary Grade Valorization',
      category: 'Processing Intake',
      icon: <Factory className="w-5 h-5 text-stone-700" />,
      summary: 'Cosmetically blemished or surplus tomatoes and onions shouldn’t be dumped on the roadside during peak harvest.',
      practice: 'Route Grade-B lots directly to Hosur and Nashik processing units for puree, paste, and dehydrated flakes.'
    },
    {
      title: 'Protected Escrow Settlement',
      category: 'Wholesale Trade',
      icon: <TrendingDown className="w-5 h-5 text-emerald-800" />,
      summary: 'Delayed trader payments force smallholders into high-interest informal credit before the next sowing cycle.',
      practice: 'Wholesale buyers lock purchase order funds in escrow upon dispatch, releasing direct bank payout on weighment.'
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
      title: 'Cultivator (Kisan)',
      icon: <Tractor className="w-5 h-5 text-agri-800" />,
      responsibilities: 'Register harvested lots, check crate grading, monitor cold-room keeping days, and compare regional mandi rates before dispatch.',
      features: ['Digital Weighbridge & Lot QR Pass', 'AGMARK Crate Grading & Moisture Log', 'Daily APMC Modal Price Comparison', 'AIF & PMFBY Subsidy Applications'],
      benefits: '18–22% higher net realization per quintal by avoiding local gluts and arbitrary trader deductions.',
      targetPage: 'farmer'
    },
    fpo: {
      title: 'FPO Collection Center',
      icon: <Building2 className="w-5 h-5 text-teal-800" />,
      responsibilities: 'Aggregate member harvests, issue electronic weighment slips, reserve cold-room bays, and fulfill bulk supermarket contracts.',
      features: ['Member Cultivator Ledger', 'Electronic Weighbridge Ticket Issuance', 'Cold Storage Bay Allocation', 'Consolidated Wholesale Lots'],
      benefits: 'Stronger collective bargaining with retail chains and transparent member settlement records.',
      targetPage: 'fpo'
    },
    processor: {
      title: 'Agro-Processing Unit',
      icon: <Factory className="w-5 h-5 text-amber-800" />,
      responsibilities: 'Procure surplus and Grade-B produce directly from FPOs, track batch conversion yields (Brix/puree/flakes), and valorize pomace.',
      features: ['Batch Conversion & Yield Ledger', 'Direct FPO Grade-B Procurement', 'Lab Brix & Moisture QA Log', 'Byproduct Compost & Feed Accounting'],
      benefits: 'Steady raw material supply during harvest peaks with full batch-level origin records.',
      targetPage: 'processing'
    },
    transporter: {
      title: 'Reefer Fleet Operator',
      icon: <Truck className="w-5 h-5 text-indigo-800" />,
      responsibilities: 'Manage refrigerated and dry lorry dispatches, log compartment temperatures along highway corridors, and record digital proof of delivery.',
      features: ['Waybill & Lorry Dispatch Desk', 'Compartment Temperature Loggers', 'Highway Checkpoint Updates', 'Digital Consignee Sign-off'],
      benefits: 'Reduced empty return trips and fewer transit quality disputes at destination mandis.',
      targetPage: 'transport'
    },
    buyer: {
      title: 'Wholesale & Retail Buyer',
      icon: <ShoppingCart className="w-5 h-5 text-blue-800" />,
      responsibilities: 'Source graded farm lots directly from FPOs, lock escrow purchase orders, and verify cold-chain custody before store delivery.',
      features: ['Verified FPO Lot Marketplace', 'Escrow Purchase Order Desk', 'Full Batch QR Provenance Audit', 'Scheduled Reefer Delivery'],
      benefits: '3 to 4 extra days of retail shelf life and direct farm-gate pricing without multiple commission agents.',
      targetPage: 'buyer'
    },
    admin: {
      title: 'APMC & State Officer',
      icon: <Landmark className="w-5 h-5 text-stone-800" />,
      responsibilities: 'Monitor district-wise arrivals, cold storage occupancy, post-harvest spoilage trends, and infrastructure subsidy utilization.',
      features: ['District Arrival & Rate Ledger', 'Cold Storage Occupancy Audit', 'Post-Harvest Spoilage Tracking', 'AIF Subsidy Disbursement View'],
      benefits: 'Timely intervention during regional gluts or shortages and targeted cold-chain capacity planning.',
      targetPage: 'admin'
    },
    government: {
      title: 'Agricultural Policy Desk',
      icon: <Landmark className="w-5 h-5 text-stone-800" />,
      responsibilities: 'Review inter-state commodity movements, cold storage utilization, and scheme coverage across agricultural corridors.',
      features: ['State-Wise Commodity Overview', 'Storage Deficit Mapping', 'Spoilage Reduction Benchmarks', 'Inter-State Trade Corridors'],
      benefits: 'Grounded field data to guide rural pack-house and cold-room investments.',
      targetPage: 'admin'
    }
  };

  const activeRoleData = roleEcosystemData[selectedRoleTab] || roleEcosystemData.farmer;

  return (
    <div className="w-full bg-[#f6f4ee] space-y-16 pb-16">
      {/* Editorial Two-Column Hero Section */}
      <section className="pt-8 pb-14 border-b border-stone-200/90 bg-gradient-to-b from-[#fdfcf9] to-[#f6f4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Editorial Headline & Direct Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-200/70 text-stone-800 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-agri-800" />
                <span>Southern & Western Agri Trade Corridors • Kharif / Rabi 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-serif tracking-tight leading-[1.15]">
                Direct from the FPO weighbridge to the wholesale floor.
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
                AgriFlow connects cultivators, FPO collection centers, cold storages, and institutional buyers on one practical trade ledger—cutting post-harvest spoilage and ensuring transparent mandi settlements.
              </p>

              {/* Hero CTAs */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('auth')}
                  className="px-6 py-3.5 rounded-xl bg-[#1a4129] hover:bg-agri-900 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Member Portal</span>
                </button>

                <button
                  onClick={() => onNavigate('farmer')}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-slate-900 border border-stone-300 font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <span>Open Farmer Workspace</span>
                  <ArrowRight className="w-4 h-4 text-agri-800" />
                </button>

                <button
                  onClick={() => onNavigate('price-intelligence')}
                  className="px-4 py-3.5 rounded-xl text-agri-900 hover:bg-stone-200/60 font-semibold text-xs sm:text-sm transition-colors"
                >
                  Check Today’s APMC Rates →
                </button>
              </div>

              {/* Operational Figures Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-200/90">
                {liveMetrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-2xl font-bold text-slate-900 font-serif tabular-nums">{m.value}</p>
                    <p className="text-xs font-semibold text-agri-900">{m.label}</p>
                    <p className="text-[11px] text-slate-500">{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Mandi Board & Sample Gate Pass Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-card overflow-hidden">
                {/* Field Image Header */}
                <div className="relative h-48 bg-stone-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80"
                    alt="Freshly harvested Sivam hybrid tomatoes in crates"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-agri-700 text-white uppercase">
                        Lot #AGR-2026-004582
                      </span>
                      <p className="font-bold text-base font-serif mt-1">
                        Tomato • Sivam Hybrid (2,500 kg)
                      </p>
                      <p className="text-xs text-stone-200">
                        Dharmapuri Horti FPO • Kallakurichi Cold Bay #3
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white/95 text-agri-950 font-bold text-xs tabular-nums">
                      Grade A
                    </span>
                  </div>
                </div>

                {/* Today's Morning Mandi Ticker */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Morning Mandi Rate Bulletin
                      </h3>
                      <p className="text-[11px] text-slate-500">Modal rates per kg • Updated 07:00 AM</p>
                    </div>
                    <button
                      onClick={() => onNavigate('price-intelligence')}
                      className="text-xs font-semibold text-agri-800 hover:underline"
                    >
                      All Mandis →
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100 text-xs tabular-nums">
                    <div className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900">Chennai (Koyambedu)</span>
                        <span className="text-slate-500 block text-[11px]">Tomato Hybrid • High Demand</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm text-slate-900">₹28.00/kg</span>
                        <span className="block text-[11px] text-emerald-700 font-semibold">+8.5% vs yesterday</span>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900">Lasalgaon (Nashik)</span>
                        <span className="text-slate-500 block text-[11px]">Red Onion • Cured Medium</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm text-slate-900">₹31.00/kg</span>
                        <span className="block text-[11px] text-slate-500">Steady arrivals</span>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900">Kurnool APMC</span>
                        <span className="text-slate-500 block text-[11px]">Rice • Sona Masoori</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm text-slate-900">₹42.00/kg</span>
                        <span className="block text-[11px] text-emerald-700 font-semibold">+4.8% this week</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('traceability')}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-slate-800 font-semibold text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Inspect Sample Weighbridge & QR Pass</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Supply Chain Flow Visualizer */}
          <div className="mt-14">
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

      {/* Practical Field-to-Market Operations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-agri-800">
            Where Harvest Value Is Protected
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            Six practical fixes between the farm gate and the wholesale market.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Built around how FPO clerks, cold-room operators, lorry drivers, and mandi buyers actually work every morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fieldNotes.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    {card.category}
                  </span>
                  <div className="p-2 rounded-lg bg-stone-100 border border-stone-200">
                    {card.icon}
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 font-serif">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs">
                <span className="font-semibold text-agri-900 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-agri-700 shrink-0" />
                  How it works on AgriFlow:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {card.practice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholder Desks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-stone-200/90 shadow-card">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-agri-800">
                Role-Based Desks
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mt-1">
                Dedicated workspaces for every participant
              </h2>
            </div>
            <button
              onClick={() => onNavigate('auth')}
              className="text-xs font-bold text-agri-800 hover:underline self-start md:self-auto"
            >
              Sign in with your role credentials →
            </button>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['farmer', 'fpo', 'processor', 'transporter', 'buyer', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRoleTab(r)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                  selectedRoleTab === r
                    ? 'bg-[#1a4129] text-white border-[#1a4129]'
                    : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className={selectedRoleTab === r ? 'text-agri-200' : ''}>{roleEcosystemData[r].icon}</span>
                <span>{roleEcosystemData[r].title}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Role Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#f6f4ee] border border-stone-200/90">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                    {activeRoleData.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">{activeRoleData.title}</h3>
                    <p className="text-xs text-slate-600">Daily Tools & Ledger Access</p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeRoleData.responsibilities}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {activeRoleData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-stone-200/80 text-xs font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-agri-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-stone-200 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-agri-800">
                    Field Outcome
                  </span>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {activeRoleData.benefits}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectRole(selectedRoleTab);
                    onNavigate(activeRoleData.targetPage);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1a4129] hover:bg-agri-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open {activeRoleData.title} Desk</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Harvest Loss Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LossComparison />
      </section>
    </div>
  );
};
