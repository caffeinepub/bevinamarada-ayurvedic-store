import React from 'react';
import { BarChart3, Package, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSalesReports, useGetAllStockItems } from '../hooks/useQueries';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export default function RevenueOverview() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: stockItems = [] } = useGetAllStockItems();

  const getItemName = (id: bigint) =>
    stockItems.find((i) => i.id === id)?.name ?? `Item #${id}`;

  const totalRevenue = Number(reports?.totalRevenue ?? 0n);

  // Monthly revenue: entry with key "0" or "00" means current month
  const monthlyEntry = reports?.monthlySales?.find(([key]) => key === '0' || key === '00');
  const monthlyRevenue = monthlyEntry ? Number(monthlyEntry[1]) : 0;

  if (reportsLoading) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center">
              <TrendingUp size={15} className="text-white" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</p>
          </div>
          <p className="text-xl font-bold text-foreground">{formatINR(totalRevenue)}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg gradient-saffron flex items-center justify-center">
              <BarChart3 size={15} className="text-white" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly</p>
          </div>
          <p className="text-xl font-bold text-foreground">{formatINR(monthlyRevenue)}</p>
        </div>
      </div>

      {/* Product Breakdown */}
      {reports?.productBreakdown && reports.productBreakdown.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Breakdown</p>
          <div className="max-h-52 overflow-y-auto space-y-1.5">
            {reports.productBreakdown
              .slice()
              .sort((a, b) => Number(b[1]) - Number(a[1]))
              .slice(0, 8)
              .map(([productId, count]) => (
                <div
                  key={String(productId)}
                  className="flex items-center justify-between py-2 px-3 bg-muted/40 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg gradient-coral flex items-center justify-center">
                      <Package size={11} className="text-white" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{getItemName(productId)}</p>
                  </div>
                  <span className="badge-coral text-xs">{Number(count)} sold</span>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <BarChart3 className="w-10 h-10 mx-auto mb-2 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground font-medium">No revenue data yet</p>
        </div>
      )}
    </div>
  );
}
