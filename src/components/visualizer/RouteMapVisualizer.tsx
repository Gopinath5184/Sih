import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Thermometer, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  AlertCircle,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { Shipment } from '../../types';

interface RouteMapVisualizerProps {
  shipments: Shipment[];
}

export const RouteMapVisualizer: React.FC<RouteMapVisualizerProps> = ({ shipments }) => {
  const [selectedId, setSelectedId] = useState<string>(shipments[0]?.shipmentId || 'AGT-20382');

  const activeShipment = shipments.find((s) => s.shipmentId === selectedId) || shipments[0];

  if (!activeShipment) return null;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            <Navigation className="w-3.5 h-3.5" />
            Live Cold-Chain Telemetry
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display mt-2">
            Active Fleet Transit & Temperature Tracker
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Simulated IoT telemetry displaying real-time vehicle coordinates, checkpoint timestamps, and chamber thermal status
          </p>
        </div>

        {/* Shipment Selector */}
        <div className="flex flex-wrap gap-2">
          {shipments.map((s) => (
            <button
              key={s.shipmentId}
              onClick={() => setSelectedId(s.shipmentId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                s.shipmentId === selectedId
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {s.shipmentId} ({s.cropName.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visual Map + Telemetry Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Visual Map Canvas / Schematic */}
        <div className="lg:col-span-2 bg-slate-950 rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[360px] border border-slate-800 shadow-inner">
          {/* Subtle Grid Lines to represent GPS map */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* Map Top Status Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                GPS Satellite Lock: Active (8 Satellites)
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Chamber Sensor ID: CS-TH-4819
            </span>
          </div>

          {/* Simulated Route Schematic SVG */}
          <div className="relative z-10 my-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                {activeShipment.origin}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {activeShipment.distanceKm} KM Corridor
              </span>
              <span className="flex items-center gap-1 text-indigo-300">
                <MapPin className="w-3.5 h-3.5" />
                {activeShipment.destination}
              </span>
            </div>

            {/* Progress Route Bar */}
            <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 transition-all duration-700 rounded-full"
                style={{ width: `${activeShipment.progressPercent}%` }}
              />
            </div>

            {/* Floating Vehicle Indicator */}
            <div 
              className="relative -mt-2 transition-all duration-700 flex flex-col items-center"
              style={{ left: `calc(${Math.min(Math.max(activeShipment.progressPercent, 8), 92)}% - 20px)` }}
            >
              <div className="p-2 bg-indigo-600 rounded-full text-white shadow-lift border-2 border-white animate-bounce-short">
                <Truck className="w-4 h-4" />
              </div>
              <div className="bg-slate-900/90 text-[10px] text-white px-2 py-0.5 rounded border border-slate-700 mt-1 whitespace-nowrap shadow-sm">
                {activeShipment.vehicleNumber}
              </div>
            </div>
          </div>

          {/* Map Footer Bar: Current Location & Speed */}
          <div className="relative z-10 p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Current Location:</span>
              <span className="font-semibold text-white">{activeShipment.currentLocation}</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-slate-400 block text-[11px]">Estimated ETA:</span>
                <span className="font-semibold text-emerald-400">{activeShipment.estimatedArrival}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Cruising Speed:</span>
                <span className="font-mono text-white font-semibold">58 km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Sidebar */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Temperature Widget */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-100 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Chamber Temperature</h4>
                  <p className="text-[11px] text-slate-500">Live IoT thermal telemetry</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                Optimal
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900 font-display">
                  {activeShipment.temperatureC !== undefined ? `${activeShipment.temperatureC}°C` : 'Amb. 24°C'}
                </span>
                <span className="text-xs text-slate-500 ml-2">Target: 4.0°C &plusmn; 0.5°C</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                Unbroken
              </span>
            </div>
          </div>

          {/* Shipment & Driver Info */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Freight Manifest</h4>
            
            <div className="flex justify-between pb-1.5 border-b border-slate-200">
              <span className="text-slate-500">Cargo:</span>
              <span className="font-semibold text-slate-800">{activeShipment.quantityKg.toLocaleString('en-IN')} kg {activeShipment.cropName}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-slate-200">
              <span className="text-slate-500">Vehicle Type:</span>
              <span className="font-medium text-slate-800">{activeShipment.vehicleType}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-slate-200">
              <span className="text-slate-500">Driver:</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                {activeShipment.driverName}
                <a href={`tel:${activeShipment.driverPhone}`} className="text-indigo-600 hover:text-indigo-800">
                  <PhoneCall className="w-3 h-3" />
                </a>
              </span>
            </div>
          </div>

          {/* Checkpoint Timeline */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Enroute Checkpoints</h4>
            <div className="space-y-3">
              {activeShipment.checkpoints.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {cp.reached ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${cp.reached ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                      {cp.name}
                    </p>
                    {cp.time && <span className="text-[10px] text-slate-400">{cp.time}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
