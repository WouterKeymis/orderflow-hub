import { useState } from 'react';
import { Plus, Trash2, CalendarOff, CalendarMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { holidayDates as initialData, HolidayDate } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface HolidayDatesSectionProps {
  onDataChange: () => void;
}

const warehouses = ['All', 'US East', 'US West', 'EU Central', 'APAC', 'UK'];

export function HolidayDatesSection({ onDataChange }: HolidayDatesSectionProps) {
  const [holidays, setHolidays] = useState<HolidayDate[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [newHoliday, setNewHoliday] = useState<Partial<HolidayDate>>({
    warehouse: 'All',
    type: 'Closed',
    description: '',
  });

  const handleDelete = (id: string) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
    toast({ title: "Holiday date removed" });
    onDataChange();
  };

  const handleAdd = () => {
    if (selectedDate && newHoliday.description) {
      const holiday: HolidayDate = {
        id: `hd-${Date.now()}`,
        date: format(selectedDate, 'yyyy-MM-dd'),
        warehouse: newHoliday.warehouse || 'All',
        type: newHoliday.type as 'Closed' | 'Reduced' || 'Closed',
        description: newHoliday.description,
      };
      setHolidays(prev => [...prev, holiday]);
      toast({ title: "Holiday date added" });
      setIsDialogOpen(false);
      setSelectedDate(undefined);
      setNewHoliday({ warehouse: 'All', type: 'Closed', description: '' });
      onDataChange();
    }
  };

  // Get all holiday dates for calendar highlighting
  const holidayDateObjects = holidays.map(h => new Date(h.date));

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Holiday & Blackout Dates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Mark dates when warehouses are closed or operating at reduced capacity
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Holiday
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-w-md">
            <DialogHeader>
              <DialogTitle>Add Holiday Date</DialogTitle>
              <DialogDescription>
                Select a date and configure the closure type.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Warehouse</Label>
                  <Select
                    value={newHoliday.warehouse}
                    onValueChange={(val) => setNewHoliday(prev => ({ ...prev, warehouse: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {warehouses.map(wh => (
                        <SelectItem key={wh} value={wh}>{wh}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newHoliday.type}
                    onValueChange={(val: 'Closed' | 'Reduced') => setNewHoliday(prev => ({ ...prev, type: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Reduced">Reduced Capacity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newHoliday.description}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g., Christmas Day"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!selectedDate || !newHoliday.description}>Add Holiday</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Calendar View */}
        <div className="flex flex-col items-center">
          <Calendar
            mode="multiple"
            selected={holidayDateObjects}
            className="rounded-lg border"
            modifiers={{
              holiday: holidayDateObjects,
            }}
            modifiersStyles={{
              holiday: {
                backgroundColor: 'hsl(var(--destructive) / 0.1)',
                color: 'hsl(var(--destructive))',
                fontWeight: 'bold',
              },
            }}
          />
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/20" />
              <span className="text-muted-foreground">Holiday/Blackout Date</span>
            </div>
          </div>
        </div>

        {/* Holiday List */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Configured Holidays</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {holidays.map((holiday, index) => (
              <div
                key={holiday.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border border-border bg-background animate-fade-in',
                  holiday.type === 'Closed' ? 'border-l-4 border-l-destructive' : 'border-l-4 border-l-warning'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-lg',
                    holiday.type === 'Closed' ? 'bg-destructive/10' : 'bg-warning/10'
                  )}>
                    {holiday.type === 'Closed' ? (
                      <CalendarOff className={cn('w-5 h-5', holiday.type === 'Closed' ? 'text-destructive' : 'text-warning')} />
                    ) : (
                      <CalendarMinus className="w-5 h-5 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{holiday.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{format(new Date(holiday.date), 'MMM dd, yyyy')}</span>
                      <span>•</span>
                      <span>{holiday.warehouse}</span>
                      <span>•</span>
                      <span className={holiday.type === 'Closed' ? 'text-destructive' : 'text-warning'}>
                        {holiday.type}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(holiday.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
