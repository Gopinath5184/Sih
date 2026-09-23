import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  MapPin, 
  Thermometer, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  ShieldCheck, 
  Navigation,
  X
} from 'lucide-react';
import { Shipment, UserSession } from '../types';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { RouteMapVisualizer } from '../components/visualizer/RouteMapVisualizer';
import { stateService } from '../services/stateService';

interface TransportLogisticsProps {
  shipments: Shipment[];
  currentUser: UserSession;
  onNavigate: (page: string) => void;
}

export const TransportLogistics: React.FC<TransportLogisticsProps> = ({
  shipments,
  currentUser,
  onNavigate
}) => {
  const [isBookShipmentModalOpen, setIsBookShipmentModalOpen] = useState(false);

  // New Shipment Form State
  const [formProduceName, setFormProduceName] = useState('Tomato (Hybrid Sivam)');
  const [formQuantityKg, setFormQuantityKg] = useState<number>(2500);
  const [formOrigin, setFormOrigin] = useState('Tiruvannamalai Cold Hub');
  const [formDestination, setFormDestination] = useState('Chennai Koyambedu Terminal');
  const [formDistanceKm, setFormDistanceKm] = useState<number>(185);
  const [formVehicleNumber, setFormVehicleNumber] = useState('TN-25-AX-4819');
  const [formVehicleType, setFormVehicleType] = useState('Reefer Truck (Active Cooling @ 4.0°C)');
  const [formDriverName, setFormDriverName] = useState('S. Shanmugam');
  const [formDriverPhone, setFormDriverPhone] = useState('+91 97890 44102');

  const activeVehiclesCount = shipments.filter((s) => s.status === 'in_transit').length;
  const pendingCount = shipments.filter((s) => s.status === 'scheduled').length;
  const deliveredCount = shipments.filter((s) => s.status === 'delivered').length;
  const delayedCount = shipments.filter((s) => s.status === 'delayed').length;

  const handleBookShipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    stateService.addShipment({
      produceId: 'AGR-2026-004582',
      cropName: formProduceName,
      quantityKg: Number(formQuantityKg),
      origin: formOrigin,
      destination: formDestination,
      distanceKm: Number(formDistanceKm),
      vehicleNumber: formVehicleNumber,
      vehicleType: formVehicleType,
      driverName: formDriverName,
      driverPhone: formDriverPhone,
      status: 'in_transit',
      estimatedArrival: 'Today, 02:30 PM',
      currentLocation: `${formOrigin} Highway Entry`,
      temperatureC: 4.2
    });

    setIsBookShipmentModalOpen(false);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
              <Truck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Reefer Fleet & Logistics Management
              </h1>
              <p className="text-xs text-slate-500">
                End-to-end refrigerated transport tracking with IoT thermal telemetry and route optimization
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsBookShipmentModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Dispatch Reefer Shipment</span>
        </button>
      </div>

      {/* Top 4 Fleet Status Cards (Section 15) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active In-Transit Vehicles"
          value={activeVehiclesCount}
          unit="Fleet"
          change={14.0}
          changeText="Active runs"
          icon={<Truck className="w-5 h-5 text-indigo-700" />}
        />

        <StatCard
          title="Pending Dispatches"
          value={pendingCount}
          unit="Queued"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          subtext="Dock loading"
        />

        <StatCard
          title="Delivered Successfully"
          value={deliveredCount}
          unit="Shipments"
          change={100}
          changeText="Zero spoilage"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          variant="agri"
        />

        <StatCard
          title="Delayed Transit"
          value={delayedCount}
          unit="Alerts"
          icon={<AlertTriangle className="w-5 h-5 text-slate-400" />}
          subtext="On-time rating 99.2%"
        />
      </div>

      {/* Interactive Route Map & Chamber Telemetry Visualizer */}
      <RouteMapVisualizer shipments={shipments} />

      {/* Shipment Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900 font-display">
            Active Freight Consignments
          </h3>
          <span className="text-xs text-slate-500 font-medium">{shipments.length} Total Shipments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map((s) => (
            <div
              key={s.shipmentId}
              className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-900">{s.shipmentId}</span>
                    <h4 className="font-bold text-base text-slate-900 font-display mt-0.5">{s.cropName}</h4>
                    <p className="text-xs text-slate-500">{s.quantityKg.toLocaleString('en-IN')} kg &bull; {s.vehicleNumber}</p>
                  </div>
                  <StatusBadge status={s.status} size="sm" />
                </div>

                {/* Origin to Destination */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Origin:</span>
                    <span className="font-semibold text-slate-800">{s.origin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-semibold text-slate-800">{s.destination}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                    <span className="text-slate-500">Distance:</span>
                    <span className="font-medium text-slate-700">{s.distanceKm} km</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Progress:</span>
                    <span className="font-bold text-indigo-700">{s.progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{ width: `${s.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Driver & Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Driver:</span>
                  <span className="font-semibold text-slate-800">{s.driverName}</span>
                </div>

                <a
                  href={`tel:${s.driverPhone}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Call Driver</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Shipment Modal */}
      {isBookShipmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">Dispatch Reefer Shipment</h3>
                <p className="text-xs text-indigo-200/90">Book GPS & temperature monitored transit</p>
              </div>
              <button 
                onClick={() => setIsBookShipmentModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookShipmentSubmit} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Produce & Variety</label>
                <input
                  type="text"
                  value={formProduceName}
                  onChange={(e) => setFormProduceName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={formQuantityKg}
                    onChange={(e) => setFormQuantityKg(Number(e.target.value))}
                    min="100"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Est. Distance (km)</label>
                  <input
                    type="number"
                    value={formDistanceKm}
                    onChange={(e) => setFormDistanceKm(Number(e.target.value))}
                    min="10"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Origin Mandi / Hub</label>
                  <input
                    type="text"
                    value={formOrigin}
                    onChange={(e) => setFormOrigin(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination Mandi</label>
                  <input
                    type="text"
                    value={formDestination}
                    onChange={(e) => setFormDestination(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assigned Vehicle</label>
                <input
                  type="text"
                  value={formVehicleNumber}
                  onChange={(e) => setFormVehicleNumber(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Driver Name</label>
                  <input
                    type="text"
                    value={formDriverName}
                    onChange={(e) => setFormDriverName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Driver Phone</label>
                  <input
                    type="text"
                    value={formDriverPhone}
                    onChange={(e) => setFormDriverPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsBookShipmentModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-800 hover:bg-indigo-900 text-white font-bold shadow-xs"
                >
                  Confirm Dispatch & Generate Waybill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
