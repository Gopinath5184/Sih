import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Warehouse, 
  ShoppingBag, 
  Truck, 
  CheckCheck, 
  AlertCircle,
  Award,
  Flame,
  AlertTriangle
} from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', size = 'md' }) => {
  const norm = status.toLowerCase();
  const px = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  if (norm === 'harvested') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${px} ${className}`}>
        <Clock className="w-3.5 h-3.5 text-emerald-600" />
        Harvested
      </span>
    );
  }

  if (norm === 'quality_checked' || norm === 'quality checked') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 ${px} ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
        Quality Checked
      </span>
    );
  }

  if (norm === 'stored' || norm === 'in storage') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200/80 ${px} ${className}`}>
        <Warehouse className="w-3.5 h-3.5 text-cyan-600" />
        Stored
      </span>
    );
  }

  if (norm === 'listed' || norm === 'listed for sale') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${px} ${className}`}>
        <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
        Listed on Market
      </span>
    );
  }

  if (norm === 'sold') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 ${px} ${className}`}>
        <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
        Sold
      </span>
    );
  }

  if (norm === 'in_transit' || norm === 'in transit') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200/80 ${px} ${className}`}>
        <Truck className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
        In Transit
      </span>
    );
  }

  if (norm === 'delivered') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${px} ${className}`}>
        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
        Delivered
      </span>
    );
  }

  if (norm === 'processing') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200/80 ${px} ${className}`}>
        <Flame className="w-3.5 h-3.5 text-purple-600" />
        Processing
      </span>
    );
  }

  if (norm === 'a' || norm === 'grade a') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-md bg-agri-100 text-agri-900 font-semibold border border-agri-300 ${px} ${className}`}>
        <Award className="w-3.5 h-3.5 text-agri-700" />
        Grade A
      </span>
    );
  }

  if (norm === 'b' || norm === 'grade b') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-md bg-amber-100 text-amber-900 font-semibold border border-amber-300 ${px} ${className}`}>
        <Award className="w-3.5 h-3.5 text-amber-700" />
        Grade B
      </span>
    );
  }

  if (norm === 'c' || norm === 'grade c') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-md bg-stone-100 text-stone-800 font-semibold border border-stone-300 ${px} ${className}`}>
        <Award className="w-3.5 h-3.5 text-stone-600" />
        Grade C
      </span>
    );
  }

  if (norm === 'critical' || norm === 'warning') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 ${px} ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
        {status}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${px} ${className}`}>
      <AlertCircle className="w-3 h-3 text-slate-500" />
      {status}
    </span>
  );
};
