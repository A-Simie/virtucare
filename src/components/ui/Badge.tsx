import { HTMLAttributes } from 'react';
import { cn } from './Button';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#f1f5f9] text-[#475569]',
    success: 'bg-[#ecfdf5] text-[#059669]',
    warning: 'bg-[#fffbeb] text-[#d97706]',
    error: 'bg-[#fef2f2] text-[#dc2626]',
    outline: 'border border-[#e2e8f0] text-[#64748b]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
