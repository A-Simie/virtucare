import { useState } from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { useNotifications } from '@/context/NotificationContext';
import { NotificationPanel } from '@/components/NotificationPanel';

export function UserNav() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="p-2.5 text-slate-400 hover:text-[#0f172a] hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-sm group relative"
        >
          <Bell size={20} className="group-hover:scale-110 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
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

      <NotificationPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
}
