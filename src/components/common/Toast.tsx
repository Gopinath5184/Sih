import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Info className="w-5 h-5 text-agri-700" />;
    }
  };

  const getBg = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-200 bg-white/95 text-slate-900';
      case 'warning':
        return 'border-amber-200 bg-white/95 text-slate-900';
      default:
        return 'border-agri-200 bg-white/95 text-slate-900';
    }
  };

  return (
    <div 
      className={`pointer-events-auto p-4 rounded-xl border shadow-lift flex items-start gap-3 backdrop-blur-md animate-in slide-in-from-top-3 fade-in duration-200 ${getBg()}`}
    >
      <div className="shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0 text-xs">
        <h4 className="font-bold text-slate-900">{toast.title}</h4>
        <p className="text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-700 p-1 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
