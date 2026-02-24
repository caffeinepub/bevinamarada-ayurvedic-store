import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';
import { useGetRevenueOverview, useGetAllStockItems } from '../hooks/useQueries';
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

export default function RevenueOverview() {
  const { data: revenue, isLoading: revenueLoading } = useGetRevenueOverview();
  const { data: stockItems, isLoading: stockLoading } = useGetAllStockItems();

  const isLoading = revenueLoading || stockLoading;

  const getItemName = (id: bigint) => {
    const item = stockItems?.find((s) => s.id === id);
    return item?.name ?? `Item #${id}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <Skeleton className="h-11 w-11 rounded-xl mb-3 shimmer" />
              <Skeleton className="h-4 w-28 mb-2 shimmer" />
              <Skeleton className="h-8 w-36 shimmer" />
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <Skeleton className="h-5 w-40 mb-4 shimmer" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full mb-2 shimmer" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-primary/20 rounded-2xl p-5 card-hover animate-fade-in-up">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <BarChart2 className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm font-bold mb-1">Total Revenue</p>
          <p className="metric-value text-2xl text-primary">
            {formatINR(Number(revenue?.totalRevenue ?? 0))}
          </p>
        </div>
        <div className="bg-card border border-accent/20 rounded-2xl p-5 card-hover animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm font-bold mb-1">Monthly Revenue</p>
          <p className="metric-value text-2xl text-accent">
            {formatINR(Number(revenue?.monthlyRevenue ?? 0))}
          </p>
        </div>
      </div>

      {/* Product Breakdown */}
      {revenue?.productBreakdown && revenue.productBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display font-bold text-foreground text-lg">Product Revenue Breakdown</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Product</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Sales Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenue.productBreakdown.map(([productId, salesCount]) => (
                <TableRow key={productId.toString()} className="table-row-hover border-border">
                  <TableCell className="font-semibold text-foreground">{getItemName(productId)}</TableCell>
                  <TableCell className="text-right font-bold text-accent metric-value">{salesCount.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
