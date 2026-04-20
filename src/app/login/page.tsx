'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Mail, Lock, ChevronRight, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#0f172a] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2dd4bf] opacity-10 blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 opacity-10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-[#2dd4bf] rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Activity className="text-[#0f172a]" size={28} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter">VirtuCare</h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
                Healthcare <br />
                <span className="text-[#2dd4bf]">Precision</span> at your <br />
                fingertips.
              </h2>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Connect with the world's leading specialists and manage your health journey with absolute clarity and ease.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-6 mt-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f172a] overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=100&h=100&fit=crop`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-400 italic">Joined by 10k+ professionals</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-10">
            <div>
              <h3 className="text-3xl font-black text-[#0f172a] tracking-tight">Welcome Back</h3>
              <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                  <Link href="#" className="text-xs font-bold text-[#134e4a] hover:text-[#2dd4bf] transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2dd4bf]/10 focus:border-[#2dd4bf] transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit"
                variant="primary" 
                className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 mt-4 group"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                {!isLoading && <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />}
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-100 hover:bg-slate-50">
                <Globe size={20} className="mr-3" />
                Google
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-100 hover:bg-slate-50">
                <Shield size={20} className="mr-3" />
                Github
              </Button>
            </div>


            <p className="text-center text-sm text-slate-500 font-medium">
              Don't have an account? <Link href="#" className="text-[#134e4a] font-bold hover:text-[#2dd4bf] transition-colors">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
