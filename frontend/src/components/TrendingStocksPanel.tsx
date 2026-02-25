import React from 'react';
import { TrendingUp, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useGetTrendingStockItems } from '../hooks/useQueries';

function formatINR(value: bigint): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
}

export default function TrendingStocksPanel() {
  const { data: items, isLoading } = useGetTrendingStockItems();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm font-bold">No trending products yet</p>
        <p className="text-xs font-bold text-gray-300 mt-1">Mark items as trending in Stock Management</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {items.map((item, idx) => (
        <div
          key={String(item.id)}
          className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl hover:bg-amber-100 transition-colors"
        >
          <span className="text-xs font-black text-amber-600 w-5 text-center">#{idx + 1}</span>
          {item.image ? (
            <img src={item.image.getDirectURL()} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-amber-200" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-200">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm text-gray-900 truncate">{item.name}</p>
            <p className="text-xs font-bold text-gray-500">{item.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-black text-sm text-forest-700">{formatINR(item.unitPrice)}</p>
            <Badge className="text-xs font-black bg-amber-500 hover:bg-amber-600 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> Hot
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
