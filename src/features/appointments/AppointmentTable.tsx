import { useState, useRef, useEffect } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, cn } from '@/components/ui/Button';
import { formatDate } from '@/utils/date-helpers';
import { CalendarDays, Clock, MessageSquare, MoreVertical, XCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AppointmentTable() {
  const { appointments, cancelAppointment } = useAppointments();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleConfirmCancel = () => {
    if (confirmCancelId) {
      cancelAppointment(confirmCancelId);
      setConfirmCancelId(null);
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6">
          <CalendarDays className="text-slate-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No appointments yet</h3>
        <p className="text-slate-500 max-w-sm mx-auto mt-2">
          You haven't scheduled any appointments. Browse our specialists to get started.
        </p>
        <Button variant="primary" className="mt-8 rounded-xl px-8" onClick={() => window.location.href = '/find-doctors'}>
          Find Doctors
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      <AnimatePresence mode="popLayout">
        {sortedAppointments.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
          >
            <Card className={app.status === 'cancelled' ? 'opacity-60 bg-slate-50 grayscale-[0.5]' : 'hover:shadow-lg'}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-5 w-full lg:w-auto">
                    <div className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0",
                      app.status === 'cancelled' ? "bg-slate-200 text-slate-500" : "bg-[#ecfdf5] text-[#134e4a]"
                    )}>
                      {app.doctorName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0f172a] text-base md:text-lg">{app.doctorName}</h4>
                      <p className="text-xs md:text-sm text-slate-500 font-medium">{app.doctorSpecialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-sm w-full lg:w-auto">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date & Time</span>
                      <div className="flex items-center gap-2 font-semibold text-[#0f172a]">
                        <CalendarDays size={14} className="text-slate-400" />
                        {formatDate(app.date)} <span className="text-slate-300">|</span> {app.time}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Reason</span>
                      <div className="flex items-center gap-2 font-medium text-slate-600 truncate max-w-[200px]">
                        <MessageSquare size={14} className="text-slate-400" />
                        {app.reason}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</span>
                      <div>
                        <Badge variant={app.status === 'upcoming' ? 'success' : 'default'} className="capitalize px-3 py-1">
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-none border-slate-100 relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                      className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 ml-auto lg:ml-0"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {/* Action Dropdown */}
                    <AnimatePresence>
                      {openMenuId === app.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          ref={menuRef}
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                        >
                          <div className="p-2">
                            {app.status === 'upcoming' ? (
                              <button
                                onClick={() => {
                                  setConfirmCancelId(app.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                              >
                                <XCircle size={16} />
                                Cancel Appointment
                              </button>
                            ) : (
                              <div className="px-4 py-3 text-sm text-slate-400 italic">No actions available</div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Cancellation Confirmation Modal */}
      <AnimatePresence>
        {confirmCancelId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmCancelId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="text-red-600" size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#0f172a]">Cancel Appointment?</h3>
                  <p className="text-slate-500 font-medium">
                    Are you sure you want to cancel this consultation? This action cannot be undone.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-14 rounded-2xl font-bold border-slate-200"
                    onClick={() => setConfirmCancelId(null)}
                  >
                    No, keep it
                  </Button>
                  <Button
                    variant="primary"
                    className="h-14 rounded-2xl font-bold bg-red-600 hover:bg-red-700 border-none shadow-lg shadow-red-200"
                    onClick={handleConfirmCancel}
                  >
                    Yes, cancel it
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


