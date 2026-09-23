import React, { useState } from 'react';
import { X, QrCode, Download, Printer, ShieldCheck, CheckCircle2, MapPin, Calendar, User, Building2 } from 'lucide-react';
import { Produce } from '../../types';
import { StatusBadge } from './StatusBadge';

interface QRCodeModalProps {
  produce: Produce | null;
  isOpen: boolean;
  onClose: () => void;
  onViewTraceability?: (produceId: string) => void;
  onShowToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  produce,
  isOpen,
  onClose,
  onViewTraceability,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'consumer'>('passport');
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isOpen || !produce) return null;

  const handleDownloadQR = () => {
    setIsDownloaded(true);
    if (onShowToast) {
      onShowToast(
        'QR Passport Downloaded',
        `Digital passport SVG for batch ${produce.id} saved to downloads.`,
        'success'
      );
    }
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-xs">
              <QrCode className="w-5 h-5 text-agri-200" />
            </div>
            <div>
              <h3 className="font-semibold font-display text-base">Digital Produce Passport</h3>
              <p className="text-xs text-agri-200/90 font-mono tracking-wider">{produce.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 text-xs font-medium">
          <button
            onClick={() => setActiveTab('passport')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'passport' 
                ? 'border-agri-700 text-agri-900 bg-white font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Batch QR Sticker
          </button>
          <button
            onClick={() => setActiveTab('consumer')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'consumer' 
                ? 'border-agri-700 text-agri-900 bg-white font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Consumer Scan Experience
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === 'passport' ? (
            <div className="space-y-5">
              {/* QR Box with realistic SVG matrix pattern */}
              <div className="p-4 bg-white rounded-xl border-2 border-dashed border-slate-300 text-center flex flex-col items-center justify-center">
                <div className="relative p-3 bg-white rounded-lg shadow-sm border border-slate-200">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-44 h-44 text-slate-900"
                    fill="currentColor"
                  >
                    {/* SVG QR Code Simulation with authentic Finder Patterns */}
                    <rect width="100" height="100" fill="white" />
                    {/* Top-Left Finder */}
                    <rect x="5" y="5" width="26" height="26" rx="2" fill="#0f172a" />
                    <rect x="9" y="9" width="18" height="18" rx="1" fill="white" />
                    <rect x="13" y="13" width="10" height="10" fill="#14532d" />
                    
                    {/* Top-Right Finder */}
                    <rect x="69" y="5" width="26" height="26" rx="2" fill="#0f172a" />
                    <rect x="73" y="9" width="18" height="18" rx="1" fill="white" />
                    <rect x="77" y="13" width="10" height="10" fill="#14532d" />
                    
                    {/* Bottom-Left Finder */}
                    <rect x="5" y="69" width="26" height="26" rx="2" fill="#0f172a" />
                    <rect x="9" y="73" width="18" height="18" rx="1" fill="white" />
                    <rect x="13" y="77" width="10" height="10" fill="#14532d" />

                    {/* Data Matrix Dots & Grid */}
                    <rect x="36" y="8" width="5" height="5" />
                    <rect x="46" y="8" width="5" height="5" />
                    <rect x="56" y="8" width="5" height="5" />
                    <rect x="36" y="18" width="5" height="5" />
                    <rect x="51" y="18" width="5" height="5" />
                    <rect x="41" y="26" width="5" height="5" />
                    <rect x="61" y="26" width="5" height="5" />
                    
                    {/* Middle grid */}
                    <rect x="8" y="36" width="5" height="5" />
                    <rect x="18" y="36" width="5" height="5" />
                    <rect x="28" y="36" width="5" height="5" />
                    <rect x="38" y="36" width="5" height="5" />
                    <rect x="48" y="36" width="5" height="5" />
                    <rect x="68" y="36" width="5" height="5" />
                    <rect x="78" y="36" width="5" height="5" />
                    <rect x="88" y="36" width="5" height="5" />

                    <rect x="13" y="46" width="5" height="5" />
                    <rect x="23" y="46" width="5" height="5" />
                    <rect x="33" y="46" width="5" height="5" />
                    <rect x="43" y="46" width="14" height="14" rx="2" fill="#15803d" />
                    <text x="45" y="56" fontSize="8" fill="white" fontWeight="bold">AF</text>
                    <rect x="63" y="46" width="5" height="5" />
                    <rect x="73" y="46" width="5" height="5" />
                    <rect x="83" y="46" width="5" height="5" />

                    <rect x="8" y="56" width="5" height="5" />
                    <rect x="28" y="56" width="5" height="5" />
                    <rect x="68" y="56" width="5" height="5" />
                    <rect x="88" y="56" width="5" height="5" />

                    <rect x="36" y="68" width="5" height="5" />
                    <rect x="46" y="68" width="5" height="5" />
                    <rect x="56" y="68" width="5" height="5" />
                    <rect x="76" y="68" width="5" height="5" />
                    <rect x="86" y="68" width="5" height="5" />

                    <rect x="36" y="78" width="5" height="5" />
                    <rect x="51" y="78" width="5" height="5" />
                    <rect x="66" y="78" width="5" height="5" />
                    <rect x="81" y="78" width="5" height="5" />

                    <rect x="41" y="88" width="5" height="5" />
                    <rect x="56" y="88" width="5" height="5" />
                    <rect x="71" y="88" width="5" height="5" />
                    <rect x="86" y="88" width="5" height="5" />
                  </svg>
                </div>
                <div className="mt-3 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-agri-800 bg-agri-100 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-agri-700" />
                    Government e-NAM & AgriFlow Verified
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Scan with any smartphone camera for full provenance</p>
                </div>
              </div>

              {/* Produce Summary Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-900 text-sm">{produce.cropName}</span>
                  <StatusBadge status={produce.qualityGrade} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="text-slate-400 block">Variety:</span>
                    <span className="font-medium text-slate-800">{produce.cropVariety}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Quantity:</span>
                    <span className="font-medium text-slate-800">{produce.quantityKg.toLocaleString('en-IN')} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Farmer:</span>
                    <span className="font-medium text-slate-800">{produce.farmerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location:</span>
                    <span className="font-medium text-slate-800">{produce.location.district}, {produce.location.state}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Consumer View Mockup */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-emerald-950 text-sm">Farm-to-Fork Verified Product</h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Directly traced from {produce.farmerName}'s farm in {produce.location.district}.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <User className="w-4 h-4 text-agri-700 shrink-0" />
                  <div>
                    <span className="text-slate-500 block">Cultivated By</span>
                    <span className="font-semibold text-slate-900">{produce.farmerName}</span>
                    <span className="text-slate-500 block text-[11px]">{produce.fpoName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <Calendar className="w-4 h-4 text-agri-700 shrink-0" />
                  <div>
                    <span className="text-slate-500 block">Harvest Date & Freshness</span>
                    <span className="font-semibold text-slate-900">{produce.harvestDate}</span>
                    <span className="text-emerald-700 font-medium block text-[11px]">{produce.freshnessPercent}% Freshness Index (Certified Grade {produce.qualityGrade})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <Building2 className="w-4 h-4 text-agri-700 shrink-0" />
                  <div>
                    <span className="text-slate-500 block">Storage & Cold Chain Protocol</span>
                    <span className="font-semibold text-slate-900">{produce.storageRequirement}</span>
                    <span className="text-slate-500 block text-[11px]">Unbroken cold chain monitored via IoT telemetry</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {onViewTraceability && (
            <button
              onClick={() => {
                onClose();
                onViewTraceability(produce.id);
              }}
              className="text-xs font-semibold text-agri-800 hover:text-agri-950 underline underline-offset-4"
            >
              View Full Timeline Journey →
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Sticker
            </button>
            <button
              onClick={handleDownloadQR}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-agri-800 text-white hover:bg-agri-900 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              {isDownloaded ? 'Downloaded ✓' : 'Download QR'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
