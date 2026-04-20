'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, HelpCircle, LifeBuoy, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const sections = [
    {
      icon: <ShieldCheck className="text-emerald-500" size={20} />,
      title: "Data Privacy & Security",
      content: "VirtuCare is designed with privacy in mind. While this is a medical portal demonstration, we simulate industry-standard encryption and HIPAA-compliant data handling. Your personal information is stored locally and never shared with unauthorized third parties."
    },
    {
      icon: <FileText className="text-indigo-500" size={20} />,
      title: "Terms of Service",
      content: "By using VirtuCare, you agree to provide accurate medical history for better diagnosis. Appointments should be cancelled at least 24 hours in advance to avoid scheduling conflicts for our specialists."
    },
    {
      icon: <LifeBuoy className="text-amber-500" size={20} />,
      title: "Patient Support",
      content: "Need assistance with your booking? Our clinical support team is available 24/7. In case of a medical emergency, please dial your local emergency services immediately rather than using the virtual portal."
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#134e4a]">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#0f172a]">Help & Legal</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Everything you need to know</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-slate-400 hover:text-[#0f172a] hover:bg-slate-50 rounded-2xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
          {/* Welcome Banner */}
          <div className="p-6 bg-[#ecfdf5] rounded-[24px] border border-emerald-100 flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
              <HeartPulse size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#064e3b]">Welcome to VirtuCare Support</h3>
              <p className="text-sm text-[#065f46] font-medium leading-relaxed opacity-80">
                We're committed to providing the best digital healthcare experience. Read our guidelines below.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="p-3 bg-slate-50 rounded-xl h-fit border border-slate-100 shrink-0">
                  {section.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-[#0f172a]">{section.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Version Info */}
          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">VirtuCare medical portal v2.4.0</p>
            <p className="text-[10px] text-slate-300 font-medium italic">Handcrafted with care for modern patients</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <Button
            variant="emerald"
            className="rounded-xl px-8 font-bold h-12"
            onClick={onClose}
          >
            Got it, thanks
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
