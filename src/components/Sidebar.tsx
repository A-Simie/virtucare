'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Settings,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { cn } from './ui/Button';
import { Avatar } from './ui/Avatar';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Find Doctors', href: '/find-doctors', icon: Search },
  { name: 'My Appointments', href: '/appointments', icon: CalendarDays },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavContent = () => (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#2dd4bf] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Activity className="text-[#0f172a]" size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">VirtuCare</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Medical Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-[#1e293b] text-[#2dd4bf] shadow-sm'
                      : 'text-slate-400 hover:bg-[#1e293b] hover:text-white'
                  )}
                >
                  <item.icon size={20} className={cn(
                    'transition-colors',
                    isActive ? 'text-[#2dd4bf]' : 'text-slate-400 group-hover:text-white'
                  )} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-[#2dd4bf] rounded-full shadow-[0_0_8px_#2dd4bf]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1e293b] rounded-xl border border-slate-700/50">
          <Avatar name="Dr. S. Chen" size="sm" className="border-slate-700" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">Dr. S. Chen</p>
            <p className="text-[10px] text-slate-400 font-medium">Administrator</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a] flex items-center justify-between px-6 z-[60] border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Activity className="text-[#2dd4bf]" size={24} />
          <span className="font-bold text-white text-lg">VirtuCare</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#0f172a] flex-col z-50 border-r border-slate-800">
        <NavContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Content */}
      <aside className={cn(
        "lg:hidden fixed left-0 top-0 h-screen w-72 bg-[#0f172a] flex flex-col z-[60] transform transition-transform duration-300 ease-in-out border-r border-slate-800",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent />
      </aside>
    </>
  );
}
