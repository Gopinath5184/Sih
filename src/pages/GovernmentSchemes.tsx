import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  ArrowRight,
  FileCheck,
  X
} from 'lucide-react';
import { GovernmentScheme } from '../types';

interface GovernmentSchemesProps {
  schemes: GovernmentScheme[];
  onNavigate: (page: string) => void;
}

export const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({
  schemes,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [applyModalScheme, setApplyModalScheme] = useState<GovernmentScheme | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.benefits.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesState = selectedState === 'All' || s.applicableStates.includes('All Indian States') || s.applicableStates.includes(selectedState);
    const matchesCrop = selectedCrop === 'All' || s.applicableCrops.includes('All Crops') || s.applicableCrops.includes(selectedCrop);

    return matchesSearch && matchesCategory && matchesState && matchesCrop;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Agri Schemes & Government Financial Support
              </h1>
              <p className="text-xs text-slate-500">
                Official central and state subsidies for cold storages, pack-houses, crop insurance, and micro-irrigation
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Verified Government Portal Integrations</span>
        </div>
      </div>

      {/* Search and Filters Bar (Section 21) */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search schemes (e.g. AIF, PMFBY)..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-agri-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
          >
            <option value="All">All Categories</option>
            <option value="Storage">Cold Storage & Silos</option>
            <option value="Insurance">Crop Insurance</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Technology">Technology & Micro-Irrigation</option>
            <option value="Financial">Direct Income Support</option>
          </select>

          {/* State Filter (Section 21 requirement) */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
          >
            <option value="All">All States</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>

          {/* Crop Filter (Section 21 requirement) */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
          >
            <option value="All">All Crops</option>
            <option value="Tomato">Tomato</option>
            <option value="Onion">Onion</option>
            <option value="Potato">Potato</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
          </select>
        </div>
      </div>

      {/* Schemes Cards Grid (Section 21) */}
      {filteredSchemes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No schemes match your selected filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your state, crop, or category selection to view central and state schemes.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedState('All');
              setSelectedCrop('All');
            }}
            className="px-4 py-2 rounded-xl bg-agri-800 text-white font-semibold text-xs transition-colors hover:bg-agri-900"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col justify-between space-y-4 hover:border-agri-400 hover:shadow-lift transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {scheme.shortCode}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 font-display mt-1">
                    {scheme.name}
                  </h3>
                  <p className="text-xs text-slate-500">{scheme.department}</p>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                  {scheme.status}
                </span>
              </div>

              {/* Benefits Section */}
              <div className="mt-4 p-3.5 rounded-xl bg-agri-50/60 border border-agri-200/80 text-xs">
                <span className="font-bold text-agri-950 block mb-1">Financial Benefits & Subsidy:</span>
                <p className="text-slate-800 leading-relaxed">{scheme.benefits}</p>
                {scheme.maxSubsidyAmount && (
                  <span className="inline-block mt-2 font-bold text-agri-900 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-agri-200">
                    Max Subvention: {scheme.maxSubsidyAmount}
                  </span>
                )}
              </div>

              {/* Eligibility & Documents Accordion / List */}
              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Eligibility Criteria:</span>
                  <ul className="space-y-1 text-slate-600">
                    {scheme.eligibility.map((el, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block mb-1">Required Documents:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.requiredDocuments.map((doc, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200/60">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <a
                href={scheme.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-agri-800 font-semibold"
              >
                <span>Official Govt Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setApplyModalScheme(scheme);
                  setAppliedSuccess(false);
                }}
                className="px-4 py-2 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold transition-colors shadow-2xs"
              >
                Apply via AgriFlow
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Apply Modal */}
      {applyModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">Scheme Application Support</h3>
                <p className="text-xs text-agri-200/90 font-mono">{applyModalScheme.shortCode}</p>
              </div>
              <button 
                onClick={() => setApplyModalScheme(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appliedSuccess ? (
              <div className="p-6 text-center space-y-4 text-xs">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-slate-900 font-display">
                  Application Queued for Department VAO Verification!
                </h4>
                <p className="font-mono text-slate-700">Application Token: AGRI-SCH-2026-9812</p>
                <p className="text-slate-500 leading-relaxed">
                  Your farmer profile and land registry records have been submitted for subvention clearance under {applyModalScheme.shortCode}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setApplyModalScheme(null)}
                    className="px-6 py-2.5 rounded-xl bg-agri-800 text-white font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="p-6 space-y-3.5 text-xs">
                <p className="text-slate-600">
                  Applying for <strong>{applyModalScheme.name}</strong> on behalf of registered farmer.
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">Verified Farmer KYC</span>
                  <p className="text-slate-600">Aadhaar Linked Bank Passbook: Active</p>
                  <p className="text-slate-600">Land Title: Patta / Chitta Verified (3.5 Acres)</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Project Proposal / Infrastructure Type</label>
                  <select className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option>On-Farm Cold Room (10 MT Capacity)</option>
                    <option>Micro-Irrigation & Fertigation Unit</option>
                    <option>Post-Harvest Sorting & Grading Line</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setApplyModalScheme(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-agri-800 hover:bg-agri-900 text-white font-bold shadow-xs"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
