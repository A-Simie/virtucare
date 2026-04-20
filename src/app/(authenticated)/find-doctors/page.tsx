'use client';

import { DoctorList } from '@/features/doctors/DoctorList';
import { UserNav } from '@/components/UserNav';

export default function FindDoctorsPage() {
  return (
    <div className="max-w-full mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight break-all sm:break-normal">
            Find Specialists
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Book appointments with our top-rated medical professionals.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <UserNav />
        </div>
      </div>


      <DoctorList />
    </div>
  );
}
