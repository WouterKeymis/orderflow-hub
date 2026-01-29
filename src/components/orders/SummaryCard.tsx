import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'pending';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-primary/5 border-primary/20',
  success: 'bg-success/5 border-success/20',
  warning: 'bg-warning/5 border-warning/20',
  pending: 'bg-pending/5 border-pending/20',
};

const iconVariantStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  pending: 'bg-pending/10 text-pending',
};

export function SummaryCard({ title, value, icon: Icon, trend, variant = 'default' }: SummaryCardProps) {
  return (
    <div className={cn(
      'summary-card flex items-start justify-between',
      variantStyles[variant]
    )}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {trend && (
          <p className={cn(
            'text-xs font-medium flex items-center gap-1',
            trend.isPositive ? 'text-success' : 'text-destructive'
          )}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}% from yesterday</span>
          </p>
        )}
      </div>
      <div className={cn(
        'flex items-center justify-center w-10 h-10 rounded-lg',
        iconVariantStyles[variant]
      )}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
