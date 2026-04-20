'use client';

import { DoctorList } from '@/features/doctors/DoctorList';
import { UserNav } from '@/components/UserNav';

export default function FindDoctorsPage() {
  return (
    <div className="max-w-full mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Find Specialists</h1>
          <p className="text-slate-500 mt-1">Book appointments with our top-rated medical professionals.</p>
        </div>
        <UserNav />
      </div>


      <DoctorList />
    </div>
  );
}
