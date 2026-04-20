'use client';

import { useNotifications, Notification } from '@/context/NotificationContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Bell, 
  Calendar, 
  Trash2, 
  Inbox,
  Clock,
  Check
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/components/ui/Button';
import { UserNav } from '@/components/UserNav';
import { Skeleton } from '@/components/ui/Skeleton';
import { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return <Calendar className="text-emerald-500" size={24} />;
      case 'cancellation': return <Trash2 className="text-red-500" size={24} />;
      case 'system': return <Bell className="text-indigo-500" size={24} />;
      default: return <Bell size={24} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
      <div className="space-y-6">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              Notifications
            </h1>
            <p className="text-slate-500 mt-2 text-base md:text-lg hidden sm:block">
              Stay updated with your latest medical activities.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <UserNav />
          </div>
        </div>

        {/* Mobile Description & Actions */}
        <div className="flex flex-col gap-4 sm:hidden">
          <p className="text-slate-500 text-sm leading-relaxed">
            Stay updated with your latest medical activities.
          </p>
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={notifications.length === 0}
            className="rounded-2xl h-12 font-bold text-sm bg-white px-6 w-full shadow-sm"
          >
            <Check className="mr-2" size={16} />
            Mark all as read
          </Button>
        </div>

        {/* Desktop Action Row */}
        <div className="hidden sm:flex items-center justify-start">
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={notifications.length === 0}
            className="rounded-2xl h-11 font-bold text-sm bg-white px-6 shadow-sm hover:border-[#2dd4bf] hover:text-[#134e4a] transition-all"
          >
            <Check className="mr-2" size={16} />
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-slate-100 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <Skeleton className="w-48 h-6" />
                      <Skeleton className="w-24 h-4" />
                    </div>
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-2/3 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : notifications.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6">
              <Inbox className="text-slate-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#0f172a]">Your inbox is empty</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              You're all caught up! When you have new notifications, they'll appear here.
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <Card 
              key={notif.id}
              className={cn(
                "transition-all duration-300 border-slate-100 overflow-hidden group",
                !notif.read ? "bg-emerald-50/20 border-emerald-100/50 shadow-sm" : "bg-white opacity-80"
              )}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col xs:flex-row gap-4 md:gap-6">
                  <div className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors",
                    !notif.read ? "bg-white" : "bg-slate-50"
                  )}>
                    {getIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#0f172a] text-base md:text-lg truncate">{notif.title}</h4>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-[#2dd4bf] rounded-full shrink-0" />
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] md:text-xs font-medium text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {format(new Date(notif.timestamp), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </div>
                      
                      {!notif.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notif.id)}
                          className="self-start text-[10px] md:text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl h-8 px-3"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base break-words">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
