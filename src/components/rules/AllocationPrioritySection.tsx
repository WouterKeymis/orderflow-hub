import { useState } from 'react';
import { GripVertical, MapPin, Package, DollarSign, Zap, Users } from 'lucide-react';
import { allocationRules as initialData, AllocationRule } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AllocationPrioritySectionProps {
  onDataChange: () => void;
}

const iconMap: Record<string, typeof MapPin> = {
  'Geographic Proximity': MapPin,
  'Stock Availability': Package,
  'Cost Efficiency': DollarSign,
  'Delivery Speed': Zap,
  'Customer Priority Level': Users,
};

export function AllocationPrioritySection({ onDataChange }: AllocationPrioritySectionProps) {
  const [rules, setRules] = useState<AllocationRule[]>(initialData);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = rules.findIndex(r => r.id === draggedItem);
    const targetIndex = rules.findIndex(r => r.id === targetId);

    const newRules = [...rules];
    const [removed] = newRules.splice(draggedIndex, 1);
    newRules.splice(targetIndex, 0, removed);

    // Update order numbers
    const updatedRules = newRules.map((rule, index) => ({
      ...rule,
      order: index + 1,
    }));

    setRules(updatedRules);
    setDraggedItem(null);
    onDataChange();
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Allocation Priority Rules</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop to reorder criteria by priority. Higher items take precedence in allocation decisions.
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-2">
          {rules.map((rule, index) => {
            const Icon = iconMap[rule.name] || Package;
            return (
              <div
                key={rule.id}
                draggable
                onDragStart={(e) => handleDragStart(e, rule.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, rule.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border border-border bg-background cursor-move transition-all duration-200 animate-fade-in',
                  draggedItem === rule.id && 'opacity-50 scale-[0.98]',
                  draggedItem && draggedItem !== rule.id && 'hover:border-primary hover:bg-accent'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {rule.order}
                  </span>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{rule.name}</h3>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
