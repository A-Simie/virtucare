'use client';

import { AppointmentTable } from '@/features/appointments/AppointmentTable';
import { Bell, HelpCircle } from 'lucide-react';

export default function AppointmentsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">My Appointments</h2>
          <p className="text-slate-500 mt-1">Manage and track your scheduled consultations.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <Bell size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <HelpCircle size={20} />
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" />
          </div>
        </div>
      </div>

      <AppointmentTable />
    </div>
  );
}
