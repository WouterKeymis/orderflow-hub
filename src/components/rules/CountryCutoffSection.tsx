import { useState } from 'react';
import { Plus, Edit2, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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
import { countryCutoffs as initialData, CountryCutoff } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface CountryCutoffSectionProps {
  onDataChange: () => void;
}

export function CountryCutoffSection({ onDataChange }: CountryCutoffSectionProps) {
  const [cutoffs, setCutoffs] = useState<CountryCutoff[]>(initialData);
  const [editingCutoff, setEditingCutoff] = useState<CountryCutoff | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const timezones = ['EST', 'PST', 'GMT', 'CET', 'AEST', 'JST', 'UTC'];

  const handleToggle = (id: string) => {
    setCutoffs(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
    onDataChange();
  };

  const handleDelete = (id: string) => {
    setCutoffs(prev => prev.filter(c => c.id !== id));
    toast({ title: "Cutoff time deleted" });
    onDataChange();
  };

  const handleSave = () => {
    if (editingCutoff) {
      if (editingCutoff.id.startsWith('new-')) {
        setCutoffs(prev => [...prev, { ...editingCutoff, id: `cc-${Date.now()}` }]);
        toast({ title: "Cutoff time added" });
      } else {
        setCutoffs(prev => prev.map(c => c.id === editingCutoff.id ? editingCutoff : c));
        toast({ title: "Cutoff time updated" });
      }
      setIsDialogOpen(false);
      setEditingCutoff(null);
      onDataChange();
    }
  };

  const openAddDialog = () => {
    setEditingCutoff({
      id: `new-${Date.now()}`,
      country: '',
      countryCode: '',
      cutoffTime: '17:00',
      timezone: 'EST',
      priority: cutoffs.length + 1,
      enabled: true,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Country Cutoff Times</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Set order processing cutoff times by country to ensure same-day shipping
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Cutoff Time
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>{editingCutoff?.id.startsWith('new-') ? 'Add' : 'Edit'} Cutoff Time</DialogTitle>
              <DialogDescription>
                Configure when orders must be received to be processed the same day.
              </DialogDescription>
            </DialogHeader>
            {editingCutoff && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={editingCutoff.country}
                      onChange={(e) => setEditingCutoff({ ...editingCutoff, country: e.target.value })}
                      placeholder="e.g., United States"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Country Code</Label>
                    <Input
                      id="code"
                      value={editingCutoff.countryCode}
                      onChange={(e) => setEditingCutoff({ ...editingCutoff, countryCode: e.target.value.toUpperCase() })}
                      placeholder="e.g., US"
                      maxLength={2}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Cutoff Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={editingCutoff.cutoffTime}
                      onChange={(e) => setEditingCutoff({ ...editingCutoff, cutoffTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={editingCutoff.timezone}
                      onValueChange={(val) => setEditingCutoff({ ...editingCutoff, timezone: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {timezones.map(tz => (
                          <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Input
                    id="priority"
                    type="number"
                    min={1}
                    max={20}
                    value={editingCutoff.priority}
                    onChange={(e) => setEditingCutoff({ ...editingCutoff, priority: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Code</th>
              <th>Cutoff Time</th>
              <th>Timezone</th>
              <th>Priority</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cutoffs.map((cutoff, index) => (
              <tr key={cutoff.id} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <td className="font-medium">{cutoff.country}</td>
                <td>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-muted">
                    {cutoff.countryCode}
                  </span>
                </td>
                <td>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {cutoff.cutoffTime}
                  </span>
                </td>
                <td className="text-muted-foreground">{cutoff.timezone}</td>
                <td>
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {cutoff.priority}
                  </span>
                </td>
                <td>
                  <Switch
                    checked={cutoff.enabled}
                    onCheckedChange={() => handleToggle(cutoff.id)}
                  />
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingCutoff(cutoff);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cutoff.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
