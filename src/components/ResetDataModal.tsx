'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ResetDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetDataModal({ isOpen, onClose, onConfirm }: ResetDataModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const targetText = 'proceed to clear local storage';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <ShieldAlert size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#0f172a]">Critical Action</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                This will permanently delete all your appointments, notifications, and profile settings. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Type to confirm</p>
              <p className="text-sm font-mono text-[#0f172a] select-none italic">"{targetText}"</p>
            </div>

            <input
              type="text"
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-center font-medium"
              placeholder="Enter the phrase exactly"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-xl shadow-red-200 disabled:opacity-50 disabled:shadow-none"
              disabled={confirmText !== targetText}
              onClick={onConfirm}
            >
              <Trash2 size={20} className="mr-2" />
              Reset All Data
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 border-slate-100 hover:bg-slate-50 rounded-2xl font-bold"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
