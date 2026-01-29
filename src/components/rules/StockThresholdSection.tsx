import { useState } from 'react';
import { Package, AlertTriangle, Shield, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { stockThresholds as initialData } from '@/data/mockData';

interface StockThresholdSectionProps {
  onDataChange: () => void;
}

export function StockThresholdSection({ onDataChange }: StockThresholdSectionProps) {
  const [thresholds, setThresholds] = useState(initialData);

  const handleChange = (field: keyof typeof thresholds, value: number) => {
    setThresholds(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const thresholdItems = [
    {
      key: 'minimumStockLevel' as const,
      label: 'Minimum Stock Level',
      description: 'Alert threshold when stock falls below this quantity',
      icon: Package,
      suffix: 'units',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      key: 'reorderPoint' as const,
      label: 'Reorder Point',
      description: 'Trigger replenishment when stock reaches this level',
      icon: AlertTriangle,
      suffix: 'units',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      key: 'safetyStockPercentage' as const,
      label: 'Safety Stock',
      description: 'Buffer stock percentage above minimum level',
      icon: Shield,
      suffix: '%',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      key: 'bufferDays' as const,
      label: 'Buffer Days',
      description: 'Lead time buffer for order processing',
      icon: Calendar,
      suffix: 'days',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Stock Threshold Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure inventory thresholds to trigger alerts and automatic reordering
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thresholdItems.map((item, index) => (
            <div
              key={item.key}
              className="p-6 rounded-lg border border-border bg-background animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <Label htmlFor={item.key} className="text-base font-medium">
                      {item.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id={item.key}
                      type="number"
                      value={thresholds[item.key]}
                      onChange={(e) => handleChange(item.key, parseInt(e.target.value) || 0)}
                      className="w-32"
                      min={0}
                    />
                    <span className="text-sm text-muted-foreground">{item.suffix}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
