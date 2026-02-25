import { useGetSalesReports, useGetAllStockItems } from '../hooks/useQueries';
import { DollarSign, TrendingUp, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function RevenueOverview() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: stockItems, isLoading: stockLoading } = useGetAllStockItems();

  const isLoading = reportsLoading || stockLoading;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  const totalRevenue = Number(reports?.totalRevenue ?? 0);
  const totalSales = Number(reports?.totalSales ?? 0);

  // Calculate monthly revenue (last 30 days = month 0)
  const monthlyRevenue = reports?.monthlySales
    .filter(([month]) => month === '00')
    .reduce((sum, [, amount]) => sum + Number(amount), 0) ?? 0;

  const getItemName = (id: bigint) => {
    return stockItems?.find(item => item.id === id)?.name ?? `Product #${id}`;
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-forest-500 to-sage-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 opacity-80" />
            <span className="text-xs opacity-80">Total Revenue</span>
          </div>
          <p className="text-xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <p className="text-xs opacity-70 mt-1">{totalSales} sales</p>
        </div>
        <div className="bg-gradient-to-br from-saffron-500 to-gold-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 opacity-80" />
            <span className="text-xs opacity-80">This Month</span>
          </div>
          <p className="text-xl font-bold">₹{monthlyRevenue.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Product Breakdown */}
      {reports?.productBreakdown && reports.productBreakdown.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-forest-700">Top Products</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {reports.productBreakdown.slice(0, 5).map(([productId, qty]) => (
              <div
                key={productId.toString()}
                className="flex items-center gap-3 p-3 bg-forest-50 rounded-xl border border-forest-100"
              >
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-forest-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-forest-800 truncate">{getItemName(productId)}</p>
                </div>
                <p className="text-sm font-bold text-forest-700">{qty.toString()} sold</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-forest-400">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No sales data yet</p>
        </div>
      )}
    </div>
  );
}
