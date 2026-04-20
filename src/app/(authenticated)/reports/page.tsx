'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  Activity,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
  Stethoscope,
  Info,
  Utensils,
  Footprints,
  PieChart as PieIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  medicalReports, 
  glucoseTrends, 
  bloodPressureTrends, 
  HealthMetric,
  dietComposition,
  weeklyActivity
} from '@/features/reports/reportsData';
import { formatDate } from '@/utils/date-helpers';
import Link from 'next/link';
import { cn } from '@/components/ui/Button';

export default function ReportsPage() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [userEmail, setUserEmail] = useState('Patient');

  useEffect(() => {
    const savedEmail = localStorage.getItem('virtucare_user_email');
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 print:p-0 print:m-0 print:bg-white print:max-w-none print:space-y-6">
      <style jsx global>{`
        @media print {
          @page { margin: 15mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-break-inside-avoid { break-inside: avoid !important; }
          .print-break-before-always { break-before: always !important; }
        }
      `}</style>
      {/* Header / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 print:hidden">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-slate-500 hover:text-[#0f172a] font-bold text-sm mb-4 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a]">
            Clinical <span className="text-[#134e4a]">Reports</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Comprehensive summary of your medical diagnostics and lab results.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="rounded-2xl border-slate-200 bg-white shadow-sm font-bold text-[#0f172a]"
          >
            <Printer size={18} className="mr-2" />
            Print Report
          </Button>

        </div>
      </div>

      {/* Print Header (Visible only when printing) */}
      <div className="hidden print:flex items-center justify-between border-b-2 border-slate-900 pb-8 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2dd4bf] rounded-xl flex items-center justify-center">
            <Activity size={28} className="text-[#0f172a]" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0f172a]">VirtuCare Clinical Record</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Confidential Patient Document</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-[#0f172a]">Patient: {userEmail}</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Report Date: {formatDate(new Date().toISOString())}</p>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
        <MetricCard
          label="Glucose Level"
          value="92"
          unit="mg/dL"
          trend="down"
          change="4.2%"
          status="Stable"
          color="emerald"
        />
        <MetricCard
          label="Blood Pressure"
          value="119/78"
          unit="mmHg"
          trend="down"
          change="1.5%"
          status="Optimal"
          color="indigo"
        />
        <MetricCard
          label="Heart Rate"
          value="72"
          unit="bpm"
          trend="up"
          change="2.1%"
          status="Normal"
          color="teal"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-1 print:gap-6">
        {/* 1. Glucose Trend */}
        <Card className="border-slate-100 shadow-sm overflow-hidden print:shadow-none print:border-slate-200 print-break-inside-avoid">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-500" />
                  Glucose Trend
                </h3>
                <p className="text-xs text-slate-400 font-bold tracking-widest">Last 4 Months Analysis</p>
              </div>
            </div>
            <div className="h-48 w-full mt-4">
              <TrendChart data={glucoseTrends} color="#10b981" />
            </div>
          </CardContent>
        </Card>

        {/* 2. Nutritional Balance (Donut) */}
        <Card className="border-slate-100 shadow-sm overflow-hidden print:shadow-none print:border-slate-200 print-break-inside-avoid">
          <CardContent className="p-8 space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                <Utensils size={20} className="text-amber-500" />
                Nutritional Balance
              </h3>
              <p className="text-xs text-slate-400 font-bold tracking-widest">Diet Composition</p>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[192px]">
              <DonutChart data={dietComposition} />
            </div>
          </CardContent>
        </Card>

        {/* 3. Blood Pressure Trend */}
        <Card className="border-slate-100 shadow-sm overflow-hidden print:shadow-none print:border-slate-200 print-break-inside-avoid">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                  <Activity size={20} className="text-indigo-500" />
                  Blood Pressure Trend
                </h3>
                <p className="text-xs text-slate-400 font-bold tracking-widest">Systolic Measurements</p>
              </div>
            </div>
            <div className="h-48 w-full mt-4">
              <TrendChart data={bloodPressureTrends} color="#6366f1" />
            </div>
          </CardContent>
        </Card>

        {/* 4. Weekly Activity (Bar) */}
        <Card className="border-slate-100 shadow-sm overflow-hidden print:shadow-none print:border-slate-200 print-break-inside-avoid">
          <CardContent className="p-8 space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                <Footprints size={20} className="text-teal-500" />
                Weekly Activity
              </h3>
              <p className="text-xs text-slate-400 font-bold tracking-widest">Daily Step Count</p>
            </div>
            <div className="flex-1 min-h-[192px] w-full">
              <BarChart data={weeklyActivity} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lab Results Table */}
      <div className="space-y-6 print:mt-12">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-2xl font-black text-[#0f172a] flex items-center gap-3">
            <Stethoscope size={24} className="text-[#134e4a]" />
            Diagnostic Results
          </h3>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest print:hidden">
            <Info size={14} /> Ref Range: Lab Standard
          </div>
        </div>

        <Card className="border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden print:shadow-none print:border-slate-200 print-break-inside-avoid">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Test Name</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Result</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Reference Range</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {medicalReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group print:break-inside-avoid">
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="font-bold text-[#0f172a]">{report.testName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{report.category}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Calendar size={14} className="text-slate-300" />
                        {formatDate(report.date)}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-lg font-black text-[#0f172a]">
                        {report.result} <span className="text-[10px] text-slate-400 font-bold">{report.unit}</span>
                      </p>
                    </td>
                    <td className="p-6 text-center">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 border border-slate-200">
                        {report.range}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                        report.status === 'Normal' ? "bg-emerald-50 text-emerald-600" :
                          report.status === 'Critical' ? "bg-red-100 text-red-600 animate-pulse" :
                            "bg-amber-50 text-amber-600"
                      )}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Footer / Notes */}
      <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4 print:bg-white print:border-none print:p-0 print:mt-12">
        <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest flex items-center gap-2">
          <Info size={16} className="text-[#134e4a]" /> Clinical Notes
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          The results above are for informational purposes based on recent laboratory tests. Your medical practitioner, <strong>Dr. Sofia Chen</strong>, has reviewed these values. Please continue your current medication schedule as prescribed. If you experience persistent symptoms, schedule a follow-up consultation via the portal.
        </p>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, trend, change, status, color }: any) {
  const colors: any = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
  };

  return (
    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden print:shadow-none print:border-slate-200">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", colors[color])}>
            {status}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full",
            trend === 'down' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trend === 'down' ? <ArrowDownRight size={10} /> : <ArrowUpRight size={10} />}
            {change}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-4xl font-black text-[#0f172a] group-hover:scale-105 transition-transform origin-left">
            {value} <span className="text-sm font-bold text-slate-300 ml-1">{unit}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendChart({ data, color }: { data: HealthMetric[], color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min;
  const padding = range * 0.3;
  const chartMin = min - padding;
  const chartMax = max + padding;
  const chartRange = chartMax - chartMin;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - chartMin) / chartRange) * 100;
    return `${x},${y}`;
  }).join(' ');

  const gradientId = `grad-${color.replace('#', '')}`;

  return (
    <div className="h-full w-full relative group/chart">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <line key={v} x1="0" y1={v} x2="100" y2={v} stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2,2" />
        ))}
        {data.map((_, i) => (
          <line key={i} x1={(i / (data.length - 1)) * 100} y1="0" x2={(i / (data.length - 1)) * 100} y2="100" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2,2" />
        ))}
        
        {/* Fill Area */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          d={`M 0,100 L ${points} L 100,100 Z`}
          fill={`url(#${gradientId})`}
        />

        {/* Shadow Line for depth */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeOpacity="0.05"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="translate-y-1"
        />

        {/* Main Line */}
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          filter="url(#glow)"
        />
        
        {/* Data Points and Labels */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - ((d.value - chartMin) / chartRange) * 100;
          return (
            <g key={i} className="cursor-pointer">
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                cx={x}
                cy={y}
                r="3"
                fill="white"
                stroke={color}
                strokeWidth="2.5"
                className="drop-shadow-sm"
              />
              <motion.text
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                x={x}
                y={y - 8}
                textAnchor="middle"
                className="text-[6px] font-black fill-slate-900 pointer-events-none"
              >
                {d.value}
              </motion.text>
            </g>
          );
        })}
      </svg>
      
      {/* Labels */}
      <div className="absolute bottom-[-28px] left-0 right-0 flex justify-between px-1">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{d.label}</span>
            <span className="text-[8px] font-bold text-slate-300">{formatDate(d.date).split(',')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data }: { data: any[] }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentOffset = 0;

  return (
    <div className="flex items-center gap-8">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
          {data.map((item, i) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += percentage;

            return (
              <motion.circle
                key={i}
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke={item.color}
                strokeWidth="4"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-black text-[#0f172a]">100%</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase">Total</span>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-bold text-slate-600">{item.label}</span>
            <span className="text-xs font-black text-[#0f172a]">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data }: { data: any[] }) {
  const max = Math.max(...data.map(d => d.steps));
  const colors = ['#10b981', '#6366f1', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#f43f5e'];

  return (
    <div className="h-full w-full flex items-end justify-between gap-2 pt-4">
      {data.map((d, i) => {
        const height = (d.steps / max) * 100;
        const color = colors[i % colors.length];
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
            <div className="w-full relative flex flex-col justify-end h-32">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{ backgroundColor: color }} 
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
              {/* Tooltip-like label */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-[#0f172a] text-white text-[8px] font-bold px-1.5 py-0.5 rounded pointer-events-none z-10">
                {d.steps.toLocaleString()}
              </div>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}
