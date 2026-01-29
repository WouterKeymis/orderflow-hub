import { useState } from "react";
import { Search, Calendar, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
  selectedWarehouses: string[];
  onWarehousesChange: (warehouses: string[]) => void;
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
}

const countries = ["Belgium", "Netherlands", "France", "Germany", "Luxembourg"];
const warehouses = ["Luxembourg", "Beringen", "Tessenderlo"];
const statuses = ["Processed", "On Hold", "Pending"];

export function OrderFilters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  selectedCountries,
  onCountriesChange,
  selectedWarehouses,
  onWarehousesChange,
  selectedStatuses,
  onStatusesChange,
}: OrderFiltersProps) {
  const [dateOpen, setDateOpen] = useState(false);

  const toggleArrayItem = (arr: string[], item: string): string[] => {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  };

  const activeFiltersCount =
    selectedCountries.length +
    selectedWarehouses.length +
    selectedStatuses.length +
    (dateRange ? 1 : 0);

  const clearAllFilters = () => {
    onSearchChange("");
    onDateRangeChange(undefined);
    onCountriesChange([]);
    onWarehousesChange([]);
    onStatusesChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by order number or customer name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Date Range */}
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "gap-2",
                dateRange && "border-primary text-primary",
              )}
            >
              <Calendar className="w-4 h-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d")} -{" "}
                    {format(dateRange.to, "MMM d")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                "Date Range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Country Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "gap-2",
                selectedCountries.length > 0 && "border-primary text-primary",
              )}
            >
              <Filter className="w-4 h-4" />
              Country
              {selectedCountries.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {selectedCountries.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 bg-popover" align="start">
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-3">Select Countries</h4>
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={selectedCountries.includes(country)}
                    onCheckedChange={() =>
                      onCountriesChange(
                        toggleArrayItem(selectedCountries, country),
                      )
                    }
                  />
                  <Label
                    htmlFor={`country-${country}`}
                    className="text-sm cursor-pointer"
                  >
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Warehouse Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "gap-2",
                selectedWarehouses.length > 0 && "border-primary text-primary",
              )}
            >
              <Filter className="w-4 h-4" />
              Warehouse
              {selectedWarehouses.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {selectedWarehouses.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-popover" align="start">
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-3">Select Warehouses</h4>
              {warehouses.map((warehouse) => (
                <div key={warehouse} className="flex items-center space-x-2">
                  <Checkbox
                    id={`warehouse-${warehouse}`}
                    checked={selectedWarehouses.includes(warehouse)}
                    onCheckedChange={() =>
                      onWarehousesChange(
                        toggleArrayItem(selectedWarehouses, warehouse),
                      )
                    }
                  />
                  <Label
                    htmlFor={`warehouse-${warehouse}`}
                    className="text-sm cursor-pointer"
                  >
                    {warehouse}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "gap-2",
                selectedStatuses.length > 0 && "border-primary text-primary",
              )}
            >
              <Filter className="w-4 h-4" />
              Status
              {selectedStatuses.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {selectedStatuses.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 bg-popover" align="start">
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-3">Select Status</h4>
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() =>
                      onStatusesChange(
                        toggleArrayItem(selectedStatuses, status),
                      )
                    }
                  />
                  <Label
                    htmlFor={`status-${status}`}
                    className="text-sm cursor-pointer"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear filters ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
}
