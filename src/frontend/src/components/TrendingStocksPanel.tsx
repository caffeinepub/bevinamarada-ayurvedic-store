import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, Package, TrendingUp } from "lucide-react";
import React from "react";
import { useGetTrendingStockItems } from "../hooks/useQueries";

export default function TrendingStocksPanel() {
  const { data: products, isLoading, isError } = useGetTrendingStockItems();

  if (isError) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Failed to load trending products.
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <div
              key={`skeleton-${k}`}
              className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-card"
            >
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-forest/40" />
          </div>
          <p className="text-muted-foreground font-medium">
            No trending products yet
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Mark products as trending from the Stock Management page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => {
            const imageUrl = product.image
              ? product.image.getDirectURL()
              : null;
            return (
              <div
                key={String(product.id)}
                className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-40 bg-sage-light/30 overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Leaf className="w-10 h-10 text-forest/30" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-semibold text-foreground text-sm mt-1 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest text-base">
                      ₹{Number(product.unitPrice).toLocaleString("en-IN")}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                        product.isLowStock
                          ? "bg-destructive/10 text-destructive"
                          : "bg-sage-light text-forest"
                      }`}
                    >
                      <Package className="w-3 h-3" />
                      {String(product.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
