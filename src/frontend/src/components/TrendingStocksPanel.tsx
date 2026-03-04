import { Skeleton } from "@/components/ui/skeleton";
import { Package, TrendingUp, Zap } from "lucide-react";
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

  const cardStyle = {
    background: "oklch(0.14 0.008 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <div
              key={`skeleton-${k}`}
              className="rounded-xl overflow-hidden shadow-card"
              style={cardStyle}
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
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.72 0.18 200 / 0.1)" }}
          >
            <TrendingUp
              className="w-8 h-8"
              style={{ color: "oklch(0.72 0.18 200 / 0.4)" }}
            />
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
                className="rounded-xl overflow-hidden shadow-card neon-card fade-in"
                style={{
                  ...cardStyle,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Image */}
                <div
                  className="relative h-40 overflow-hidden"
                  style={{ background: "oklch(0.18 0.01 250)" }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-muted-foreground/20" />
                    </div>
                  )}
                  <div
                    className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
                    style={{
                      background: "oklch(0.72 0.18 200 / 0.9)",
                      color: "oklch(0.09 0.005 250)",
                    }}
                  >
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
                    <span className="font-bold text-primary text-base">
                      ₹{Number(product.unitPrice).toLocaleString("en-IN")}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                      style={
                        product.isLowStock
                          ? {
                              background: "oklch(0.62 0.22 25 / 0.12)",
                              color: "oklch(0.62 0.22 25)",
                            }
                          : {
                              background: "oklch(0.75 0.22 150 / 0.12)",
                              color: "oklch(0.75 0.22 150)",
                            }
                      }
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
