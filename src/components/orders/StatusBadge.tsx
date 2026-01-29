import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Processed' | 'On Hold' | 'Pending';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusStyles = {
    'Processed': 'status-processed',
    'On Hold': 'status-on-hold',
    'Pending': 'status-pending',
  };

  const dotColors = {
    'Processed': 'bg-success',
    'On Hold': 'bg-warning',
    'Pending': 'bg-pending',
  };

  return (
    <span className={cn(
      'status-badge',
      statusStyles[status],
      size === 'sm' && 'px-2 py-0.5 text-[10px]'
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[status])} />
      {status}
    </span>
  );
}
