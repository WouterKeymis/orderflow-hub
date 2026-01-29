import { useState, useMemo } from 'react';
import { Download, Package, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { TopNav } from '@/components/layout/TopNav';
import { SummaryCard } from '@/components/orders/SummaryCard';
import { OrderFilters } from '@/components/orders/OrderFilters';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { Button } from '@/components/ui/button';
import { orders as allOrders } from '@/data/mockData';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function OrderAllocations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter orders based on criteria
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!order.orderNumber.toLowerCase().includes(query) && 
            !order.customerName.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Date range filter
      if (dateRange?.from) {
        const orderDate = new Date(order.orderDate);
        if (orderDate < dateRange.from) return false;
        if (dateRange.to && orderDate > dateRange.to) return false;
      }

      // Country filter
      if (selectedCountries.length > 0 && !selectedCountries.includes(order.country)) {
        return false;
      }

      // Warehouse filter
      if (selectedWarehouses.length > 0 && !selectedWarehouses.includes(order.allocatedWarehouse)) {
        return false;
      }

      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(order.status)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, dateRange, selectedCountries, selectedWarehouses, selectedStatuses]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = allOrders.filter(o => o.orderDate === today);
    
    return {
      totalToday: todayOrders.length || allOrders.length,
      pending: allOrders.filter(o => o.status === 'Pending').length,
      onHold: allOrders.filter(o => o.status === 'On Hold').length,
      processed: allOrders.filter(o => o.status === 'Processed').length,
    };
  }, []);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Order Number', 'Customer Name', 'Order Date', 'Country', 'Warehouse', 'Total Items', 'Status'];
    const rows = filteredOrders.map(order => [
      order.orderNumber,
      order.customerName,
      order.orderDate,
      order.country,
      order.allocatedWarehouse,
      order.totalItems.toString(),
      order.status,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen">
      <TopNav title="Order Allocations" subtitle="Manage and track order distribution across warehouses" />
      
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Orders Today"
            value={summaryStats.totalToday}
            icon={Package}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <SummaryCard
            title="Orders Pending"
            value={summaryStats.pending}
            icon={Clock}
            variant="pending"
          />
          <SummaryCard
            title="Orders On Hold"
            value={summaryStats.onHold}
            icon={AlertCircle}
            variant="warning"
          />
          <SummaryCard
            title="Orders Processed"
            value={summaryStats.processed}
            icon={CheckCircle2}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Filters and Export */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <OrderFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedCountries={selectedCountries}
            onCountriesChange={setSelectedCountries}
            selectedWarehouses={selectedWarehouses}
            onWarehousesChange={setSelectedWarehouses}
            selectedStatuses={selectedStatuses}
            onStatusesChange={setSelectedStatuses}
          />
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Export to CSV
          </Button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders</span>
        </div>

        {/* Orders Table */}
        <OrdersTable
          orders={filteredOrders}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
