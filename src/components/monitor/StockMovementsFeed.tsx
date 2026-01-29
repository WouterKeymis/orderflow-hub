import { ArrowDown, ArrowUp, ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface StockMovement {
  id: string;
  sku: string;
  productName: string;
  movementType: string;
  quantity: number;
  from: string;
  to: string;
  timestamp: string;
}

interface StockMovementsFeedProps {
  movements: StockMovement[];
}

const movementConfig: Record<string, { icon: typeof ArrowDown; color: string; bgColor: string }> = {
  'Inbound': { icon: ArrowDown, color: 'text-success', bgColor: 'bg-success/10' },
  'Outbound': { icon: ArrowUp, color: 'text-warning', bgColor: 'bg-warning/10' },
  'Transfer': { icon: ArrowRight, color: 'text-primary', bgColor: 'bg-primary/10' },
};

export function StockMovementsFeed({ movements }: StockMovementsFeedProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium text-foreground">Stock Movement Feed</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <ArrowDown className="w-3 h-3 text-success" />
            Inbound
          </span>
          <span className="flex items-center gap-1">
            <ArrowUp className="w-3 h-3 text-warning" />
            Outbound
          </span>
          <span className="flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-primary" />
            Transfer
          </span>
        </div>
      </div>

      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-2">
          {movements.map((movement, index) => {
            const config = movementConfig[movement.movementType] || movementConfig['Transfer'];
            const Icon = config.icon;
            
            return (
              <div
                key={movement.id}
                className="feed-item animate-slide-in-left"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', config.bgColor)}>
                  <Icon className={cn('w-4 h-4', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary">{movement.sku}</span>
                    <span className={cn(
                      'text-xs font-medium',
                      config.color
                    )}>
                      {movement.movementType === 'Inbound' ? '+' : '-'}{movement.quantity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{movement.productName}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <span>{movement.from}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>{movement.to}</span>
                    <span className="ml-2">{format(new Date(movement.timestamp), 'HH:mm:ss')}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {movements.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Package className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm">No stock movements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
