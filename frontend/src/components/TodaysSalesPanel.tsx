import { useGetTodaysSales, useGetAllStockItems } from '../hooks/useQueries';
import { ShoppingCart, TrendingUp, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TodaysSalesPanel() {
  const { data: todaysSales, isLoading: salesLoading } = useGetTodaysSales();
  const { data: stockItems, isLoading: stockLoading } = useGetAllStockItems();

  const isLoading = salesLoading || stockLoading;

  const totalRevenue = todaysSales?.reduce((sum, sale) => sum + Number(sale.totalPrice), 0) ?? 0;
  const totalUnits = todaysSales?.reduce((sum, sale) => sum + Number(sale.quantity), 0) ?? 0;

  const getItemName = (stockItemId: bigint) => {
    return stockItems?.find(item => item.id === stockItemId)?.name ?? `Item #${stockItemId}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-forest-500 to-sage-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 opacity-80" />
            <span className="text-xs opacity-80">Revenue</span>
          </div>
          <p className="text-xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-saffron-500 to-gold-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart className="w-4 h-4 opacity-80" />
            <span className="text-xs opacity-80">Units Sold</span>
          </div>
          <p className="text-xl font-bold">{totalUnits}</p>
        </div>
      </div>

      {/* Transactions */}
      {todaysSales && todaysSales.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-forest-700">Today's Transactions</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {todaysSales.map((sale) => (
              <div
                key={sale.id.toString()}
                className="flex items-center gap-3 p-3 bg-forest-50 rounded-xl border border-forest-100"
              >
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-forest-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-forest-800 truncate">{getItemName(sale.stockItemId)}</p>
                  <p className="text-xs text-forest-500">Qty: {sale.quantity.toString()}</p>
                </div>
                <p className="text-sm font-bold text-forest-700">₹{Number(sale.totalPrice).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-forest-400">
          <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No sales today yet</p>
        </div>
      )}
    </div>
  );
}
