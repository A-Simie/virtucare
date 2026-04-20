import { cn } from "@/components/ui/Button";

interface AvatarProps {
  src?: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ src, name, className, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 md:w-14 md:h-14 text-base',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-32 h-32 md:w-40 md:h-40 text-2xl',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-2xl',
    lg: 'rounded-[24px]',
    xl: 'rounded-[32px]',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden flex items-center justify-center shrink-0 border-2 border-white shadow-sm",
        sizeClasses[size],
        roundedClasses[size],
        !src && "bg-[#ecfdf5] text-[#134e4a] font-bold",
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover object-center" 
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
