'use client';

import { useAppointments } from '@/hooks/useAppointments';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, cn } from '@/components/ui/Button';
import { formatDate } from '@/utils/date-helpers';
import { CalendarDays, Clock, MessageSquare, MoreVertical, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AppointmentTable() {

  const { appointments, cancelAppointment } = useAppointments();

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
    <div className="space-y-4">
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

                  <div className="flex items-center gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-none border-slate-100">
                    {app.status === 'upcoming' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 lg:flex-none text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200 gap-2 h-10 px-4 rounded-xl"
                        onClick={() => cancelAppointment(app.id)}
                      >
                        <XCircle size={16} />
                        Cancel
                      </Button>
                    )}
                    <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 ml-auto lg:ml-0">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}


