'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stethoscope, Home, ChevronRight, Search, Activity, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60" />
      
      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 p-8 md:p-16 border border-slate-100 text-center space-y-10">
          
          {/* Animated 404 Visual */}
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[120px] md:text-[180px] font-black leading-none text-slate-100 select-none"
            >
              404
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500 rounded-[32px] shadow-2xl shadow-emerald-200 flex items-center justify-center text-white"
              >
                <Stethoscope size={48} className="md:w-16 md:h-16" />
              </motion.div>
            </div>
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            <h1 className="text-3xl md:text-4xl font-black text-[#0f172a]">
              Medical Record <span className="text-emerald-600">Not Found</span>
            </h1>
            <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed">
              It seems the page you are looking for has been misplaced or doesn't exist in our clinical database. Let's get you back to recovery.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard" className="group">
              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-left hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm border border-slate-50 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Home size={24} />
                </div>
                <h3 className="font-bold text-[#0f172a] mb-1">Go Home</h3>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 group-hover:text-emerald-600">
                  Return to Dashboard <ChevronRight size={14} />
                </p>
              </div>
            </Link>

            <Link href="/find-doctors" className="group">
              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-left hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-4 shadow-sm border border-slate-50 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <Search size={24} />
                </div>
                <h3 className="font-bold text-[#0f172a] mb-1">Find Doctors</h3>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 group-hover:text-indigo-600">
                  Search specialists <ChevronRight size={14} />
                </p>
              </div>
            </Link>
          </div>

          <div className="pt-6">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em] flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-slate-200" />
              VirtuCare Health System
              <span className="w-8 h-[1px] bg-slate-200" />
            </p>
          </div>
        </div>

        {/* Pulse Indicator */}
        <div className="mt-12 flex justify-center gap-8 text-slate-300">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">System Online</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse size={16} className="text-rose-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Safe & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
