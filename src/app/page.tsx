'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Mail, Lock, ChevronRight, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
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
      <div className="hidden lg:flex flex-col justify-between p-16 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2dd4bf] opacity-[0.03] blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500 opacity-[0.03] blur-[80px] -ml-20 -mb-20" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-20">
            <div className="w-14 h-14 bg-[#2dd4bf] rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
              <Activity className="text-[#0f172a]" size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter">VirtuCare</h1>
          </div>

          <div className="space-y-8">
            <h2 className="text-7xl font-extrabold leading-[1.1] tracking-tight">
              Clinical <br />
              <span className="text-[#2dd4bf]">Excellence</span> <br />
              Everywhere.
            </h2>
            <p className="text-slate-400 text-xl max-w-lg leading-relaxed font-medium">
              Join the elite network of healthcare professionals and patients. Experience medical coordination with unparalleled precision.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-6 mt-12">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {avatars.map((url, i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-[#0f172a] overflow-hidden shadow-xl">
                  <img src={url} alt={`User ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="h-10 w-px bg-slate-800 mx-2" />
            <div>
              <p className="text-lg font-bold text-white">10k+ Professionals</p>
              <p className="text-sm font-medium text-slate-500 tracking-wide">TRUSTED WORLDWIDE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="bg-white flex flex-col justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="max-w-md mx-auto w-full space-y-12">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#2dd4bf] rounded-xl flex items-center justify-center">
              <Activity className="text-[#0f172a]" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-[#0f172a]">VirtuCare</h1>
          </div>

          <div className="space-y-4">
            <h3 className="text-4xl font-black text-[#0f172a] tracking-tight">Welcome Back</h3>
            <p className="text-slate-500 text-lg font-medium">Securely sign in to your Account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2dd4bf] transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="john.doe@virtucare.com"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all text-[#0f172a] font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                <Link href="#" className="text-xs font-bold text-[#134e4a] hover:text-[#2dd4bf] transition-colors">Forgot Access?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2dd4bf] transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all text-[#0f172a] font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-16 rounded-[20px] font-black text-xl shadow-2xl shadow-slate-200 mt-6 group bg-[#0f172a] hover:bg-[#1e293b]"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Sign In'}
              {!isLoading && <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />}
            </Button>
          </form>


          <div className="grid grid-cols-2 gap-5">
            <Button variant="outline" className="h-16 rounded-[20px] font-bold border-slate-100 hover:bg-slate-50 gap-3">
              <Globe size={22} className="text-indigo-600" />
              Google
            </Button>
            <Button variant="outline" className="h-16 rounded-[20px] font-bold border-slate-100 hover:bg-slate-50 gap-3">
              <Shield size={22} className="text-slate-800" />
              Github
            </Button>
          </div>


        </div>
      </div>
    </div>
  );
}
