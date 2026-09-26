import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  QrCode, 
  Eye, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Warehouse, 
  DollarSign,
  ChevronRight,
  Upload,
  X
} from 'lucide-react';
import { Produce, QualityGrade, ProduceStatus, UserSession } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { stateService } from '../services/stateService';

interface ProduceManagementProps {
  produceList: Produce[];
  currentUser: UserSession;
  onViewTraceability: (produceId: string) => void;
  isAddModalOpenInitially?: boolean;
}

export const ProduceManagement: React.FC<ProduceManagementProps> = ({
  produceList,
  currentUser,
  onViewTraceability,
  isAddModalOpenInitially = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [activeProduceForTimeline, setActiveProduceForTimeline] = useState<Produce>(produceList[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(isAddModalOpenInitially);
  const [selectedProduceForQR, setSelectedProduceForQR] = useState<Produce | null>(null);

  // Form State for Add Produce
  const [formCropName, setFormCropName] = useState('Tomato');
  const [formVariety, setFormVariety] = useState('Sivam Hybrid Round');
  const [formQuantityKg, setFormQuantityKg] = useState<number>(2500);
  const [formHarvestDate, setFormHarvestDate] = useState('2026-09-22');
  const [formShelfLifeDays, setFormShelfLifeDays] = useState<number>(8);
  const [formQualityGrade, setFormQualityGrade] = useState<QualityGrade>('A');
  const [formFreshnessPercent, setFormFreshnessPercent] = useState<number>(94);
  const [formDistrict, setFormDistrict] = useState('Dharmapuri');
  const [formState, setFormState] = useState('Tamil Nadu');
  const [formVillage, setFormVillage] = useState('Palacode');
  const [formStorageReq, setFormStorageReq] = useState('Cold Storage (4°C – 6°C, 85% RH)');
  const [formExpectedPrice, setFormExpectedPrice] = useState<number>(26);
  const [formWholesale, setFormWholesale] = useState<boolean>(true);

  const filteredProduce = produceList.filter((p) => {
    const matchesSearch = 
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cropVariety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCropFilter === 'All' || p.cropName.toLowerCase() === selectedCropFilter.toLowerCase();
    const matchesStatus = selectedStatusFilter === 'All' || p.status.toLowerCase() === selectedStatusFilter.toLowerCase();
    return matchesSearch && matchesCrop && matchesStatus;
  });

  const handleAddProduceSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = stateService.addProduce({
      cropName: formCropName,
      cropVariety: formVariety,
      quantityKg: Number(formQuantityKg),
      harvestDate: formHarvestDate,
      shelfLifeDays: Number(formShelfLifeDays),
      remainingShelfLifeDays: Number(formShelfLifeDays),
      qualityGrade: formQualityGrade,
      freshnessPercent: formFreshnessPercent,
      defectProbability: formQualityGrade === 'A' ? 5 : 12,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      fpoName: currentUser.organization || 'Dharmapuri Horti Farmer Producer Co.',
      location: {
        village: formVillage,
        district: formDistrict,
        state: formState
      },
      storageRequirement: formStorageReq,
      expectedPricePerKg: Number(formExpectedPrice),
      currentMarketPricePerKg: Number(formExpectedPrice) + 1.5,
      status: 'harvested',
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      listedForSale: true,
      wholesaleLot: formWholesale
    });

    setIsAddModalOpen(false);
    setActiveProduceForTimeline(created);
  };

  const timelineStages = [
    { key: 'harvested', label: 'Harvested' },
    { key: 'quality_checked', label: 'Quality Checked' },
    { key: 'stored', label: 'Stored' },
    { key: 'listed', label: 'Listed' },
    { key: 'sold', label: 'Sold' }
  ];

  const getStageStatus = (stageKey: string, currentStatus: ProduceStatus) => {
    const order = ['harvested', 'quality_checked', 'stored', 'listed', 'sold', 'in_transit', 'delivered'];
    const currentIndex = order.indexOf(currentStatus);
    const stageIndex = order.indexOf(stageKey);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-agri-100 text-agri-800 rounded-xl">
              <Package className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Produce Lifecycle Management
              </h1>
              <p className="text-xs text-slate-500">
                Register harvest batches, generate unique Produce IDs, track shelf-life, and view farm-to-market progression
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Produce</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Produce ID, Crop, Farmer..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-agri-600 focus:ring-1 focus:ring-agri-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Crop:</span>
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
            >
              <option value="All">All Crops</option>
              <option value="Tomato">Tomato</option>
              <option value="Onion">Onion</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Potato">Potato</option>
              <option value="Mango">Mango</option>
              <option value="Banana">Banana</option>
              <option value="Cotton">Cotton</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="harvested">Harvested</option>
              <option value="stored">Stored</option>
              <option value="listed">Listed</option>
              <option value="in_transit">In Transit</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Produce List + Selected Produce Lifecycle Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Produce Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Registered Lots ({filteredProduce.length})
            </h3>
            <span className="text-[11px] text-slate-400">Click a row to preview stage timeline</span>
          </div>

          <div className="overflow-x-auto divide-y divide-slate-100">
            {filteredProduce.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="font-bold text-slate-700 text-sm">No produce records found</p>
                <p className="text-xs text-slate-500">No batches match the selected filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCropFilter('All');
                    setSelectedStatusFilter('All');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-agri-800 text-white text-xs font-semibold mt-1"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredProduce.map((p) => {
                const isSelected = activeProduceForTimeline?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveProduceForTimeline(p)}
                    className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                      isSelected ? 'bg-agri-50/70 border-l-4 border-l-agri-700' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-agri-950">{p.id}</span>
                        <StatusBadge status={p.qualityGrade} size="sm" />
                        <StatusBadge status={p.status} size="sm" />
                      </div>
                      <p className="font-bold text-sm text-slate-900 font-display">
                        {p.cropName} &bull; <span className="text-xs font-normal text-slate-500">{p.cropVariety}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        {p.quantityKg.toLocaleString('en-IN')} kg &bull; {p.location.district}, {p.location.state}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduceForQR(p);
                        }}
                        className="p-2 rounded-lg text-slate-600 hover:text-agri-800 hover:bg-slate-200/60 transition-colors"
                        title="View QR Passport"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewTraceability(p.id);
                        }}
                        className="p-2 rounded-lg text-slate-600 hover:text-agri-800 hover:bg-slate-200/60 transition-colors"
                        title="Inspect Full Journey"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Lot Visual Timeline Tracker (5 cols) */}
        {activeProduceForTimeline && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-agri-700 bg-agri-100 px-2.5 py-0.5 rounded-full">
                  Batch Lifecycle Timeline
                </span>
                <span className="font-mono text-xs font-bold text-slate-800">{activeProduceForTimeline.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-2">
                {activeProduceForTimeline.cropName} ({activeProduceForTimeline.cropVariety})
              </h3>
              <p className="text-xs text-slate-500">
                Harvested: {activeProduceForTimeline.harvestDate} &bull; Expected Price: ₹{activeProduceForTimeline.expectedPricePerKg}/kg
              </p>
            </div>

            {/* Visual Step-by-Step Highway Indicator */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Stage Progression:
              </span>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {timelineStages.map((stage) => {
                  const stageStatus = getStageStatus(stage.key as ProduceStatus, activeProduceForTimeline.status);
                  return (
                    <div key={stage.key} className="relative">
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                        stageStatus === 'completed'
                          ? 'bg-emerald-600'
                          : stageStatus === 'active'
                          ? 'bg-agri-800 ring-4 ring-agri-200 animate-pulse'
                          : 'bg-slate-300'
                      }`}>
                        {stageStatus === 'completed' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${stageStatus !== 'upcoming' ? 'text-slate-900 font-display' : 'text-slate-400'}`}>
                          {stage.label}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {stageStatus === 'completed' ? 'Verified and recorded' : stageStatus === 'active' ? 'Current Operational Milestone' : 'Awaiting completion'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions for Selected Lot */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setSelectedProduceForQR(activeProduceForTimeline)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Show QR Sticker</span>
              </button>
              <button
                onClick={() => onViewTraceability(activeProduceForTimeline.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-agri-800 hover:bg-agri-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Trace</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Produce Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">Register Agricultural Produce</h3>
                <p className="text-xs text-agri-200/90">Issue digital lot passport and initiate smart cold chain tracking</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddProduceSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Crop Name</label>
                  <select
                    value={formCropName}
                    onChange={(e) => setFormCropName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-medium"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Onion">Onion</option>
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Potato">Potato</option>
                    <option value="Mango">Mango</option>
                    <option value="Banana">Banana</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Crop Variety</label>
                  <input
                    type="text"
                    value={formVariety}
                    onChange={(e) => setFormVariety(e.target.value)}
                    placeholder="e.g. Sivam Hybrid Round"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={formQuantityKg}
                    onChange={(e) => setFormQuantityKg(Number(e.target.value))}
                    min="50"
                    step="50"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harvest Date</label>
                  <input
                    type="date"
                    value={formHarvestDate}
                    onChange={(e) => setFormHarvestDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Shelf Life (Days)</label>
                  <input
                    type="number"
                    value={formShelfLifeDays}
                    onChange={(e) => setFormShelfLifeDays(Number(e.target.value))}
                    min="2"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">AGMARK Quality Grade</label>
                  <select
                    value={formQualityGrade}
                    onChange={(e) => setFormQualityGrade(e.target.value as QualityGrade)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                  >
                    <option value="A">Grade A (Certified Table / Export)</option>
                    <option value="B">Grade B (Standard Mandi)</option>
                    <option value="C">Grade C (Processing / Secondary)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Expected Price (₹/kg)</label>
                  <input
                    type="number"
                    value={formExpectedPrice}
                    onChange={(e) => setFormExpectedPrice(Number(e.target.value))}
                    min="1"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Village / Farm</label>
                  <input
                    type="text"
                    value={formVillage}
                    onChange={(e) => setFormVillage(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">District</label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Storage Requirement</label>
                <input
                  type="text"
                  value={formStorageReq}
                  onChange={(e) => setFormStorageReq(e.target.value)}
                  placeholder="e.g. Cold Storage (4°C – 6°C, 85% RH)"
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formWholesale}
                    onChange={(e) => setFormWholesale(e.target.checked)}
                    className="rounded text-agri-700 focus:ring-agri-600"
                  />
                  <span className="font-medium text-slate-700">List on B2B Wholesale Marketplace</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-agri-800 hover:bg-agri-900 text-white font-bold shadow-xs"
                >
                  Register Produce & Generate ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal */}
      <QRCodeModal
        produce={selectedProduceForQR}
        isOpen={!!selectedProduceForQR}
        onClose={() => setSelectedProduceForQR(null)}
        onViewTraceability={onViewTraceability}
      />
    </div>
  );
};
