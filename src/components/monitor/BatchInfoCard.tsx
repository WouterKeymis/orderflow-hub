import { useState, useEffect } from 'react';
import { Package, Clock, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BatchInfoCardProps {
  isPaused: boolean;
}

export function BatchInfoCard({ isPaused }: BatchInfoCardProps) {
  const [progress, setProgress] = useState(34);
  const [batchId] = useState(`BATCH-${Date.now().toString(36).toUpperCase()}`);
  const [startTime] = useState(new Date());

  useEffect(() => {
    if (!isPaused && progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 3;
          return Math.min(100, prev + increment);
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPaused, progress]);

  const estimatedCompletion = new Date(startTime.getTime() + (100 / progress) * (Date.now() - startTime.getTime()));

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Current Batch</h3>
            <p className="text-sm font-mono text-muted-foreground">{batchId}</p>
          </div>
        </div>
        {!isPaused && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span className="text-sm font-medium text-success">Processing</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Started At</p>
              <p className="text-sm font-medium">{startTime.toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Est. Completion</p>
              <p className="text-sm font-medium">{estimatedCompletion.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
