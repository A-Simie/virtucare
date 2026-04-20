

'use client';

import { Appointment } from '@/types/appointment';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  User,
  Stethoscope,
  FileText,
  ShieldCheck,
  Phone,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/components/ui/Button';

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  if (!isOpen || !appointment) return null;

  const isCancelled = appointment.status === 'cancelled';
  const isUpcoming = appointment.status === 'upcoming';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg md:max-w-3xl bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <div className="relative h-32 bg-[#0f172a] p-8 shrink-0">
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-[#2dd4bf] rounded-2xl shadow-lg shadow-emerald-500/20">
              <Calendar size={24} className="text-[#0f172a]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Appointment Details</h3>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Reference: #{appointment.id.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 pr-4 md:pr-6 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
          {/* Doctor Info Card */}
          <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden shrink-0">
              <span className="text-2xl font-black text-[#0f172a]">{appointment.doctorName[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-500 text-[10px] uppercase font-bold">
                  Consultant
                </Badge>
                {isUpcoming && (
                  <Badge variant="success" className="text-[10px] uppercase font-bold">Confirmed</Badge>
                )}
              </div>
              <h4 className="text-lg font-black text-[#0f172a] truncate">{appointment.doctorName}</h4>
              <p className="text-sm text-slate-500 font-medium">{appointment.doctorSpecialty}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-1">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                <Clock size={12} /> Time Slot
              </span>
              <p className="text-sm font-bold text-[#0f172a]">{appointment.time}</p>
            </div>
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-1">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                <Calendar size={12} /> Date
              </span>
              <p className="text-sm font-bold text-[#0f172a]">{format(new Date(appointment.date), 'MMMM do, yyyy')}</p>
            </div>
          </div>

          {/* Reason Section */}
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">
              <FileText size={14} /> Reason for Consultation
            </span>
            <div className="p-5 bg-white border border-slate-100 rounded-3xl text-sm text-slate-600 leading-relaxed italic">
              "{appointment.reason}"
            </div>
          </div>

          {/* Status Alert */}
          {isCancelled ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600">
              <XCircle className="shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase">Appointment Cancelled</p>
                <p className="text-xs font-medium opacity-80">This session has been removed from the clinical schedule and is no longer active.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700">
              <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase">Ready for Consultation</p>
                <p className="text-xs font-medium opacity-80">Please ensure you have your medical history documents ready before the session begins.</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full h-14 border-slate-100 hover:bg-slate-50 text-slate-600 font-bold rounded-2xl"
            >
              Close Details
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
