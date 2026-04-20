import { cn } from './Button';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-slate-200/60",
        className
      )}
    />
  );
}
