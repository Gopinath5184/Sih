import React, { useState } from 'react';
import { 
  Factory, 
  Plus, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';
import { ProcessingBatch, UserSession } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatCard } from '../components/common/StatCard';
import { stateService } from '../services/stateService';

interface ProcessingHubProps {
  batches: ProcessingBatch[];
  currentUser: UserSession;
  onNavigate: (page: string) => void;
}

export const ProcessingHub: React.FC<ProcessingHubProps> = ({
  batches,
  currentUser,
  onNavigate
}) => {
  const [selectedBatch, setSelectedBatch] = useState<ProcessingBatch>(batches[0]);
  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);

  // Form State
  const [formCrop, setFormCrop] = useState('Tomato');
  const [formInputQty, setFormInputQty] = useState<number>(4000);
  const [formProcessType, setFormProcessType] = useState('Tomato → Puree Concentrate → Ketchup');
  const [formOutputProduct, setFormOutputProduct] = useState('Double Concentrated Puree (28° Brix)');
  const [formFacility, setFormFacility] = useState('Cauvery Bio-Foods Processing Hub, Hosur');
  const [formOperator, setFormOperator] = useState(currentUser.name || 'Dr. Anand Kumar');

  const totalRawProcessed = batches.reduce((acc, b) => acc + b.rawProduceQuantityKg, 0);
  const totalFinishedOutput = batches.reduce((acc, b) => acc + b.outputQuantityKg, 0);
  const totalRevenue = batches.reduce((acc, b) => acc + b.estimatedRevenue, 0);

  const handleCreateBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yieldRatio = 0.28;
    const outputQty = Math.round(formInputQty * yieldRatio);
    const wasteQty = Math.round(formInputQty * 0.10);
    const estRev = outputQty * 105;

    const created = stateService.addProcessingBatch({
      facilityName: formFacility,
      location: 'Hosur SIPCOT Agri Corridor',
      rawProduceCrop: formCrop,
      rawProduceBatchId: 'AGR-2026-004582',
      rawProduceQuantityKg: Number(formInputQty),
      processType: formProcessType,
      status: 'processing',
      outputProduct: formOutputProduct,
      outputQuantityKg: outputQty,
      yieldPercent: 28.0,
      wasteKg: wasteQty,
      wasteType: `${formCrop} Pomace & Peel Residue`,
      wasteValorization: 'Upcycled into organic poultry feed & high-quercetin bio-extracts',
      estimatedRevenue: estRev,
      estimatedFinish: '24 Sep 2026, 06:00 PM',
      operator: formOperator
    });

    setIsNewBatchModalOpen(false);
    setSelectedBatch(created);
  };

  const steps = [
    { key: 'raw_received', label: 'Raw Material Received' },
    { key: 'processing', label: 'Thermal / Mechanical Processing' },
    { key: 'quality_check', label: 'Lab QA & Brix Check' },
    { key: 'packaging', label: 'Aseptic Packaging' },
    { key: 'ready_for_distribution', label: 'Ready for Distribution' }
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-100 text-purple-800 rounded-xl">
              <Factory className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Agro-Processing & Value Addition Hub
              </h1>
              <p className="text-xs text-slate-500">
                Converting surplus harvest & secondary grade produce into shelf-stable concentrates and zero-waste byproducts
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            Procure Surplus Produce
          </button>
          <button
            onClick={() => setIsNewBatchModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Processing Batch</span>
          </button>
        </div>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Raw Produce Processed"
          value={(totalRawProcessed / 1000).toFixed(1)}
          unit="MT"
          icon={<Factory className="w-5 h-5 text-purple-700" />}
          subtext="Grade B/surplus diverted"
        />

        <StatCard
          title="Finished Product Output"
          value={(totalFinishedOutput / 1000).toFixed(2)}
          unit="MT"
          icon={<Layers className="w-5 h-5 text-indigo-700" />}
          subtext="Puree & dehydrated flakes"
        />

        <StatCard
          title="Waste Valorization"
          value="94.2%"
          unit="Diverted"
          change={12.0}
          changeText="Zero field dumping"
          icon={<RefreshCw className="w-5 h-5 text-emerald-600" />}
          variant="agri"
        />

        <StatCard
          title="Value-Added Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(2)}`}
          unit="Lakhs"
          icon={<TrendingUp className="w-5 h-5 text-agri-700" />}
          variant="agri"
        />
      </div>

      {/* Main Grid: Batches List + Batch Pipeline Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Batches Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Active Processing Batches ({batches.length})
            </h3>
            <span className="text-[11px] text-slate-400">Select to monitor input/output balance</span>
          </div>

          <div className="divide-y divide-slate-100">
            {batches.map((batch) => {
              const isSelected = selectedBatch.batchId === batch.batchId;
              return (
                <div
                  key={batch.batchId}
                  onClick={() => setSelectedBatch(batch)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-purple-50/60 border-l-4 border-l-purple-700' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-purple-900">{batch.batchId}</span>
                        <StatusBadge status={batch.status} size="sm" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 font-display mt-1">
                        {batch.processType}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{batch.facilityName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 font-display">
                        {batch.rawProduceQuantityKg.toLocaleString('en-IN')} kg Raw
                      </span>
                      <span className="block text-[11px] text-emerald-700 font-medium">
                        → {batch.outputQuantityKg} kg Finished
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Batch Detailed Telemetry (5 cols) */}
        {selectedBatch && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Batch Deep-Dive
                </span>
                <span className="font-mono text-xs font-bold text-slate-800">{selectedBatch.batchId}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-2">
                {selectedBatch.outputProduct}
              </h3>
              <p className="text-xs text-slate-500">
                Operator: {selectedBatch.operator} &bull; Started: {selectedBatch.startDate}
              </p>
            </div>

            {/* Mass Balance Breakdown (Section 14: Input, Processing, Output, Waste, Revenue) */}
            <div className="space-y-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px] block">
                Mass Balance & Yield Accounting:
              </span>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[11px]">Raw Material Input:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedBatch.rawProduceQuantityKg.toLocaleString('en-IN')} kg</span>
                  <span className="text-[10px] text-slate-500 block">Lot {selectedBatch.rawProduceBatchId}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Finished Output Yield:</span>
                  <span className="font-bold text-emerald-800 text-sm">{selectedBatch.outputQuantityKg.toLocaleString('en-IN')} kg</span>
                  <span className="text-[10px] text-emerald-600 block">{selectedBatch.yieldPercent}% Conversion</span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Byproduct / Waste:</span>
                  <span className="font-bold text-amber-800 text-sm">{selectedBatch.wasteKg} kg</span>
                  <span className="text-[10px] text-slate-500 block">{selectedBatch.wasteType}</span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Projected Gross Revenue:</span>
                  <span className="font-bold text-agri-900 text-sm">₹{selectedBatch.estimatedRevenue.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-agri-600 block">Value Addition</span>
                </div>
              </div>

              {/* Byproduct Valorization Note */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-700">
                <span className="font-bold text-emerald-950 block mb-0.5">Circular Valorization Protocol:</span>
                <p className="text-[11px] leading-relaxed">{selectedBatch.wasteValorization}</p>
              </div>
            </div>

            {/* Step-by-Step Batch Timeline */}
            <div className="space-y-3 pt-2">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px] block">
                Processing Milestones:
              </span>
              <div className="space-y-2">
                {selectedBatch.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                    <div className="flex items-center gap-2">
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={step.completed ? 'text-slate-900 font-semibold' : 'text-slate-500'}>
                        {step.step}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{step.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create Batch */}
      {isNewBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">New Agro-Processing Batch</h3>
                <p className="text-xs text-purple-200/90">Initialize mass balance and yield accounting</p>
              </div>
              <button 
                onClick={() => setIsNewBatchModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatchSubmit} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Raw Produce Commodity</label>
                <select
                  value={formCrop}
                  onChange={(e) => setFormCrop(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                >
                  <option value="Tomato">Tomato (Surplus / Grade B)</option>
                  <option value="Onion">Onion (Dehydration Grade)</option>
                  <option value="Mango">Mango (Pulp & Nectar Grade)</option>
                  <option value="Potato">Potato (Chip & Flake Grade)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Raw Input Quantity (kg)</label>
                <input
                  type="number"
                  value={formInputQty}
                  onChange={(e) => setFormInputQty(Number(e.target.value))}
                  min="500"
                  step="100"
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Conversion Protocol</label>
                <input
                  type="text"
                  value={formProcessType}
                  onChange={(e) => setFormProcessType(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Finished Product</label>
                <input
                  type="text"
                  value={formOutputProduct}
                  onChange={(e) => setFormOutputProduct(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewBatchModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-bold shadow-xs"
                >
                  Start Batch Processing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
