import { HTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-[#e2e8f0] bg-white shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 border-b border-[#f1f5f9]', className)} {...props} />
);

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6', className)} {...props} />
);

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export { Card, CardHeader, CardContent, CardFooter };
