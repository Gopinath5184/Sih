import React, { useState } from 'react';
import { Bell, X, Check, ArrowRight, AlertTriangle, TrendingUp, ShoppingBag, Truck, Sparkles } from 'lucide-react';
import { NotificationItem } from '../../types';
import { stateService } from '../../services/stateService';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onNavigate: (page: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onNavigate
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'high') return n.priority === 'high';
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'price_alert':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'shelf_life':
      case 'storage':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'shipment':
        return <Truck className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-agri-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-agri-100 text-agri-800 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Notifications & Alerts</h3>
              <p className="text-xs text-slate-500">Live agricultural supply chain telemetry</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filter === 'all' ? 'bg-agri-800 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filter === 'unread' ? 'bg-agri-800 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filter === 'high' ? 'bg-agri-800 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              High Priority
            </button>
          </div>
          <button
            onClick={() => stateService.markAllNotificationsAsRead()}
            className="text-[11px] font-semibold text-agri-800 hover:text-agri-950 flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium text-slate-600">No notifications to display</p>
              <p className="text-xs mt-1">You are all caught up with current mandi and storage updates.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  stateService.markNotificationAsRead(item.id);
                  if (item.actionUrl) {
                    onClose();
                    onNavigate(item.actionUrl);
                  }
                }}
                className={`p-3.5 rounded-xl transition-all cursor-pointer mb-1 border ${
                  !item.read 
                    ? 'bg-agri-50/40 border-agri-200/70 hover:bg-agri-50/80' 
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs mt-0.5 shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className={`text-xs font-semibold truncate ${!item.read ? 'text-slate-900 font-display' : 'text-slate-700'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    {item.actionUrl && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-agri-800 hover:text-agri-950">
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
