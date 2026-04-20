'use client';

import { DoctorList } from '@/features/doctors/DoctorList';
import { Bell, HelpCircle } from 'lucide-react';

export default function FindDoctorsPage() {
  return (
    <div className="max-w-full mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Find Specialists</h1>
          <p className="text-slate-500 mt-1">Book appointments with our top-rated medical professionals.</p>
        </div>
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <button className="p-2.5 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <Bell size={20} />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <HelpCircle size={20} />
          </button>
          <div className="w-10 h-10 rounded-xl border-2 border-white shadow-md overflow-hidden ml-2">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>


      <DoctorList />
    </div>
  );
}
