'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Mail, Lock, ChevronRight, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

import { useNotifications } from '@/context/NotificationContext';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addNotification } = useNotifications();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login and save user
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem('virtucare_user_email', email);

    addNotification({
      title: 'New Login Detected',
      message: `User ${email} successfully logged in to the portal.`,
      type: 'system',
    });

    router.push('/dashboard');
  };

  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left Side: Branding & Info */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2dd4bf] opacity-[0.03] blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500 opacity-[0.03] blur-[80px] -ml-20 -mb-20" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-[#2dd4bf] rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
              <Activity className="text-[#0f172a]" size={28} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">VirtuCare</h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-6xl font-extrabold leading-[1.1] tracking-tight">
              Clinical <br />
              <span className="text-[#2dd4bf]">Excellence</span> <br />
              Everywhere.
            </h2>
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed font-medium">
              Join the elite network of healthcare professionals and patients. Experience medical coordination with unparalleled precision.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-6 mt-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {avatars.map((url, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f172a] overflow-hidden shadow-xl">
                  <img src={url} alt={`User ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="h-10 w-px bg-slate-800 mx-2" />
            <div>
              <p className="text-[10px] font-medium text-slate-500 tracking-widest uppercase">Trusted Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="bg-white flex flex-col justify-center p-6 md:p-12 lg:p-16 relative">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#2dd4bf] rounded-xl flex items-center justify-center">
              <Activity className="text-[#0f172a]" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-[#0f172a]">VirtuCare</h1>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black text-[#0f172a] tracking-tight">Welcome Back</h3>
            <p className="text-slate-500 text-base font-medium">Securely sign in to your Account.</p>
          </div>

          {/* Login Hint */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[20px] flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-emerald-50 text-emerald-600">
              <Activity size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-emerald-900">Assessment Mode Active</p>
              <p className="text-[10px] text-emerald-700/80 leading-relaxed font-medium">
                Please use any valid email format to proceed. Any password will be accepted.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2dd4bf] transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="john.doe@virtucare.com"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[16px] focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all text-[#0f172a] font-medium text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                <Link href="#" className="text-[10px] font-bold text-[#134e4a] hover:text-[#2dd4bf] transition-colors">Forgot Access?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2dd4bf] transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[16px] focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all text-[#0f172a] font-medium text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-14 rounded-[16px] font-black text-lg shadow-xl shadow-slate-200 mt-4 group bg-[#0f172a] hover:bg-[#1e293b]"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Sign In'}
              {!isLoading && <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />}
            </Button>
          </form>


          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-[16px] font-bold border-slate-100 hover:bg-slate-50 gap-2 text-sm">
              <Globe size={18} className="text-indigo-600" />
              Google
            </Button>
            <Button variant="outline" className="h-14 rounded-[16px] font-bold border-slate-100 hover:bg-slate-50 gap-2 text-sm">
              <Shield size={18} className="text-slate-800" />
              Github
            </Button>
          </div>


        </div>
      </div>
    </div>
  );
}
