import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { warehouseData } from '@/data/mockData';

export function WarehouseActivityChart() {
  const [data, setData] = useState(
    warehouseData.map(w => ({
      name: w.code,
      fullName: w.name,
      activity: w.currentLoad,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        activity: Math.max(10, Math.min(100, item.activity + (Math.random() * 10 - 5))),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getBarColor = (value: number) => {
    if (value >= 90) return 'hsl(var(--destructive))';
    if (value >= 70) return 'hsl(var(--warning))';
    return 'hsl(var(--success))';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Warehouse Activity</h3>
          <p className="text-sm text-muted-foreground">Real-time capacity utilization</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success" />
            Normal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-warning" />
            High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            Critical
          </span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={12} />
            <YAxis
              type="category"
              dataKey="name"
              width={50}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Activity']}
              labelFormatter={(label) => data.find(d => d.name === label)?.fullName || label}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar dataKey="activity" radius={[0, 4, 4, 0]} maxBarSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.activity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
