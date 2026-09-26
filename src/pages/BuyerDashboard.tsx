import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Award, 
  Truck, 
  CreditCard, 
  Eye, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { Produce, BuyerOrder, UserSession } from '../types';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';

interface BuyerDashboardProps {
  produceList: Produce[];
  buyerOrders: BuyerOrder[];
  currentUser: UserSession;
  onNavigate: (page: string) => void;
  onViewTraceability: (produceId: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  produceList,
  buyerOrders,
  currentUser,
  onNavigate,
  onViewTraceability
}) => {
  const [supplierFilterCrop, setSupplierFilterCrop] = useState('Tomato');

  // Objective Recommended Suppliers matching Section 19 (Location, Quality, Price, Quantity, Availability)
  const recommendedSuppliers = [
    {
      id: 'SUP-01',
      name: 'Dharmapuri Horti Farmer Producer Co.',
      farmerLead: 'K. Murugesan & 420 Member Cultivators',
      crop: 'Tomato (Hybrid Round)',
      availableKg: 2500,
      qualityGrade: 'A',
      freshness: 92,
      pricePerKg: 26,
      distanceKm: 185,
      location: 'Palacode, Dharmapuri (Near NH-44)',
      matchScore: 98,
      matchCriteria: 'Optimal distance (185 km), Certified Grade-A, Immediate Reefer Ingress'
    },
    {
      id: 'SUP-02',
      name: 'Godavari Valley Kisan Producer Org',
      farmerLead: 'Sanjay B. Patil & 850 Farmers',
      crop: 'Onion (Nashik Red Medium)',
      availableKg: 6000,
      qualityGrade: 'A',
      freshness: 88,
      pricePerKg: 31,
      distanceKm: 165,
      location: 'Niphad, Nashik',
      matchScore: 94,
      matchCriteria: 'Lowest bulk procurement rate, Cured for 45-day storage life'
    },
    {
      id: 'SUP-03',
      name: 'Vaigai Valley Agro Producer Company',
      farmerLead: 'M. Selvaraj & 310 Farmers',
      crop: 'Banana (Grand Naine G9)',
      availableKg: 3500,
      qualityGrade: 'A',
      freshness: 91,
      pricePerKg: 24,
      distanceKm: 420,
      location: 'Cumbum, Theni',
      matchScore: 92,
      matchCriteria: 'Export quality caliber, unbroken pre-cooled packing'
    }
  ];

  const totalProcuredSpend = buyerOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-blue-800 rounded-xl">
              <ShoppingCart className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Institutional Buyer & Retailer Portal
              </h1>
              <p className="text-xs text-slate-500">
                Direct farm-to-shelf procurement with verified traceability, objective supplier ranking, and escrow security
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('marketplace')}
          className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Browse All Farm Lots</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 KPIs for Buyer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Purchase Orders"
          value={buyerOrders.length}
          unit="Orders"
          icon={<ShoppingCart className="w-5 h-5 text-blue-700" />}
          subtext="In execution"
        />

        <StatCard
          title="Escrow Secured Funds"
          value={`₹${(totalProcuredSpend / 100000).toFixed(2)}`}
          unit="Lakhs"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
          variant="agri"
          subtext="Protected settlement"
        />

        <StatCard
          title="Avg Produce Freshness"
          value="92.4%"
          unit="Grade A"
          change={+3.5}
          changeText="vs terminal mandis"
          icon={<Award className="w-5 h-5 text-agri-700" />}
          variant="agri"
        />

        <StatCard
          title="In-Transit Shipments"
          value="1"
          unit="Truck"
          icon={<Truck className="w-5 h-5 text-indigo-700" />}
          subtext="ETA today 12:45 PM"
          onClick={() => onNavigate('transport')}
        />
      </div>

      {/* Recommended Suppliers Matrix (Section 19: Location, Quality, Price, Quantity, Availability) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Objective Matching Engine
              </span>
              <h3 className="font-bold text-base text-slate-900 font-display">
                Recommended Verified Farm Suppliers
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked objectively based on transit distance, certified AGMARK grade, price per kg, and lot availability
            </p>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Zero discriminatory or opaque metrics
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendedSuppliers.map((sup) => (
            <div
              key={sup.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all shadow-2xs hover:shadow-card flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-display">{sup.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{sup.farmerLead}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
                    {sup.matchScore}% Match
                  </span>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Commodity:</span>
                    <span className="font-bold text-slate-800">{sup.crop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Available Lot:</span>
                    <span className="font-bold text-slate-900">{sup.availableKg.toLocaleString('en-IN')} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wholesale Price:</span>
                    <span className="font-bold text-agri-900">₹{sup.pricePerKg} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Distance / Location:</span>
                    <span className="font-medium text-slate-700">{sup.distanceKm} km ({sup.location.split('(')[0]})</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 mt-2 italic">
                  &ldquo;{sup.matchCriteria}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="w-full py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Issue Bulk PO</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Purchase Orders Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Purchase Orders & Delivery Status
            </h3>
            <p className="text-xs text-slate-500">Contracted lots, escrow settlements, and live logistics</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Commodity</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Unit Price</th>
                <th className="py-3 px-4 font-semibold">Total Amount</th>
                <th className="py-3 px-4 font-semibold">Payment Escrow</th>
                <th className="py-3 px-4 font-semibold">Logistics Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {buyerOrders.map((ord) => (
                <tr key={ord.orderId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{ord.orderId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{ord.cropName}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 font-display">
                    {ord.quantityKg.toLocaleString('en-IN')} kg
                  </td>
                  <td className="py-3 px-4 text-slate-700">₹{ord.pricePerKg}/kg</td>
                  <td className="py-3 px-4 font-extrabold text-agri-900 font-display">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={ord.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onViewTraceability(ord.produceId)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-4"
                    >
                      Track Traceability →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
