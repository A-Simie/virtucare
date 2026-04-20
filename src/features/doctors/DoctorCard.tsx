'use client';

import { Doctor } from '@/types/doctor';
import { Card, CardContent } from '@/components/ui/Card';
import { Button, cn } from '@/components/ui/Button';
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Phone,
  HeartPulse,
  Stethoscope,
  Brain,
  Baby,
  Activity,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Specialty } from '@/types/doctor';
import { Avatar } from '@/components/ui/Avatar';

const specialtyIcons: Record<string, any> = {
  'Cardiology': HeartPulse,
  'Dermatology': Stethoscope,
  'Neurology': Brain,
  'Pediatrics': Baby,
  'General Practice': Activity,
};

interface DoctorCardProps {

  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <Card className="hover:border-[#2dd4bf]/50 group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden border-slate-100">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Left: Avatar Section */}
          <div className="relative w-full sm:w-48 lg:w-64 aspect-[4/3] sm:aspect-auto bg-slate-50 overflow-hidden shrink-0">
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Middle: Info Section */}
          <div className="flex-1 p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  {(() => {
                    const Icon = specialtyIcons[doctor.specialty] || Activity;
                    return (
                      <div className="p-1 bg-[#ecfdf5] rounded-lg text-[#059669]">
                        <Icon size={12} />
                      </div>
                    );
                  })()}
                  <Badge variant="success" className="bg-[#ecfdf5] text-[#059669] text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
                    {doctor.specialty}
                  </Badge>

                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs sm:text-sm font-bold text-[#0f172a]">{doctor.rating.toFixed(1)}</span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-[#0f172a] group-hover:text-[#134e4a] transition-colors line-clamp-1">
                  {doctor.name}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-slate-500 text-xs sm:text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-slate-400" />
                    {doctor.location}
                  </div>
                </div>
              </div>
              <div className="flex sm:block items-baseline gap-2">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest sm:mb-0.5">Fee</p>
                <p className="text-base md:text-lg font-black text-[#0f172a]">$150</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] sm:text-xs font-semibold text-slate-600">
                <Clock size={12} className="text-slate-400" />
                Next: <span className="text-[#0f172a]">{doctor.available ? '2:00 PM' : 'N/A'}</span>
              </div>
              {doctor.available ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100 text-[10px] sm:text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={12} />
                  Available Today
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 rounded-xl border border-red-100 text-[10px] sm:text-xs font-semibold text-red-600">
                  <AlertCircle size={12} />
                  Not Available
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
              Leading specialist with over 15 years of clinical experience in advanced {doctor.specialty.toLowerCase()} treatments.
            </p>
          </div>

          {/* Right: Action Section */}
          <div className="p-5 md:p-6 sm:border-l border-slate-100 bg-slate-50/50 flex flex-col justify-center gap-3 sm:w-48 lg:w-56 shrink-0">
            <Button 
              variant={doctor.available ? "emerald" : "outline"}
              className={cn(
                "w-full h-11 sm:h-12 font-bold transition-all text-sm rounded-xl",
                doctor.available 
                  ? "shadow-lg shadow-emerald-100 hover:scale-[1.02] active:scale-[0.98]" 
                  : "opacity-50 grayscale cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200"
              )}
              disabled={!doctor.available}
              onClick={() => onBook(doctor)}
            >
              {doctor.available ? 'Book Appointment' : 'Fully Booked'}
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-11 sm:h-12 font-bold rounded-xl bg-white text-slate-600 hover:text-[#0f172a] text-sm"
            >
              <Phone size={14} className="mr-2" />
              Call
            </Button>
            <p className="text-[9px] text-center text-slate-400 font-medium">No booking fees</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
