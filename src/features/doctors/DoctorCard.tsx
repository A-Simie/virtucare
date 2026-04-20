'use client';

import { Doctor } from '@/types/doctor';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
  Activity
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
          <div className="relative w-full sm:w-64 aspect-[4/5] sm:aspect-auto bg-slate-50 overflow-hidden shrink-0">
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white shadow-sm flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>

          {/* Middle: Info Section */}
          <div className="flex-1 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {(() => {
                    const Icon = specialtyIcons[doctor.specialty] || Activity;
                    return (
                      <div className="p-1.5 bg-[#ecfdf5] rounded-lg text-[#059669]">
                        <Icon size={14} />
                      </div>
                    );
                  })()}
                  <Badge variant="success" className="bg-[#ecfdf5] text-[#059669] text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
                    {doctor.specialty}
                  </Badge>

                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-[#0f172a]">{doctor.rating.toFixed(1)}</span>
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-[#0f172a] group-hover:text-[#134e4a] transition-colors">
                  {doctor.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    {doctor.location}
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Consultation Fee</p>
                <p className="text-lg font-black text-[#0f172a]">$150</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-600">
                <Clock size={14} className="text-slate-400" />
                Next: <span className="text-[#0f172a]">Today, 2:00 PM</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} />
                Available Today
              </div>
            </div>

            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              Leading specialist with over 15 years of clinical experience in advanced {doctor.specialty.toLowerCase()} treatments and patient-centered care.
            </p>
          </div>

          {/* Right: Action Section */}
          <div className="p-6 sm:border-l border-slate-100 bg-slate-50/50 flex flex-col justify-center gap-3 sm:w-56 shrink-0">
            <Button 
              variant="emerald" 
              className="w-full h-12 font-bold shadow-lg shadow-emerald-100 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() => onBook(doctor)}
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 font-bold rounded-xl bg-white text-slate-600 hover:text-[#0f172a]"
            >
              <Phone size={16} className="mr-2" />
              Quick Call
            </Button>
            <p className="text-[10px] text-center text-slate-400 font-medium">No booking fees</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
