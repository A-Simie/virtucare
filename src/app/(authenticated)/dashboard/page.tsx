'use client';

import { useAppointments } from '@/hooks/useAppointments';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CalendarDays, 
  Users, 
  Activity, 
  Clock,
  ChevronRight,
  TrendingUp,
  Bell
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/utils/date-helpers';

import { Skeleton } from '@/components/ui/Skeleton';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { appointments } = useAppointments();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const upcomingCount = appointments.filter(a => a.status === 'upcoming').length;
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    { name: 'Upcoming', value: upcomingCount, icon: CalendarDays, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Total Visits', value: appointments.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Health Score', value: '94%', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50' },
    { name: 'Pending Labs', value: '2', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a]">Hello, Dr. Chen</h1>
          <p className="text-slate-500 mt-2 text-lg">Welcome back to your VirtuCare dashboard. You have {upcomingCount} appointments today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl h-12 shadow-sm bg-white">
            <TrendingUp size={18} className="mr-2 text-indigo-600" />
            View Reports
          </Button>
          <Link href="/find-doctors">
            <Button variant="emerald" className="rounded-2xl h-12 font-bold shadow-lg shadow-emerald-100 px-6">
              Book New Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-16 h-8" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat) => (
            <Card key={stat.name} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} /> +12%
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.name}</p>
                  <p className="text-3xl font-extrabold text-[#0f172a]">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-2xl font-bold text-[#0f172a]">Recent Appointments</h3>
            <Link href="/appointments" className="text-sm font-bold text-[#134e4a] hover:text-[#2dd4bf] transition-colors flex items-center gap-1 group">
              View All <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-slate-100">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-24 h-3" />
                      </div>
                    </div>
                    <Skeleton className="w-16 h-6 rounded-full" />
                  </CardContent>
                </Card>
              ))
            ) : recentAppointments.length > 0 ? (
              recentAppointments.map((app) => (
                <Card key={app.id} className="hover:border-[#2dd4bf] cursor-pointer group transition-all shadow-sm">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600 group-hover:bg-[#ecfdf5] group-hover:text-[#134e4a] transition-colors">
                        {app.doctorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-[#0f172a] group-hover:text-[#134e4a] transition-colors">{app.doctorName}</p>
                        <p className="text-xs text-slate-500 font-medium">{app.doctorSpecialty} • {formatDate(app.date)}</p>
                      </div>
                    </div>
                    <Badge variant={app.status === 'upcoming' ? 'success' : 'default'} className="capitalize">
                      {app.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="md:col-span-2 xl:col-span-1 p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No recent activity found</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications/Updates */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#0f172a]">System Updates</h3>
          <Card className="bg-[#134e4a] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity size={80} />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bell size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold">New Policy Update</h4>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Starting next week, all virtual consultations will require a pre-visit health questionnaire.
                </p>
              </div>
              <Button className="bg-white text-[#134e4a] hover:bg-slate-100 w-full font-bold h-12 rounded-xl">
                Read Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className, variant = 'default' }: any) {
  const variants: any = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-100 text-emerald-600',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
