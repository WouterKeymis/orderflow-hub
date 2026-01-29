import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
import { shippingPreferences as initialData, ShippingPreference } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShippingPreferencesSectionProps {
  onDataChange: () => void;
}

const costTierColors = {
  'Economy': 'bg-pending/10 text-pending',
  'Standard': 'bg-primary/10 text-primary',
  'Express': 'bg-warning/10 text-warning',
  'Premium': 'bg-success/10 text-success',
};

export function ShippingPreferencesSection({ onDataChange }: ShippingPreferencesSectionProps) {
  const [preferences, setPreferences] = useState<ShippingPreference[]>(initialData);
  const [editingPref, setEditingPref] = useState<ShippingPreference | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const costTiers: ShippingPreference['costTier'][] = ['Economy', 'Standard', 'Express', 'Premium'];

  const handleToggle = (id: string) => {
    setPreferences(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
    onDataChange();
  };

  const handleDelete = (id: string) => {
    setPreferences(prev => prev.filter(p => p.id !== id));
    toast({ title: "Shipping preference deleted" });
    onDataChange();
  };

  const handleSave = () => {
    if (editingPref) {
      if (editingPref.id.startsWith('new-')) {
        setPreferences(prev => [...prev, { ...editingPref, id: `sp-${Date.now()}` }]);
        toast({ title: "Shipping preference added" });
      } else {
        setPreferences(prev => prev.map(p => p.id === editingPref.id ? editingPref : p));
        toast({ title: "Shipping preference updated" });
      }
      setIsDialogOpen(false);
      setEditingPref(null);
      onDataChange();
    }
  };

  const openAddDialog = () => {
    setEditingPref({
      id: `new-${Date.now()}`,
      country: '',
      carrier: '',
      costTier: 'Standard',
      enabled: true,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Shipping Method Preferences</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Map countries to preferred carriers and shipping tiers
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Preference
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>{editingPref?.id.startsWith('new-') ? 'Add' : 'Edit'} Shipping Preference</DialogTitle>
              <DialogDescription>
                Configure carrier and cost tier for a country.
              </DialogDescription>
            </DialogHeader>
            {editingPref && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={editingPref.country}
                    onChange={(e) => setEditingPref({ ...editingPref, country: e.target.value })}
                    placeholder="e.g., United States"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">Carrier</Label>
                  <Input
                    id="carrier"
                    value={editingPref.carrier}
                    onChange={(e) => setEditingPref({ ...editingPref, carrier: e.target.value })}
                    placeholder="e.g., FedEx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier">Cost Tier</Label>
                  <Select
                    value={editingPref.costTier}
                    onValueChange={(val: ShippingPreference['costTier']) => setEditingPref({ ...editingPref, costTier: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {costTiers.map(tier => (
                        <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <th>Carrier</th>
              <th>Cost Tier</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {preferences.map((pref, index) => (
              <tr
                key={pref.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="font-medium">{pref.country}</td>
                <td>{pref.carrier}</td>
                <td>
                  <Badge variant="secondary" className={cn('font-medium', costTierColors[pref.costTier])}>
                    {pref.costTier}
                  </Badge>
                </td>
                <td>
                  <Switch
                    checked={pref.enabled}
                    onCheckedChange={() => handleToggle(pref.id)}
                  />
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingPref(pref);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(pref.id)}
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
