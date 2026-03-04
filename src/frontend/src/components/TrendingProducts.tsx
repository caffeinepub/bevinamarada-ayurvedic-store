import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Leaf, Phone, TrendingUp } from "lucide-react";
import React from "react";
import { useGetTrendingStockItems } from "../hooks/useQueries";

export default function TrendingProducts() {
  const { data: products, isLoading, isError } = useGetTrendingStockItems();

  if (isError) return null;
  if (!isLoading && (!products || products.length === 0)) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium text-gold uppercase tracking-wider">
                Trending Now
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-forest">
              Popular Products
            </h2>
          </div>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-dark transition-colors"
          >
            Enquire for more <Phone className="w-4 h-4" />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? ["a", "b", "c", "d"].map((k) => (
                <div
                  key={`skeleton-${k}`}
                  className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-card"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-8 w-full mt-2" />
                  </div>
                </div>
              ))
            : products!.map((product) => {
                const imageUrl = product.image
                  ? product.image.getDirectURL()
                  : null;
                return (
                  <div
                    key={String(product.id)}
                    className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-sage-light/30 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Leaf className="w-12 h-12 text-forest/30" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-sm mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-forest text-base">
                          ₹{Number(product.unitPrice).toLocaleString("en-IN")}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            product.isLowStock
                              ? "bg-destructive/10 text-destructive"
                              : "bg-sage-light text-forest"
                          }`}
                        >
                          {product.isLowStock
                            ? "Low Stock"
                            : `${String(product.quantity)} in stock`}
                        </span>
                      </div>
                      <Link
                        to="/contact"
                        className="w-full flex items-center justify-center gap-2 bg-forest text-white text-sm font-medium py-2 rounded-lg hover:bg-forest-dark transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
