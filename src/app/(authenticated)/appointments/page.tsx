'use client';

import { AppointmentTable } from '@/features/appointments/AppointmentTable';
import { UserNav } from '@/components/UserNav';

export default function AppointmentsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">My Appointments</h2>
          <p className="text-slate-500 mt-1">Manage and track your scheduled consultations.</p>
        </div>
        <UserNav />
      </div>

      <AppointmentTable />
    </div>
  );
}
