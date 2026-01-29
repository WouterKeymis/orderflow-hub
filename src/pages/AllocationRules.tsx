import { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CountryCutoffSection } from '@/components/rules/CountryCutoffSection';
import { WarehouseCapacitySection } from '@/components/rules/WarehouseCapacitySection';
import { AllocationPrioritySection } from '@/components/rules/AllocationPrioritySection';
import { StockThresholdSection } from '@/components/rules/StockThresholdSection';
import { ShippingPreferencesSection } from '@/components/rules/ShippingPreferencesSection';
import { HolidayDatesSection } from '@/components/rules/HolidayDatesSection';
import { Clock, Warehouse, ArrowUpDown, Package, Truck, CalendarDays, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AllocationRules() {
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "All allocation rules have been updated successfully.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    toast({
      title: "Settings reset",
      description: "All changes have been discarded.",
    });
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen">
      <TopNav title="Allocation Rules" subtitle="Configure order routing and warehouse allocation settings" />
      
      <div className="p-6">
        <Tabs defaultValue="cutoff" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="cutoff" className="gap-2 data-[state=active]:bg-card">
                <Clock className="w-4 h-4" />
                Cutoff Times
              </TabsTrigger>
              <TabsTrigger value="warehouse" className="gap-2 data-[state=active]:bg-card">
                <Warehouse className="w-4 h-4" />
                Warehouse Capacity
              </TabsTrigger>
              <TabsTrigger value="priority" className="gap-2 data-[state=active]:bg-card">
                <ArrowUpDown className="w-4 h-4" />
                Allocation Priority
              </TabsTrigger>
              <TabsTrigger value="stock" className="gap-2 data-[state=active]:bg-card">
                <Package className="w-4 h-4" />
                Stock Thresholds
              </TabsTrigger>
              <TabsTrigger value="shipping" className="gap-2 data-[state=active]:bg-card">
                <Truck className="w-4 h-4" />
                Shipping Preferences
              </TabsTrigger>
              <TabsTrigger value="holidays" className="gap-2 data-[state=active]:bg-card">
                <CalendarDays className="w-4 h-4" />
                Holiday Dates
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset Changes
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset all changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will discard all unsaved changes and restore the previous settings. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save All Changes
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save all changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will apply all configuration changes to the allocation system. Orders will be routed according to the new rules immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <TabsContent value="cutoff" className="animate-fade-in">
            <CountryCutoffSection onDataChange={() => setHasChanges(true)} />
          </TabsContent>

          <TabsContent value="warehouse" className="animate-fade-in">
            <WarehouseCapacitySection onDataChange={() => setHasChanges(true)} />
          </TabsContent>

          <TabsContent value="priority" className="animate-fade-in">
            <AllocationPrioritySection onDataChange={() => setHasChanges(true)} />
          </TabsContent>

          <TabsContent value="stock" className="animate-fade-in">
            <StockThresholdSection onDataChange={() => setHasChanges(true)} />
          </TabsContent>

          <TabsContent value="shipping" className="animate-fade-in">
            <ShippingPreferencesSection onDataChange={() => setHasChanges(true)} />
          </TabsContent>

          <TabsContent value="holidays" className="animate-fade-in">
            <HolidayDatesSection onDataChange={() => setHasChanges(true)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
