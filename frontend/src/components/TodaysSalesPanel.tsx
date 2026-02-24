import React from 'react';
import { ShoppingCart, IndianRupee } from 'lucide-react';
import { useGetTodaysSales, useGetAllStockItems } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function TodaysSalesPanel() {
  const { data: sales, isLoading: salesLoading } = useGetTodaysSales();
  const { data: stockItems, isLoading: stockLoading } = useGetAllStockItems();

  const isLoading = salesLoading || stockLoading;

  const getItemName = (id: bigint) => {
    const item = stockItems?.find((s) => s.id === id);
    return item?.name ?? `Item #${id}`;
  };

  const totalRevenue = sales?.reduce((sum, s) => sum + Number(s.totalPrice), 0) ?? 0;
  const orderCount = sales?.length ?? 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <Skeleton className="h-11 w-11 rounded-xl mb-3 shimmer" />
              <Skeleton className="h-4 w-24 mb-2 shimmer" />
              <Skeleton className="h-8 w-20 shimmer" />
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full mb-2 shimmer" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-primary/20 rounded-2xl p-5 card-hover animate-fade-in-up">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm font-bold mb-1">Orders Today</p>
          <p className="metric-value text-2xl text-primary">{orderCount}</p>
        </div>
        <div className="bg-card border border-accent/20 rounded-2xl p-5 card-hover animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
            <IndianRupee className="w-5 h-5 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm font-bold mb-1">Revenue Today</p>
          <p className="metric-value text-2xl text-accent">{formatINR(totalRevenue)}</p>
        </div>
      </div>

      {/* Transactions Table */}
      {sales && sales.length > 0 ? (
        <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display font-bold text-foreground text-lg">Today's Transactions</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Sale ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Item</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Qty</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Total</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id.toString()} className="table-row-hover border-border">
                  <TableCell className="font-bold text-muted-foreground text-sm">#{sale.id.toString()}</TableCell>
                  <TableCell className="font-semibold text-foreground">{getItemName(sale.stockItemId)}</TableCell>
                  <TableCell className="text-right font-bold metric-value text-foreground">{sale.quantity.toString()}</TableCell>
                  <TableCell className="text-right font-bold metric-value text-accent">{formatINR(Number(sale.totalPrice))}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm font-medium">{formatTime(sale.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-8 text-center animate-fade-in">
          <ShoppingCart className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground font-semibold">No sales recorded today</p>
        </div>
      )}
    </div>
  );
}
