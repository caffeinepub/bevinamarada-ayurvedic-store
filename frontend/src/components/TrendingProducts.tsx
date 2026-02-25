import { Link } from '@tanstack/react-router';
import { TrendingUp, ShoppingBag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTrendingStockItems } from '../hooks/useQueries';

export default function TrendingProducts() {
  const { data: items, isLoading, isError } = useGetTrendingStockItems();

  if (isError || (!isLoading && (!items || items.length === 0))) {
    return null;
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-bold">Trending Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))
            : items?.map((item) => {
                const imageUrl = item.image ? item.image.getDirectURL() : null;
                return (
                  <div
                    key={item.id.toString()}
                    className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-card"
                  >
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-base mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          ₹{Number(item.unitPrice).toLocaleString('en-IN')}
                        </span>
                        <Link
                          to="/contact"
                          className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Enquire
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
