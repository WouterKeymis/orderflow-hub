import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Order } from '@/data/mockData';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  itemsPerPage: number;
}

export function OrdersTable({ orders, currentPage, itemsPerPage }: OrdersTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return orders.slice(start, start + itemsPerPage);
  }, [orders, currentPage, itemsPerPage]);

  const toggleRow = (orderId: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-8"></th>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Country</th>
              <th>Warehouse</th>
              <th className="text-center">Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => {
              const isExpanded = expandedRows.has(order.id);
              return (
                <>
                  <tr
                    key={order.id}
                    onClick={() => toggleRow(order.id)}
                    className={cn(
                      'animate-fade-in',
                      isExpanded && 'bg-muted/30'
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="w-8">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </td>
                    <td className="font-mono text-sm font-medium text-primary">{order.orderNumber}</td>
                    <td className="font-medium">{order.customerName}</td>
                    <td className="text-muted-foreground">{format(new Date(order.orderDate), 'MMM dd, yyyy')}</td>
                    <td>{order.country}</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-muted">
                        {order.allocatedWarehouse}
                      </span>
                    </td>
                    <td className="text-center font-medium">{order.totalItems}</td>
                    <td><StatusBadge status={order.status} /></td>
                  </tr>
                  {isExpanded && (
                    <tr className="animate-fade-in">
                      <td colSpan={8} className="p-0 bg-muted/20">
                        <div className="p-4 pl-12">
                          <h4 className="text-sm font-semibold text-foreground mb-3">Order Items</h4>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-muted-foreground">
                                <th className="text-left font-medium pb-2 pr-4">SKU Code</th>
                                <th className="text-left font-medium pb-2 pr-4">Product Name</th>
                                <th className="text-center font-medium pb-2 pr-4">Quantity</th>
                                <th className="text-right font-medium pb-2 pr-4">Unit Price</th>
                                <th className="text-right font-medium pb-2">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.skus.map((sku) => (
                                <tr key={sku.skuCode} className="border-t border-border/50">
                                  <td className="py-2 pr-4 font-mono text-xs text-primary">{sku.skuCode}</td>
                                  <td className="py-2 pr-4">{sku.productName}</td>
                                  <td className="py-2 pr-4 text-center">{sku.quantity}</td>
                                  <td className="py-2 pr-4 text-right text-muted-foreground">{formatCurrency(sku.unitPrice)}</td>
                                  <td className="py-2 text-right font-medium">{formatCurrency(sku.unitPrice * sku.quantity)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="border-t border-border">
                                <td colSpan={4} className="pt-2 text-right font-semibold">Order Total:</td>
                                <td className="pt-2 text-right font-bold text-primary">
                                  {formatCurrency(order.skus.reduce((sum, sku) => sum + sku.unitPrice * sku.quantity, 0))}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
