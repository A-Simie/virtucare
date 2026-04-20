import { Bell, HelpCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function UserNav() {
  return (
    <div className="flex items-center gap-3">
      <button className="p-2.5 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-sm group">
        <Bell size={20} className="group-hover:scale-110 transition-transform" />
      </button>
      <button className="p-2.5 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-sm group">
        <HelpCircle size={20} className="group-hover:scale-110 transition-transform" />
      </button>
      <div className="ml-1">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
          name="Dr. S. Chen" 
          size="md" 
        />
      </div>
    </div>
  );
}
