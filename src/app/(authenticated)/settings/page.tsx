'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Globe, 
  Database,
  ChevronRight,
  LogOut
} from 'lucide-react';

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { name: 'Profile Information', icon: User, description: 'Update your name, email, and personal details' },
      { name: 'Password & Security', icon: Lock, description: 'Manage your password and 2FA settings' },
      { name: 'Notifications', icon: Bell, description: 'Choose what updates you want to receive' },
    ]
  },
  {
    title: 'Privacy & Data',
    items: [
      { name: 'Health Records Privacy', icon: Shield, description: 'Control who can view your medical history' },
      { name: 'Data Management', icon: Database, description: 'Export or delete your medical data' },
      { name: 'Connected Apps', icon: Globe, description: 'Manage third-party health app integrations' },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group) => (
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
        ))}

        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full h-14 rounded-2xl text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200 font-bold gap-3"
          >
            <LogOut size={18} />
            Sign Out of Account
          </Button>
        </div>
      </div>
    </div>
  );
}
