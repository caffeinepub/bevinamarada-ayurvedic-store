import { Link } from '@tanstack/react-router';
import { TrendingUp, Package, MessageCircle } from 'lucide-react';
import { useGetTrendingStockItems } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrendingProducts() {
  const { data: trendingItems, isLoading } = useGetTrendingStockItems();

  if (!isLoading && (!trendingItems || trendingItems.length === 0)) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-gold-500 flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-forest-800 font-display">Trending Products</h2>
            <p className="text-forest-500 text-sm">Our most popular Ayurvedic products</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-forest-100">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingItems!.map((item, index) => (
              <div
                key={item.id.toString()}
                className="bg-white rounded-2xl border border-forest-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-forest-50 to-sage-50 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image.getDirectURL()}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-forest-200" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-sm">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-forest-800 mb-1 truncate">{item.name}</h3>
                  <p className="text-forest-500 text-sm mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-forest-700 mb-3">
                    ₹{Number(item.unitPrice).toLocaleString('en-IN')}
                  </p>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
