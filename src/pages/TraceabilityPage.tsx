import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  User, 
  Building2, 
  Warehouse, 
  Truck, 
  Sparkles, 
  ShoppingCart, 
  ArrowRight,
  Download,
  Printer,
  Clock,
  Award
} from 'lucide-react';
import { Produce } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { QRCodeModal } from '../components/common/QRCodeModal';

interface TraceabilityPageProps {
  produceList: Produce[];
  initialProduceId?: string;
}

export const TraceabilityPage: React.FC<TraceabilityPageProps> = ({
  produceList,
  initialProduceId
}) => {
  const [searchId, setSearchId] = useState<string>(initialProduceId || produceList[0]?.id || 'AGR-2026-004582');
  const [selectedProduceForQR, setSelectedProduceForQR] = useState<Produce | null>(null);

  const matchedProduce = produceList.find(
    (p) => p.id.toUpperCase() === searchId.trim().toUpperCase()
  ) || produceList[0];

  const quickSamples = ['AGR-2026-004582', 'AGR-2026-003914', 'AGR-2026-002187', 'AGR-2026-007812'];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-agri-100 text-agri-800 rounded-xl">
              <QrCode className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Farm-to-Fork Digital Produce Passport
              </h1>
              <p className="text-xs text-slate-500">
                Verifiable custody chain tracking harvest origin, AI grading certificates, cold storage logs, and transportation telemetry
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedProduceForQR(matchedProduce)}
          className="px-4 py-2 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4" />
          <span>Inspect Batch QR Code</span>
        </button>
      </div>

      {/* Produce Search & Quick Chips */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="max-w-2xl">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            Enter Produce ID or Scan QR Code:
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. AGR-2026-004582"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold uppercase tracking-wider focus:outline-hidden focus:border-agri-700 focus:ring-2 focus:ring-agri-200"
              />
            </div>
            <button
              onClick={() => {}}
              className="px-5 py-2.5 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs shadow-xs"
            >
              Verify Passport
            </button>
          </div>
        </div>

        {/* Sample chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Quick Verify Sample Batches:</span>
          {quickSamples.map((qid) => (
            <button
              key={qid}
              onClick={() => setSearchId(qid)}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all border ${
                searchId.toUpperCase() === qid
                  ? 'bg-agri-100 text-agri-900 border-agri-300 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {qid}
            </button>
          ))}
        </div>
      </div>

      {/* Produce Passport Summary Card */}
      {matchedProduce && (
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-agri-50/30 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Image & ID */}
            <div className="flex items-center gap-4 md:col-span-2">
              <img
                src={matchedProduce.imageUrl}
                alt={matchedProduce.cropName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-agri-900 bg-agri-100 px-2 py-0.5 rounded">
                    {matchedProduce.id}
                  </span>
                  <StatusBadge status={matchedProduce.qualityGrade} size="sm" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  {matchedProduce.cropName} &bull; {matchedProduce.cropVariety}
                </h2>
                <p className="text-xs text-slate-500">
                  Origin: {matchedProduce.location.district}, {matchedProduce.location.state} &bull; {matchedProduce.quantityKg.toLocaleString('en-IN')} kg
                </p>
              </div>
            </div>

            {/* Cultivator info */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Cultivator KYC</span>
              <p className="font-bold text-slate-900 text-sm">{matchedProduce.farmerName}</p>
              <p className="text-slate-500 text-[11px] truncate">{matchedProduce.fpoName}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-1">
                <ShieldCheck className="w-3 h-3" /> Aadhaar Verified
              </span>
            </div>

            {/* AI Quality Badge */}
            <div className="p-3 bg-white rounded-xl border border-emerald-200/80 bg-emerald-50/20 text-xs space-y-1 text-center md:text-left">
              <span className="text-emerald-800 block text-[10px] uppercase font-bold tracking-wider">Quality Certification</span>
              <p className="text-lg font-bold text-slate-900 font-display">
                Grade {matchedProduce.qualityGrade} ({matchedProduce.freshnessPercent}%)
              </p>
              <p className="text-slate-500 text-[11px]">{matchedProduce.defectProbability}% Defect &bull; {matchedProduce.shelfLifeDays}d Shelf Life</p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Full Journey Timeline (Section 16: Farm -> Harvest -> Collection -> Quality -> Storage -> Processing -> Transport -> Buyer) */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 font-display">
              Chain-of-Custody Provenance Journey
            </h3>
            <p className="text-xs text-slate-500">
              Cryptographically signed state transitions from farm gate to retail handoff
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Unbroken Cold-Chain Audit
          </span>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {matchedProduce?.statusTimeline.map((event, idx) => (
            <div key={idx} className="relative">
              {/* Milestone Icon */}
              <div className={`absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-xs ${
                event.status === 'completed'
                  ? 'bg-emerald-600 ring-4 ring-emerald-100'
                  : event.status === 'current'
                  ? 'bg-agri-800 ring-4 ring-agri-200 animate-pulse'
                  : 'bg-slate-300'
              }`}>
                {event.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm font-display">{event.stage}</h4>
                    {event.quality && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-agri-100 text-agri-900 border border-agri-300">
                        {event.quality}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">{event.timestamp}</span>
                </div>

                <p className="text-slate-700 leading-relaxed">{event.note}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-slate-500 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate"><strong>Location:</strong> {event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate"><strong>Handler:</strong> {event.handler}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      <QRCodeModal
        produce={selectedProduceForQR}
        isOpen={!!selectedProduceForQR}
        onClose={() => setSelectedProduceForQR(null)}
      />
    </div>
  );
};
