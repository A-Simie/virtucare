import { useState, useRef, useEffect } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, cn } from '@/components/ui/Button';
import { formatDate } from '@/utils/date-helpers';
import { 
  CalendarDays, 
  Clock, 
  MessageSquare, 
  MoreVertical, 
  XCircle, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';

export function AppointmentTable() {
  const { appointments, cancelAppointment } = useAppointments();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
      if (perPageRef.current && !perPageRef.current.contains(event.target as Node)) {
        setIsPerPageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Pagination Logic
  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = sortedAppointments.slice(startIndex, startIndex + itemsPerPage);

  const handleConfirmCancel = () => {
    if (confirmCancelId) {
      cancelAppointment(confirmCancelId);
      setConfirmCancelId(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoading && appointments.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6">
          <CalendarDays className="text-slate-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No appointments yet</h3>
        <p className="text-slate-500 max-w-sm mx-auto mt-2">
          You haven't scheduled any appointments. Browse our specialists to get started.
        </p>
        <Button variant="primary" className="mt-8 rounded-xl px-8" onClick={() => window.location.href = '/find-doctors'}>
          Find Doctors
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-20">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, i) => (
              <Card key={`skeleton-${i}`} className="border-slate-100 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-5 w-full lg:w-[30%]">
                      <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
                      <div className="space-y-2">
                        <Skeleton className="w-32 h-5" />
                        <Skeleton className="w-24 h-4" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-1 gap-8 w-full lg:w-auto">
                      <div className="space-y-2 lg:w-[35%]"><Skeleton className="w-16 h-3" /><Skeleton className="w-32 h-4" /></div>
                      <div className="space-y-2 lg:w-[40%]"><Skeleton className="w-16 h-3" /><Skeleton className="w-40 h-4" /></div>
                      <div className="space-y-2 lg:w-[25%]"><Skeleton className="w-16 h-3" /><Skeleton className="w-20 h-6 rounded-full" /></div>
                    </div>
                    <Skeleton className="w-10 h-10 rounded-xl ml-auto lg:ml-0 shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            paginatedAppointments.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className={app.status === 'cancelled' ? 'opacity-60 bg-slate-50 grayscale-[0.5]' : 'hover:shadow-lg transition-shadow border-slate-100'}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      {/* Column 1: Doctor */}
                      <div className="flex items-center gap-5 w-full lg:w-[30%]">
                        <div className={cn(
                          "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0",
                          app.status === 'cancelled' ? "bg-slate-200 text-slate-500" : "bg-[#ecfdf5] text-[#134e4a]"
                        )}>
                          {app.doctorName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="truncate">
                          <h4 className="font-bold text-[#0f172a] text-base md:text-lg truncate">{app.doctorName}</h4>
                          <p className="text-xs md:text-sm text-slate-500 font-medium truncate">{app.doctorSpecialty}</p>
                        </div>
                      </div>

                      {/* Column 2, 3, 4: Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-1 gap-4 md:gap-8 text-sm w-full lg:w-auto">
                        <div className="flex flex-col gap-1 lg:w-[35%]">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date & Time</span>
                          <div className="flex items-center gap-2 font-semibold text-[#0f172a]">
                            <CalendarDays size={14} className="text-slate-400 shrink-0" />
                            <span className="truncate">{formatDate(app.date)} <span className="text-slate-300">|</span> {app.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 lg:w-[40%]">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Reason</span>
                          <div className="flex items-center gap-2 font-medium text-slate-600 truncate">
                            <MessageSquare size={14} className="text-slate-400 shrink-0" />
                            <span className="truncate" title={app.reason}>{app.reason}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 lg:w-[25%] lg:items-center lg:text-center">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</span>
                          <div>
                            <Badge variant={app.status === 'upcoming' ? 'success' : 'default'} className="capitalize px-3 py-1">
                              {app.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Column 5: Action */}
                      <div className="flex items-center gap-2 w-full lg:w-[5%] pt-4 lg:pt-0 border-t lg:border-none border-slate-100 relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                          className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 ml-auto lg:ml-0"
                        >
                          <MoreVertical size={20} />
                        </button>

                        <AnimatePresence>
                          {openMenuId === app.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              ref={menuRef}
                              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                            >
                              <div className="p-2">
                                {app.status === 'upcoming' ? (
                                  <button
                                    onClick={() => {
                                      setConfirmCancelId(app.id);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                                  >
                                    <XCircle size={16} />
                                    Cancel Appointment
                                  </button>
                                ) : (
                                  <div className="px-4 py-3 text-sm text-slate-400 italic font-medium">No actions available</div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="text-[#0f172a] font-bold">{startIndex + 1}</span> to <span className="text-[#0f172a] font-bold">{Math.min(startIndex + itemsPerPage, sortedAppointments.length)}</span> of <span className="text-[#0f172a] font-bold">{sortedAppointments.length}</span>
            </p>
            
            {/* Items Per Page Selector */}
            <div className="relative" ref={perPageRef}>
              <button 
                onClick={() => setIsPerPageOpen(!isPerPageOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0f172a] hover:border-[#2dd4bf] transition-all"
              >
                {itemsPerPage} per page
                <ChevronDown size={14} className={cn("transition-transform", isPerPageOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isPerPageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-2 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    {[5, 10, 20, 50].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setItemsPerPage(num);
                          setCurrentPage(1);
                          setIsPerPageOpen(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2 text-sm font-bold text-left hover:bg-slate-50 transition-colors",
                          itemsPerPage === num ? "text-[#2dd4bf] bg-slate-50/50" : "text-slate-600"
                        )}
                      >
                        {num} items
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="rounded-xl h-10 w-10 p-0 border-slate-200 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Basic pagination logic to show only few numbers if many pages
                if (totalPages > 5 && Math.abs(pageNum - currentPage) > 1 && pageNum !== 1 && pageNum !== totalPages) {
                  if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="px-1 text-slate-300">...</span>;
                  return null;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={cn(
                      "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                      currentPage === pageNum 
                        ? "bg-[#0f172a] text-white shadow-lg shadow-slate-200" 
                        : "text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-xl h-10 w-10 p-0 border-slate-200 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      <AnimatePresence>
        {confirmCancelId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmCancelId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="text-red-600" size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#0f172a]">Cancel Appointment?</h3>
                  <p className="text-slate-500 font-medium">
                    Are you sure you want to cancel this consultation? This action cannot be undone.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-14 rounded-2xl font-bold border-slate-200"
                    onClick={() => setConfirmCancelId(null)}
                  >
                    No, keep it
                  </Button>
                  <Button
                    variant="primary"
                    className="h-14 rounded-2xl font-bold bg-red-600 hover:bg-red-700 border-none shadow-lg shadow-red-200"
                    onClick={handleConfirmCancel}
                  >
                    Yes, cancel it
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


