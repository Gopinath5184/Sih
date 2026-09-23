import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeText?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'agri' | 'earth' | 'warning';
  subtext?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  changeText,
  icon,
  variant = 'default',
  subtext,
  onClick
}) => {
  const getChangeColor = () => {
    if (change === undefined) return 'text-slate-500';
    if (change > 0) return 'text-emerald-700 bg-emerald-50';
    if (change < 0) return 'text-rose-700 bg-rose-50';
    return 'text-slate-600 bg-slate-100';
  };

  const getCardStyle = () => {
    switch (variant) {
      case 'agri':
        return 'border-agri-200/80 hover:border-agri-300 bg-gradient-to-br from-white to-agri-50/40';
      case 'earth':
        return 'border-earth-200/80 hover:border-earth-300 bg-gradient-to-br from-white to-earth-50/40';
      case 'warning':
        return 'border-amber-200/80 hover:border-amber-300 bg-gradient-to-br from-white to-amber-50/30';
      default:
        return 'border-slate-200/80 hover:border-slate-300 bg-white';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative p-5 rounded-xl border shadow-card transition-all duration-200 ${getCardStyle()} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lift' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{title}</p>
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              {value}
            </span>
            {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200/60 shadow-xs">
          {icon}
        </div>
      </div>

      {(change !== undefined || subtext) && (
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium ${getChangeColor()}`}>
              {change > 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : change < 0 ? (
                <TrendingDown className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
          <span className="text-slate-500 truncate ml-auto font-normal">
            {changeText || subtext || 'vs last cycle'}
          </span>
        </div>
      )}
    </div>
  );
};
