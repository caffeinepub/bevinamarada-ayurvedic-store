import React from 'react';
import { TrendingUp, Package } from 'lucide-react';
import { useGetTrendingStockItems } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TrendingStocksPanel() {
  const { data: trending, isLoading } = useGetTrendingStockItems();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
            <Skeleton className="h-36 w-full shimmer" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4 shimmer" />
              <Skeleton className="h-4 w-1/2 shimmer" />
              <Skeleton className="h-6 w-1/3 shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!trending || trending.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center animate-fade-in">
        <TrendingUp className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-muted-foreground font-semibold">No trending products yet</p>
        <p className="text-muted-foreground/60 text-sm mt-1 font-medium">Mark products as trending in Stock Management</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {trending.map((item, i) => (
        <div
          key={item.id.toString()}
          className="bg-card border border-border rounded-2xl overflow-hidden card-hover animate-fade-in-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Image */}
          <div className="relative h-36 bg-muted/30 flex items-center justify-center overflow-hidden">
            {item.image ? (
              <img
                src={item.image.getDirectURL()}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-12 h-12 text-muted-foreground/30" />
            )}
            <div className="absolute top-2 right-2">
              <span className="badge-gold px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-bold text-foreground text-base mb-1 truncate">{item.name}</h3>
            <span className="badge-green px-2 py-0.5 rounded-full text-xs inline-block mb-2">
              {item.category}
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground text-xs font-semibold">
                Stock: <span className="font-bold text-foreground">{item.quantity.toString()}</span>
              </span>
              <span className="metric-value text-lg text-accent font-extrabold">
                {formatINR(Number(item.unitPrice))}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
