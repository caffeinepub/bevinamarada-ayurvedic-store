import { Link } from "@tanstack/react-router";
import { AlertTriangle, Package } from "lucide-react";
import React from "react";
import { useGetLowStockItems } from "../hooks/useQueries";

export default function LowStockWarning() {
  const { data: lowStockItems, isLoading } = useGetLowStockItems();

  if (isLoading || !lowStockItems || lowStockItems.length === 0) return null;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "oklch(0.75 0.18 72 / 0.08)",
        border: "1px solid oklch(0.75 0.18 72 / 0.25)",
      }}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="w-5 h-5 shrink-0 mt-0.5"
          style={{ color: "oklch(0.75 0.18 72)" }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground text-sm mb-2">
            Low Stock Alert — {lowStockItems.length} item
            {lowStockItems.length > 1 ? "s" : ""} need restocking
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {lowStockItems.slice(0, 5).map((item) => (
              <span
                key={String(item.id)}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  background: "oklch(0.75 0.18 72 / 0.15)",
                  color: "oklch(0.75 0.18 72)",
                  border: "1px solid oklch(0.75 0.18 72 / 0.2)",
                }}
              >
                <Package className="w-3 h-3" />
                {item.name} ({String(item.quantity)} left)
              </span>
            ))}
            {lowStockItems.length > 5 && (
              <span className="text-xs text-muted-foreground self-center">
                +{lowStockItems.length - 5} more
              </span>
            )}
          </div>
          <Link
            to="/admin/stock"
            className="text-xs font-medium transition-colors hover:underline"
            style={{ color: "oklch(0.75 0.22 150)" }}
          >
            Go to Stock Management →
          </Link>
        </div>
      </div>
    </div>
  );
}
