import { Package, CheckCircle2, Loader2, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ProcessingEvent {
  id: string;
  orderNumber: string;
  status: string;
  timestamp: string;
  warehouse: string;
}

interface OrderProcessingFeedProps {
  events: ProcessingEvent[];
  queueCount: number;
  isPaused: boolean;
}

const statusConfig: Record<string, { icon: typeof Package; color: string; bgColor: string }> = {
  'Validated': { icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10' },
  'Processing': { icon: Loader2, color: 'text-primary', bgColor: 'bg-primary/10' },
  'Allocated': { icon: Package, color: 'text-warning', bgColor: 'bg-warning/10' },
  'Complete': { icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10' },
};

export function OrderProcessingFeed({ events, queueCount, isPaused }: OrderProcessingFeedProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-foreground">Live Order Feed</h3>
          {!isPaused && (
            <span className="flex items-center gap-1 text-xs text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{queueCount}</span>
          <span className="text-muted-foreground">in queue</span>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-2">
          {events.map((event, index) => {
            const config = statusConfig[event.status] || statusConfig['Processing'];
            const Icon = config.icon;
            
            return (
              <div
                key={event.id}
                className={cn(
                  'feed-item animate-slide-in-left',
                  index === 0 && 'border-primary/50 bg-primary/5'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', config.bgColor)}>
                  <Icon className={cn('w-4 h-4', config.color, event.status === 'Processing' && 'animate-spin')} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-primary">{event.orderNumber}</span>
                    <span className={cn('text-xs font-medium', config.color)}>{event.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{event.warehouse}</span>
                    <span>•</span>
                    <span>{format(new Date(event.timestamp), 'HH:mm:ss')}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm">No processing events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
