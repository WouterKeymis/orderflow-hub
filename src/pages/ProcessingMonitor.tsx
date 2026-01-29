import { useState, useEffect, useRef } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { Pause, Play, RefreshCw, Activity, Database, Server, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderProcessingFeed } from '@/components/monitor/OrderProcessingFeed';
import { StockMovementsFeed } from '@/components/monitor/StockMovementsFeed';
import { WarehouseActivityChart } from '@/components/monitor/WarehouseActivityChart';
import { BatchInfoCard } from '@/components/monitor/BatchInfoCard';
import { cn } from '@/lib/utils';
import { generateProcessingEvent, generateStockMovement } from '@/data/mockData';

interface HealthStatus {
  api: 'healthy' | 'warning' | 'error';
  database: 'healthy' | 'warning' | 'error';
  queue: 'healthy' | 'warning' | 'error';
  lastSync: Date;
}

export default function ProcessingMonitor() {
  const [isPaused, setIsPaused] = useState(false);
  const [processingEvents, setProcessingEvents] = useState<ReturnType<typeof generateProcessingEvent>[]>([]);
  const [stockMovements, setStockMovements] = useState<ReturnType<typeof generateStockMovement>[]>([]);
  const [queueCount, setQueueCount] = useState(47);
  const [healthStatus] = useState<HealthStatus>({
    api: 'healthy',
    database: 'healthy',
    queue: 'healthy',
    lastSync: new Date(),
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate initial data
    const initialProcessing = Array.from({ length: 8 }, () => generateProcessingEvent());
    const initialStock = Array.from({ length: 8 }, () => generateStockMovement());
    setProcessingEvents(initialProcessing);
    setStockMovements(initialStock);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        // Add new processing event
        setProcessingEvents(prev => {
          const newEvent = generateProcessingEvent();
          return [newEvent, ...prev.slice(0, 19)];
        });

        // Add new stock movement (every other tick)
        if (Math.random() > 0.5) {
          setStockMovements(prev => {
            const newMovement = generateStockMovement();
            return [newMovement, ...prev.slice(0, 19)];
          });
        }

        // Update queue count
        setQueueCount(prev => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(0, Math.min(100, prev + delta));
        });
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const getHealthBadge = (status: 'healthy' | 'warning' | 'error') => {
    const styles = {
      healthy: 'health-healthy',
      warning: 'health-warning',
      error: 'health-error',
    };
    const labels = {
      healthy: 'Operational',
      warning: 'Degraded',
      error: 'Down',
    };
    return (
      <span className={cn('health-indicator', styles[status])}>
        <span className={cn(
          'w-2 h-2 rounded-full',
          status === 'healthy' && 'bg-success',
          status === 'warning' && 'bg-warning',
          status === 'error' && 'bg-destructive'
        )} />
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen">
      <TopNav title="Processing Monitor" subtitle="Real-time order processing and stock movement activity" />
      
      <div className="p-6 space-y-6">
        {/* Health Status Bar */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">API Status:</span>
                {getHealthBadge(healthStatus.api)}
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Database:</span>
                {getHealthBadge(healthStatus.database)}
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Queue Health:</span>
                {getHealthBadge(healthStatus.queue)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Sync:</span>
                <span className="text-sm font-medium">
                  {healthStatus.lastSync.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="gap-2"
              >
                {isPaused ? (
                  <>
                    <Play className="w-4 h-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setProcessingEvents([]);
                  setStockMovements([]);
                }}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - Split View */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Order Processing */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Order Processing</h2>
            
            <BatchInfoCard isPaused={isPaused} />
            
            <OrderProcessingFeed 
              events={processingEvents} 
              queueCount={queueCount}
              isPaused={isPaused}
            />
          </div>

          {/* Right: Stock Movements */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Stock Movements</h2>
            
            <WarehouseActivityChart />
            
            <StockMovementsFeed movements={stockMovements} />
          </div>
        </div>
      </div>
    </div>
  );
}
