'use client';

import { useState } from 'react';
import { Doctor } from '@/types/doctor';
import { DoctorCard } from './DoctorCard';
import { doctors } from './doctorsData';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { BookingModal } from '@/features/booking/BookingModal';

import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useEffect } from 'react';

export function DoctorList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


  const specialties = ['All', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'General Practice'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBook = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
          <input 
            type="text" 
            placeholder="Search by specialist name, medical specialty, or clinic location..."
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all shadow-sm text-lg placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-500 font-bold text-sm">
          <Filter size={18} />
          Sort by: <span className="text-[#0f172a]">Popularity</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {specialties.map(specialty => (
          <button
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
              selectedSpecialty === specialty 
                ? 'bg-[#0f172a] text-white shadow-xl shadow-slate-200 scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-[#2dd4bf] hover:text-[#0f172a] shadow-sm'
            }`}
          >
            {specialty}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-slate-100">
              <div className="flex flex-col sm:flex-row">
                <Skeleton className="w-full sm:w-56 h-64 sm:h-[240px] rounded-none" />
                <div className="flex-1 p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="w-24 h-6" />
                    <Skeleton className="w-48 h-8" />
                  </div>
                  <Skeleton className="w-32 h-5" />
                  <div className="flex gap-2">
                    <Skeleton className="w-32 h-8" />
                    <Skeleton className="w-32 h-8" />
                  </div>
                  <Skeleton className="w-full h-12" />
                </div>
                <div className="p-6 sm:w-56 space-y-3 bg-slate-50/30">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
              </div>
            </Card>
          ))
        ) : filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBook} />
        ))}
      </div>




      {filteredDoctors.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
            <Search className="text-slate-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No specialists found</h3>
          <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}

      {selectedDoctor && (
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          doctor={selectedDoctor} 
        />
      )}
    </div>
  );
}
