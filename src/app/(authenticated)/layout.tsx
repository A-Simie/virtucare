'use client';

import { Sidebar } from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('virtucare_user_email');
    if (!userEmail) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden lg:block w-64 bg-slate-50 border-r border-slate-100 p-8">
          <Skeleton className="w-32 h-8 mb-12" />
          <div className="space-y-6">
            <Skeleton className="w-full h-12 rounded-2xl" />
            <Skeleton className="w-full h-12 rounded-2xl" />
            <Skeleton className="w-full h-12 rounded-2xl" />
          </div>
        </div>
        <main className="flex-1 p-8 space-y-8">
          <Skeleton className="w-64 h-12 rounded-2xl" />
          <Skeleton className="w-full h-[60vh] rounded-[40px]" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f8fafc]/50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 w-full max-w-[1600px] mx-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
}
