import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Package, TrendingUp } from "lucide-react";
import React from "react";
import { useGetAllStockItems, useGetSalesReports } from "../hooks/useQueries";

export default function RevenueOverview() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: stockItems } = useGetAllStockItems();

  const totalRevenue = reports ? Number(reports.totalRevenue) : 0;
  const totalSales = reports ? Number(reports.totalSales) : 0;

  const revenueCards = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "gradient-card-green",
    },
    {
      label: "Total Sales",
      value: totalSales.toLocaleString("en-IN"),
      icon: TrendingUp,
      color: "gradient-card-teal",
    },
  ];

  const getProductName = (id: bigint) => {
    const item = stockItems?.find((s) => s.id === id);
    return item?.name ?? `Product #${String(id)}`;
  };

  return (
    <div className="space-y-6">
      {/* Revenue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {revenueCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`${card.color} rounded-xl p-5 text-white shadow-lg`}
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-white" />
              </div>
              {reportsLoading ? (
                <div className="h-7 w-24 bg-white/20 rounded animate-pulse" />
              ) : (
                <div className="font-heading font-bold text-xl text-white">
                  {card.value}
                </div>
              )}
              <div className="text-white/70 text-sm mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Product breakdown */}
      {reports?.productBreakdown && reports.productBreakdown.length > 0 && (
        <div className="bg-white rounded-xl border border-border/50 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-forest" />
              Product Revenue Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Product
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Units Sold
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {reports.productBreakdown.map(([productId, quantity]) => (
                  <tr
                    key={String(productId)}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {getProductName(productId)}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-forest">
                      {String(quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
