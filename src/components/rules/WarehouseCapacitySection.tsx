import { useState } from 'react';
import { Warehouse, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { warehouseData as initialData, Warehouse as WarehouseType } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface WarehouseCapacitySectionProps {
  onDataChange: () => void;
}

export function WarehouseCapacitySection({ onDataChange }: WarehouseCapacitySectionProps) {
  const [warehouses, setWarehouses] = useState<WarehouseType[]>(initialData);

  const handleToggle = (id: string) => {
    setWarehouses(prev => prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
    onDataChange();
  };

  const handlePriorityChange = (id: string, value: number[]) => {
    setWarehouses(prev => prev.map(w => w.id === id ? { ...w, priorityScore: value[0] } : w));
    onDataChange();
  };

  const getLoadColor = (load: number) => {
    if (load >= 90) return 'text-destructive';
    if (load >= 70) return 'text-warning';
    return 'text-success';
  };

  const getLoadBgColor = (load: number) => {
    if (load >= 90) return 'bg-destructive';
    if (load >= 70) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-foreground">Warehouse Capacity Rules</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure capacity limits and priority scores for each distribution center
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {warehouses.map((warehouse, index) => (
          <div
            key={warehouse.id}
            className={cn(
              'bg-card rounded-xl border border-border shadow-sm p-6 transition-all duration-200 animate-fade-in',
              !warehouse.enabled && 'opacity-60'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Warehouse className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{warehouse.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{warehouse.code}</span>
                </div>
              </div>
              <Switch
                checked={warehouse.enabled}
                onCheckedChange={() => handleToggle(warehouse.id)}
              />
            </div>

            <div className="space-y-4">
              {/* Current Load */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current Load</span>
                  <span className={cn('font-semibold', getLoadColor(warehouse.currentLoad))}>
                    {warehouse.currentLoad}%
                  </span>
                </div>
                <Progress
                  value={warehouse.currentLoad}
                  className="h-2"
                  indicatorClassName={getLoadBgColor(warehouse.currentLoad)}
                />
              </div>

              {/* Max Daily Orders */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Max Daily Orders</span>
                <span className="text-sm font-medium">{warehouse.maxDailyOrders.toLocaleString()}</span>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Operating Hours
                </span>
                <span className="text-sm font-medium">{warehouse.operatingHours}</span>
              </div>

              {/* Priority Score */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Priority Score</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold rounded-lg bg-primary text-primary-foreground">
                    {warehouse.priorityScore}
                  </span>
                </div>
                <Slider
                  value={[warehouse.priorityScore]}
                  onValueChange={(val) => handlePriorityChange(warehouse.id, val)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
