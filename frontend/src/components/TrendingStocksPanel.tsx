import { TrendingUp, Package } from 'lucide-react';
import { useGetAllStockItems } from '../hooks/useQueries';

export default function TrendingStocksPanel() {
  const { data: stockItems = [], isLoading } = useGetAllStockItems();
  const trendingItems = stockItems.filter((item) => item.isTrending);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-neon-surface border border-neon-green/20 rounded-xl p-5 animate-pulse">
            <div className="h-4 bg-neon-green/10 rounded mb-3 w-32" />
            <div className="h-6 bg-neon-green/10 rounded w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (trendingItems.length === 0) {
    return (
      <div className="bg-neon-surface border border-neon-green/20 rounded-xl p-8 text-center">
        <TrendingUp className="w-12 h-12 text-neon-dim/30 mx-auto mb-3" />
        <p className="text-neon-dim font-mono text-sm">No trending products yet</p>
        <p className="text-neon-dim/50 font-mono text-xs mt-1">Mark items as trending in Stock Management</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {trendingItems.map((item, idx) => (
        <div
          key={String(item.id)}
          className="bg-neon-surface border border-neon-green/20 rounded-xl p-5 hover:border-neon-green/50 hover:shadow-neon-sm hover:bg-neon-green/5 transition-all duration-300"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="flex items-start gap-3 mb-3">
            {item.image ? (
              <img
                src={item.image.getDirectURL()}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover border border-neon-green/20"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-neon-green/50" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-mono font-semibold text-sm truncate">{item.name}</h3>
              <p className="text-neon-dim font-mono text-xs">{item.category}</p>
            </div>
            <span className="flex-shrink-0 text-xs px-2 py-1 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Hot
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neon-green font-mono font-bold">₹{Number(item.unitPrice).toLocaleString('en-IN')}</span>
            <span className="text-neon-dim font-mono text-xs">{String(item.quantity)} in stock</span>
          </div>
        </div>
      ))}
    </div>
  );
}
