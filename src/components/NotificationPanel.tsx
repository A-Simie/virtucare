'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Calendar, Trash2, ChevronRight, Inbox } from 'lucide-react';
import { useNotifications, Notification } from '@/context/NotificationContext';
import { cn } from '@/components/ui/Button';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return <Calendar className="text-emerald-500" size={18} />;
      case 'cancellation': return <Trash2 className="text-red-500" size={18} />;
      case 'system': return <Bell className="text-indigo-500" size={18} />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 rounded-2xl text-slate-600">
                  <Bell size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f172a]">Notifications</h2>
                  <p className="text-xs text-slate-500 font-medium">Recent activity and alerts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={markAllAsRead}
                  className="text-xs font-bold text-[#134e4a] hover:text-[#2dd4bf] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Mark all as read
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-[#0f172a] hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                  <div className="p-6 bg-slate-50 rounded-full">
                    <Inbox size={48} className="text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">No notifications yet</p>
                    <p className="text-sm">We'll notify you when something happens.</p>
                  </div>
                </div>
              ) : (
                notifications.map((notif) => (
                  <Link 
                    key={notif.id}
                    href="/notifications"
                    onClick={() => {
                      markAsRead(notif.id);
                      onClose();
                    }}
                    className={cn(
                      "block p-4 rounded-2xl border transition-all group relative",
                      notif.read 
                        ? "bg-white border-slate-100 opacity-60" 
                        : "bg-emerald-50/30 border-emerald-100 shadow-sm hover:shadow-md"
                    )}
                  >
                    {!notif.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-[#2dd4bf] rounded-full shadow-[0_0_8px_#2dd4bf]" />
                    )}
                    <div className="flex gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#0f172a]">{notif.title}</p>
                          <span className="text-[10px] font-medium text-slate-400">
                            {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                        <div className="pt-2 flex items-center gap-1 text-[10px] font-bold text-[#134e4a] group-hover:text-[#2dd4bf] transition-colors">
                          Read more <ChevronRight size={10} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <Link 
                  href="/notifications"
                  onClick={onClose}
                  className="flex items-center justify-center w-full py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-[#0f172a] hover:bg-slate-50 transition-all shadow-sm"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
