'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  User,
  Lock,
  Shield,
  Globe,
  Database,
  ChevronRight,
  LogOut
} from 'lucide-react';

import { Skeleton } from '@/components/ui/Skeleton';
import { useEffect, useState } from 'react';
import { UserNav } from '@/components/UserNav';

import { useRouter } from 'next/navigation';
import { ResetDataModal } from '@/components/ResetDataModal';
import { useNotifications } from '@/context/NotificationContext';
import { useAppointments } from '@/hooks/useAppointments';

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { name: 'Profile Information', icon: User, description: 'Update your name, email, and personal details' },
      { name: 'Password & Security', icon: Lock, description: 'Manage your password and 2FA settings' },
    ]
  },
  {
    title: 'Privacy & Data',
    items: [
      { name: 'Health Records Privacy', icon: Shield, description: 'Control who can view your medical history' },
      { name: 'Connected Apps', icon: Globe, description: 'Manage third-party health app integrations' },
    ]
  }
];

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const router = useRouter();
  const { clearAll: clearNotifications } = useNotifications();
  const { clearAppointments } = useAppointments();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('virtucare_user_email');
    router.push('/');
  };

  const handleResetData = () => {
    clearNotifications();
    clearAppointments();
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight break-all sm:break-normal">
            Settings
          </h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            Manage your account preferences and security settings.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <UserNav />
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-24 h-4 ml-1" />
              <Card className="border-slate-200">
                <div className="divide-y divide-slate-100">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="w-32 h-5" />
                          <Skeleton className="w-48 h-3" />
                        </div>
                      </div>
                      <Skeleton className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))
        ) : (
          settingsGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 ml-1">
                {group.title}
              </h3>
              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <div className="divide-y divide-slate-100">
                  {group.items.map((item) => (
                    <button
                      key={item.name}
                      className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-[#0f172a]">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#2dd4bf] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          ))
        )}
        
        <div className="space-y-4 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-500 ml-1">
            Danger Zone
          </h3>
          <Card className="overflow-hidden border-red-100 bg-red-50/30">
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-red-100 rounded-xl text-red-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Database size={20} />
                </div>
                <div>
                  <p className="font-bold text-red-600">Reset All Local Data</p>
                  <p className="text-xs text-red-400 mt-0.5">Wipe all appointments, notifications and preferences</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
            </button>
          </Card>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-14 rounded-2xl text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200 font-bold gap-3"
          >
            <LogOut size={18} />
            Sign Out of Account
          </Button>
        </div>
      </div>

      <ResetDataModal 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)} 
        onConfirm={handleResetData}
      />
    </div>
  );
}
