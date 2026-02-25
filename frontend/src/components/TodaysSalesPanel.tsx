import React from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTodaysSales, useGetAllStockItems } from '../hooks/useQueries';

function formatINR(value: bigint): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
}

export default function TodaysSalesPanel() {
  const { data: sales, isLoading: salesLoading } = useGetTodaysSales();
  const { data: stockItems } = useGetAllStockItems();

  const getItemName = (id: bigint) => stockItems?.find((i) => i.id === id)?.name ?? `Item #${id}`;

  const totalRevenue = sales?.reduce((sum, s) => sum + s.totalPrice, 0n) ?? 0n;
  const totalQty = sales?.reduce((sum, s) => sum + s.quantity, 0n) ?? 0n;

  if (salesLoading) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <p className="text-xs font-black text-green-700 uppercase tracking-wide">Revenue</p>
          <p className="text-xl font-black text-green-800 mt-1">{formatINR(totalRevenue)}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-xs font-black text-blue-700 uppercase tracking-wide">Units Sold</p>
          <p className="text-xl font-black text-blue-800 mt-1">{String(totalQty)}</p>
        </div>
      </div>

      {/* Transactions */}
      {!sales || sales.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-bold">No sales today</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sales.map((sale) => (
            <div key={String(sale.id)} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div>
                <p className="text-sm font-black text-gray-900">{getItemName(sale.stockItemId)}</p>
                <p className="text-xs font-bold text-gray-500">Qty: {String(sale.quantity)}</p>
              </div>
              <p className="text-sm font-black text-forest-700">{formatINR(sale.totalPrice)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
