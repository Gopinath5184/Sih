import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  ShoppingCart, 
  CheckCircle2, 
  Eye, 
  ArrowUpDown, 
  SlidersHorizontal,
  X,
  CreditCard
} from 'lucide-react';
import { Produce, QualityGrade, UserSession } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { stateService } from '../services/stateService';

interface MarketplaceProps {
  produceList: Produce[];
  currentUser: UserSession;
  onViewTraceability: (produceId: string) => void;
  onOrderPlaced?: (orderId: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  produceList,
  currentUser,
  onViewTraceability,
  onOrderPlaced
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'buy' | 'sell' | 'wholesale' | 'processing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [sortBy, setSortBy] = useState<'price_low' | 'price_high' | 'quantity' | 'newest'>('newest');
  
  // Modals
  const [selectedProduceForQR, setSelectedProduceForQR] = useState<Produce | null>(null);
  const [buyProduceModal, setBuyProduceModal] = useState<Produce | null>(null);
  const [contactSellerModal, setContactSellerModal] = useState<Produce | null>(null);

  // Buy form state
  const [orderQuantityKg, setOrderQuantityKg] = useState<number>(1000);
  const [buyerDeliveryAddress, setBuyerDeliveryAddress] = useState('FreshMart Central Distribution Center, Koyambedu, Chennai');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  // Filter listings
  const filteredListings = produceList.filter((item) => {
    if (activeTab === 'wholesale' && !item.wholesaleLot) return false;
    if (activeTab === 'processing' && item.qualityGrade !== 'B' && item.qualityGrade !== 'C') return false;

    const matchesSearch = 
      item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cropVariety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrop = selectedCrop === 'All' || item.cropName.toLowerCase() === selectedCrop.toLowerCase();
    const matchesGrade = selectedGrade === 'All' || item.qualityGrade === selectedGrade;
    const matchesState = selectedState === 'All' || item.location.state === selectedState;

    return matchesSearch && matchesCrop && matchesGrade && matchesState;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.currentMarketPricePerKg - b.currentMarketPricePerKg;
    if (sortBy === 'price_high') return b.currentMarketPricePerKg - a.currentMarketPricePerKg;
    if (sortBy === 'quantity') return b.quantityKg - a.quantityKg;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyProduceModal) return;

    const total = orderQuantityKg * buyProduceModal.currentMarketPricePerKg;
    const order = stateService.addBuyerOrder({
      produceId: buyProduceModal.id,
      cropName: buyProduceModal.cropName,
      buyerName: currentUser.name,
      buyerCompany: currentUser.organization || 'Institutional Supermarket Procurement',
      buyerType: 'Retail Supermarket',
      quantityKg: orderQuantityKg,
      pricePerKg: buyProduceModal.currentMarketPricePerKg,
      totalAmount: total,
      deliveryLocation: buyerDeliveryAddress
    });

    setOrderSuccessId(order.orderId);
    if (onOrderPlaced) onOrderPlaced(order.orderId);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-agri-100 text-agri-800 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Smart Agricultural Marketplace
              </h1>
              <p className="text-xs text-slate-500">
                Direct trade between farmers, FPOs, food processors, and institutional supermarket buyers
              </p>
            </div>
          </div>
        </div>

        {/* Escrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>AgriFlow Secured Escrow & Instant Payout</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'all', label: 'All Listings' },
          { id: 'buy', label: 'Direct Buy' },
          { id: 'wholesale', label: 'Wholesale Mandi Lots' },
          { id: 'processing', label: 'Processing Demand / Grade B' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-agri-800 text-agri-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters and Sorting Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, variety, district..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-agri-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Crop Filter */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
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

          {/* Grade Filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
          >
            <option value="All">All Grades</option>
            <option value="A">Grade A (Premium)</option>
            <option value="B">Grade B (Standard)</option>
            <option value="C">Grade C</option>
          </select>

          {/* State Filter */}
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
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="quantity">Largest Quantity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Produce Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No produce listings match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try loosening the crop, quality grade, or state filters to view available farm lots.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCrop('All');
              setSelectedGrade('All');
              setSelectedState('All');
            }}
            className="px-4 py-2 rounded-xl bg-agri-800 text-white font-semibold text-xs transition-colors hover:bg-agri-900"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-lift transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Image + Badges */}
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.cropName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <StatusBadge status={item.qualityGrade} size="sm" />
                {item.wholesaleLot && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-white backdrop-blur-xs">
                    Bulk Lot
                  </span>
                )}
              </div>
              <div className="absolute bottom-2.5 right-2.5">
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-white/90 text-slate-900 shadow-xs backdrop-blur-xs">
                  {item.id}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-base text-slate-900 font-display">
                    {item.cropName}
                  </h3>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-agri-900 font-display">
                      ₹{item.currentMarketPricePerKg}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/kg</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 truncate mt-0.5">{item.cropVariety}</p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.location.district}, {item.location.state}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Harvested: {item.harvestDate} ({item.remainingShelfLifeDays}d shelf life)</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] mt-2 font-medium">
                    <span className="text-slate-500">Available Stock:</span>
                    <span className="font-bold text-slate-900">{item.quantityKg.toLocaleString('en-IN')} kg</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedProduceForQR(item)}
                  className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  title="View Passport & QR"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setContactSellerModal(item)}
                  className="flex-1 py-2 px-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </button>

                <button
                  onClick={() => {
                    setBuyProduceModal(item);
                    setOrderQuantityKg(Math.min(1000, item.quantityKg));
                    setOrderSuccessId(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Buy Modal Dialog */}
      {buyProduceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">Create Purchase Order</h3>
                <p className="text-xs text-agri-200/90 font-mono">Lot {buyProduceModal.id}</p>
              </div>
              <button 
                onClick={() => setBuyProduceModal(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSuccessId ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-base font-display">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-slate-600 font-mono font-bold">
                  Order ID: {orderSuccessId}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your funds are secured in AgriFlow Escrow. Reefer logistics pickup has been queued for {buyProduceModal.farmerName}'s lot.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setBuyProduceModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-agri-800 text-white font-bold text-xs shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrderSubmit} className="p-6 space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{buyProduceModal.cropName}</span>
                    <p className="text-slate-500">{buyProduceModal.cropVariety} &bull; {buyProduceModal.location.district}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-agri-900">₹{buyProduceModal.currentMarketPricePerKg}/kg</span>
                    <span className="block text-[11px] text-slate-400">Available: {buyProduceModal.quantityKg} kg</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Purchase Quantity (kg)</label>
                  <input
                    type="number"
                    value={orderQuantityKg}
                    onChange={(e) => setOrderQuantityKg(Number(e.target.value))}
                    max={buyProduceModal.quantityKg}
                    min="100"
                    step="50"
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination Delivery Address</label>
                  <input
                    type="text"
                    value={buyerDeliveryAddress}
                    onChange={(e) => setBuyerDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>

                <div className="p-3 bg-agri-50 rounded-xl border border-agri-200 space-y-1.5">
                  <div className="flex justify-between text-slate-700">
                    <span>Produce Amount:</span>
                    <span className="font-semibold">₹{(orderQuantityKg * buyProduceModal.currentMarketPricePerKg).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Reefer Freight & Inspection:</span>
                    <span className="font-semibold text-emerald-700">Included via AIF Subsidy</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold border-t border-agri-200 pt-1 text-sm">
                    <span>Total Payable:</span>
                    <span className="text-agri-900">₹{(orderQuantityKg * buyProduceModal.currentMarketPricePerKg).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBuyProduceModal(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-agri-800 hover:bg-agri-900 text-white font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Confirm Escrow Order</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Contact Seller Modal */}
      {contactSellerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-agri-100 text-agri-800 flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base font-display">Contact Cultivator / FPO</h4>
              <p className="text-xs text-slate-500 mt-1">{contactSellerModal.farmerName}</p>
              <p className="text-xs font-semibold text-agri-800">{contactSellerModal.fpoName}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 block text-[11px]">Direct Mobile:</span>
              <a href={`tel:${contactSellerModal.farmerPhone}`} className="text-sm font-bold text-slate-900 hover:text-agri-800">
                {contactSellerModal.farmerPhone}
              </a>
            </div>

            <button
              onClick={() => setContactSellerModal(null)}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      <QRCodeModal
        produce={selectedProduceForQR}
        isOpen={!!selectedProduceForQR}
        onClose={() => setSelectedProduceForQR(null)}
        onViewTraceability={onViewTraceability}
      />
    </div>
  );
};
