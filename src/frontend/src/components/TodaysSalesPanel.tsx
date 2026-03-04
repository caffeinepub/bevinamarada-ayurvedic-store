import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import React from "react";
import { useGetAllStockItems, useGetTodaysSales } from "../hooks/useQueries";

export default function TodaysSalesPanel() {
  const { data: sales, isLoading: salesLoading } = useGetTodaysSales();
  const { data: stockItems } = useGetAllStockItems();

  const totalRevenue = sales
    ? sales.reduce((sum, s) => sum + Number(s.totalPrice), 0)
    : 0;
  const totalQuantity = sales
    ? sales.reduce((sum, s) => sum + Number(s.quantity), 0)
    : 0;

  const getProductName = (id: bigint) => {
    const item = stockItems?.find((s) => s.id === id);
    return item?.name ?? `Product #${String(id)}`;
  };

  const cardStyle = {
    background: "oklch(0.14 0.008 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-xl shadow-card p-5 border-l-4 border-l-primary flex flex-col gap-2 neon-card"
          style={cardStyle}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Today's Revenue
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.75 0.22 150 / 0.12)" }}
            >
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </div>
          {salesLoading ? (
            <div className="h-7 w-20 bg-muted rounded animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
          )}
        </div>
        <div
          className="rounded-xl shadow-card p-5 border-l-4 border-l-accent flex flex-col gap-2 neon-card"
          style={cardStyle}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Transactions
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.72 0.18 200 / 0.12)" }}
            >
              <ShoppingCart
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.18 200)" }}
              />
            </div>
          </div>
          {salesLoading ? (
            <div className="h-7 w-20 bg-muted rounded animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              {sales ? sales.length.toString() : "0"}
            </div>
          )}
        </div>
        <div
          className="rounded-xl shadow-card p-5 border-l-4 flex flex-col gap-2 neon-card"
          style={{
            ...cardStyle,
            borderLeftColor: "oklch(0.75 0.18 72)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Units Sold
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.75 0.18 72 / 0.12)" }}
            >
              <Package
                className="w-4 h-4"
                style={{ color: "oklch(0.75 0.18 72)" }}
              />
            </div>
          </div>
          {salesLoading ? (
            <div className="h-7 w-20 bg-muted rounded animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              {totalQuantity.toLocaleString("en-IN")}
            </div>
          )}
        </div>
      </div>

      {/* Transactions table */}
      <div className="rounded-xl overflow-hidden shadow-card" style={cardStyle}>
        <div
          className="px-5 py-4"
          style={{
            borderBottom: "1px solid oklch(0.22 0.015 250)",
            background: "oklch(0.18 0.01 250 / 0.3)",
          }}
        >
          <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Today's Transactions
          </h3>
        </div>
        {salesLoading ? (
          <div className="p-5 space-y-3">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={`skeleton-${k}`} className="h-10 w-full" />
            ))}
          </div>
        ) : !sales || sales.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No sales recorded today.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background: "oklch(0.18 0.01 250 / 0.5)",
                    borderBottom: "1px solid oklch(0.22 0.015 250)",
                  }}
                >
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Product
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Qty
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr
                    key={String(sale.id)}
                    className="transition-colors"
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.015 250 / 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "";
                    }}
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {getProductName(sale.stockItemId)}
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground">
                      {String(sale.quantity)}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-primary">
                      ₹{Number(sale.totalPrice).toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground text-xs">
                      {new Date(
                        Number(sale.timestamp) / 1_000_000,
                      ).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
