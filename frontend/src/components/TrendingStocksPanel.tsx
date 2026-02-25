import { useGetTrendingStockItems } from '../hooks/useQueries';
import { TrendingUp, Package, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrendingStocksPanel() {
  const { data: trendingItems, isLoading } = useGetTrendingStockItems();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!trendingItems || trendingItems.length === 0) {
    return (
      <div className="text-center py-8 text-forest-400">
        <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No trending products yet</p>
        <p className="text-xs mt-1">Mark products as trending in Stock Management</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {trendingItems.map((item, index) => (
        <div
          key={item.id.toString()}
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-gold-50 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-200"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {item.image ? (
            <img
              src={item.image.getDirectURL()}
              alt={item.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-forest-800 truncate">{item.name}</p>
            <p className="text-xs text-forest-500">{item.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-forest-700">₹{Number(item.unitPrice).toLocaleString('en-IN')}</p>
            <div className="flex items-center gap-1 justify-end">
              <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
              <span className="text-xs text-amber-600 font-medium">Trending</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
