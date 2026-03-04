import { Skeleton } from "@/components/ui/skeleton";
import { IndianRupee, Package, TrendingUp } from "lucide-react";
import React from "react";
import { useGetAllStockItems, useGetSalesReports } from "../hooks/useQueries";

export default function RevenueOverview() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: stockItems } = useGetAllStockItems();

  const totalRevenue = reports ? Number(reports.totalRevenue) : 0;
  const totalSales = reports ? Number(reports.totalSales) : 0;

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
      {/* Revenue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="rounded-xl shadow-card p-5 border-l-4 border-l-primary flex flex-col gap-2 neon-card"
          style={cardStyle}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.75 0.22 150 / 0.12)" }}
            >
              <IndianRupee className="w-4 h-4 text-primary" />
            </div>
          </div>
          {reportsLoading ? (
            <div className="h-7 w-24 bg-muted rounded-lg animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
          )}
          <div className="text-xs text-muted-foreground font-medium">
            Total Revenue
          </div>
        </div>

        <div
          className="rounded-xl shadow-card p-5 border-l-4 border-l-accent flex flex-col gap-2 neon-card"
          style={cardStyle}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Sales
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.72 0.18 200 / 0.12)" }}
            >
              <TrendingUp
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.18 200)" }}
              />
            </div>
          </div>
          {reportsLoading ? (
            <div className="h-7 w-24 bg-muted rounded-lg animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              {totalSales.toLocaleString("en-IN")}
            </div>
          )}
          <div className="text-xs text-muted-foreground font-medium">
            Total Sales
          </div>
        </div>
      </div>

      {/* Product breakdown */}
      {reports?.productBreakdown && reports.productBreakdown.length > 0 && (
        <div
          className="rounded-xl overflow-hidden shadow-card"
          style={cardStyle}
        >
          <div
            className="px-5 py-4"
            style={{
              borderBottom: "1px solid oklch(0.22 0.015 250)",
              background: "oklch(0.18 0.01 250 / 0.3)",
            }}
          >
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Product Revenue Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background: "oklch(0.18 0.01 250 / 0.5)",
                    borderBottom: "1px solid oklch(0.22 0.015 250)",
                  }}
                >
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    Units Sold
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.productBreakdown.map(([productId, quantity]) => (
                  <tr
                    key={String(productId)}
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
                    <td className="px-5 py-3.5 font-semibold text-foreground">
                      {getProductName(productId)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-primary">
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
