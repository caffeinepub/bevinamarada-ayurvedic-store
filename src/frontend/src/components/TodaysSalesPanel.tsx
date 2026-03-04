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

  const summaryCards = [
    {
      label: "Today's Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "gradient-card-green",
    },
    {
      label: "Transactions",
      value: sales ? sales.length.toString() : "0",
      icon: ShoppingCart,
      color: "gradient-card-teal",
    },
    {
      label: "Units Sold",
      value: totalQuantity.toLocaleString("en-IN"),
      icon: Package,
      color: "gradient-card-gold",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`${card.color} rounded-xl p-5 text-white shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              {salesLoading ? (
                <div className="h-7 w-20 bg-white/20 rounded animate-pulse" />
              ) : (
                <div className="font-heading font-bold text-xl text-white">
                  {card.value}
                </div>
              )}
              <div className="text-white/70 text-xs mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-xl border border-border/50 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50">
          <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-forest" />
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
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Product
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Qty
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {sales.map((sale) => (
                  <tr
                    key={String(sale.id)}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {getProductName(sale.stockItemId)}
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground">
                      {String(sale.quantity)}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-forest">
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
