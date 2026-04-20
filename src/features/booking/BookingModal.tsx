'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ChevronRight, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';
import { Doctor } from '@/types/doctor';
import { Button } from '@/components/ui/Button';
import { useAppointments } from '@/hooks/useAppointments';
import { 
  format, 
  startOfDay, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isToday, 
  isBefore, 
  addMonths, 
  subMonths,
  isAfter,
  setHours,
  setMinutes
} from 'date-fns';
import { Avatar } from '@/components/ui/Avatar';

import { useNotifications } from '@/context/NotificationContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

export function BookingModal({ isOpen, onClose, doctor }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { bookAppointment } = useAppointments();
  const { addNotification } = useNotifications();

  // Reset state when modal opens or doctor changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate(new Date());
      setSelectedTime('');
      setReason('');
      setSuccess(false);
      setError(null);
    }
  }, [isOpen, doctor.id]);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);

    // Artificial delay for high-end feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = bookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: selectedDate.toISOString(),
      time: selectedTime,
      reason,
    });

    if (result.success) {
      addNotification({
        title: 'Appointment Booked',
        message: `Your appointment with ${doctor.name} for ${format(selectedDate, 'MMM d')} at ${selectedTime} has been successfully scheduled.`,
        type: 'booking',
        link: '/appointments'
      });
      setSuccess(true);
      setStep(3);
    } else {
      setError(result.message || 'An error occurred');
    }
    setIsSubmitting(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  // Date Filtering Logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const allDaysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    if (isBefore(startOfDay(date), today)) return false;

    if (isToday(date)) {
      const now = new Date();
      const cutoffTime = setMinutes(setHours(startOfDay(now), 15), 0); // 3:00 PM
      if (isAfter(now, cutoffTime)) return false;
    }

    return true;
  };

  const dates = allDaysInMonth.filter(isDateAvailable);
  const times = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={doctor.avatar} name={doctor.name} size="md" />
            <div>
              <h3 className="font-bold text-[#0f172a]">{doctor.name}</h3>
              <p className="text-xs text-[#134e4a]">{doctor.specialty} Specialist</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                    <Calendar size={18} className="text-[#134e4a]" />
                    Select Date
                  </h4>
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button 
                      onClick={handlePrevMonth}
                      disabled={isBefore(startOfMonth(currentMonth), startOfMonth(new Date()))}
                      className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 text-[#0f172a]">
                      {format(currentMonth, 'MMM yyyy')}
                    </span>
                    <button 
                      onClick={handleNextMonth}
                      className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 transition-all"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {dates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ? 'border-[#2dd4bf] bg-[#ecfdf5] text-[#0f172a] font-bold shadow-sm'
                          : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-white'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider mb-1 font-semibold">{format(date, 'EEE')}</span>
                      <span className="text-sm">{format(date, 'd')}</span>
                    </button>
                  ))}
                  {dates.length === 0 && (
                    <div className="col-span-4 py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 font-medium">No available slots this month</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-[#134e4a]" />
                  Available Times
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2.5 rounded-lg border text-sm transition-all ${
                        selectedTime === time
                          ? 'border-[#2dd4bf] bg-[#ecfdf5] text-[#0f172a] font-bold shadow-sm'
                          : 'border-slate-100 hover:border-slate-300 text-slate-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  variant="primary" 
                  className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-slate-200"
                  disabled={!selectedTime}
                  onClick={nextStep}
                >
                  Continue to Details <ChevronRight size={18} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#0f172a] mb-4">Reason for visit</h4>
                <textarea
                  placeholder="Briefly describe your symptoms or reason for consultation..."
                  className="w-full h-40 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:bg-white transition-all text-sm resize-none"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="bg-[#f8fafc] p-6 rounded-2xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Consultation Fee</span>
                  <span className="font-bold text-[#0f172a]">$150.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Booking Fee</span>
                  <span className="font-bold text-[#0f172a]">$0.00</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-[#0f172a]">Total</span>
                  <span className="text-xl font-extrabold text-[#134e4a]">$150.00</span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={prevStep}>Back</Button>
                <Button 
                  variant="emerald" 
                  className="flex-[2] h-12 rounded-xl font-bold shadow-lg shadow-emerald-100" 
                  onClick={handleConfirm}
                  disabled={isSubmitting || !reason.trim()}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="h-full flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a]">Booking Confirmed!</h3>
                <p className="text-slate-500 mt-2">
                  Your appointment with {doctor.name} has been successfully scheduled for {format(selectedDate, 'MMM do')} at {selectedTime}.
                </p>
              </div>
              <Button variant="primary" className="w-full h-12 rounded-xl" onClick={onClose}>
                Done
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
