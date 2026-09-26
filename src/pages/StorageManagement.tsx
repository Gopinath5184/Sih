import React, { useState } from 'react';
import { 
  Warehouse, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  Activity,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { StorageFacility } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';

interface StorageManagementProps {
  storageFacilities: StorageFacility[];
  onNavigate: (page: string) => void;
}

export const StorageManagement: React.FC<StorageManagementProps> = ({
  storageFacilities,
  onNavigate
}) => {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(storageFacilities[0]?.id || 'store-cs-01');

  const activeFacility = storageFacilities.find((s) => s.id === selectedFacilityId) || storageFacilities[0];
  const occupancyPercent = ((activeFacility.occupiedKg / activeFacility.capacityKg) * 100).toFixed(1);

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-cyan-100 text-cyan-800 rounded-xl">
              <Warehouse className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Smart Storage & Cold Chain Management
              </h1>
              <p className="text-xs text-slate-500">
                Precision IoT sensor telemetry for cold chambers, dry warehouses, and hermetic grain silos
              </p>
            </div>
          </div>
        </div>

        {/* Facility selector */}
        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
          {storageFacilities.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFacilityId(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                f.id === selectedFacilityId
                  ? 'bg-agri-900 text-white border-agri-900 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.name.split(' ')[0]} {f.type === 'cold_storage' ? 'Cold Hub' : 'Warehouse'}
            </button>
          ))}
        </div>
      </div>

      {/* Critical Stock Alerts Bar (Section 12 requirement) */}
      <div className="space-y-2.5">
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-pulse-soft">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-950">Shelf-Life Risk Alert: </span>
              <span className="text-amber-900">
                1,200 kg of hybrid tomatoes approaching 4-day shelf-life limit in Bay 3. Early market allocation advised.
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('marketplace')}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs"
          >
            Allocate to Marketplace →
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-rose-100 text-rose-800 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-rose-900">
              <strong>Capacity Warning:</strong> Vellore Central Warehouse is at 87% occupied capacity (21,800 kg / 25,000 kg). Divert upcoming grain lots to Tiruvannamalai Silo.
            </span>
          </div>

          <button
            onClick={() => onNavigate('transport')}
            className="text-rose-800 font-bold underline shrink-0 hover:text-rose-950"
          >
            Reroute Logistics
          </button>
        </div>
      </div>

      {/* Facility Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storageFacilities.map((facility) => {
          const occ = ((facility.occupiedKg / facility.capacityKg) * 100).toFixed(0);
          const isSelected = facility.id === selectedFacilityId;
          return (
            <div
              key={facility.id}
              onClick={() => setSelectedFacilityId(facility.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white ${
                isSelected
                  ? 'border-agri-600 ring-2 ring-agri-500/20 shadow-lift'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-card'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    {facility.code}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 font-display mt-0.5">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-slate-500">{facility.location}</p>
                </div>
                <StatusBadge status={facility.status} size="sm" />
              </div>

              {/* Progress Occupancy */}
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Capacity Occupancy:</span>
                  <span className={Number(occ) > 80 ? 'text-amber-700' : 'text-slate-900'}>
                    {facility.occupiedKg.toLocaleString('en-IN')} / {facility.capacityKg.toLocaleString('en-IN')} kg ({occ}%)
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      Number(occ) > 80 ? 'bg-amber-500' : 'bg-agri-600'
                    }`}
                    style={{ width: `${occ}%` }}
                  />
                </div>
              </div>

              {/* Environmental Telemetry Metrics */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900 font-display block mt-1">
                    {facility.temperatureC}°C
                  </span>
                  <span className="text-[10px] text-slate-400">Target: {facility.targetTemperatureC}°C</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>Humidity</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900 font-display block mt-1">
                    {facility.humidityPercent}%
                  </span>
                  <span className="text-[10px] text-slate-400">Target: {facility.targetHumidityPercent}% RH</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sensor History Graphs: Temperature & Humidity (Section 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Graph */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-display">
                  Live Thermal Sensor Curve (°C)
                </h3>
                <p className="text-xs text-slate-500">{activeFacility.name}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {activeFacility.temperatureC}°C Current
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeFacility.sensorHistory}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis unit="°C" domain={[0, 30]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`${val}°C`, 'Chamber Temp']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#e11d48"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Graph */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-display">
                  Relative Humidity Sensor Curve (% RH)
                </h3>
                <p className="text-xs text-slate-500">{activeFacility.name}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {activeFacility.humidityPercent}% RH
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeFacility.sensorHistory}>
                <defs>
                  <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis unit="%" domain={[30, 90]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`${val}% RH`, 'Relative Humidity']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#humGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
