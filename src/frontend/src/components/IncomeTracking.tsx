import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import React from "react";
import { useGetSalesReports, useGetTodaysSales } from "../hooks/useQueries";

export default function IncomeTracking() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: todaysSales, isLoading: todayLoading } = useGetTodaysSales();

  const isLoading = reportsLoading || todayLoading;

  const todayIncome = todaysSales
    ? todaysSales.reduce((sum, s) => sum + Number(s.totalPrice), 0)
    : 0;

  const monthlyIncome = reports?.monthlySales
    ? reports.monthlySales.reduce((sum, [, amount]) => sum + Number(amount), 0)
    : 0;

  const totalIncome = reports ? Number(reports.totalRevenue) : 0;

  const cardStyle = {
    background: "oklch(0.14 0.008 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };

  return (
    <div className="space-y-6">
      {/* Income cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-xl shadow-card p-5 border-l-4 border-l-primary flex flex-col gap-1 neon-card"
          style={cardStyle}
        >
          <div className="flex items-start justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Today's Income
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.75 0.22 150 / 0.12)" }}
            >
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              ₹{todayIncome.toLocaleString("en-IN")}
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Current day earnings
          </div>
        </div>
        <div
          className="rounded-xl shadow-card p-5 border-l-4 border-l-accent flex flex-col gap-1 neon-card"
          style={cardStyle}
        >
          <div className="flex items-start justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Monthly Income
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.72 0.18 200 / 0.12)" }}
            >
              <Calendar
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.18 200)" }}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              ₹{monthlyIncome.toLocaleString("en-IN")}
            </div>
          )}
          <div className="text-xs text-muted-foreground">This month total</div>
        </div>
        <div
          className="rounded-xl shadow-card p-5 border-l-4 flex flex-col gap-1 neon-card"
          style={{
            ...cardStyle,
            borderLeftColor: "oklch(0.75 0.18 72)",
          }}
        >
          <div className="flex items-start justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Income
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.75 0.18 72 / 0.12)" }}
            >
              <TrendingUp
                className="w-4 h-4"
                style={{ color: "oklch(0.75 0.18 72)" }}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
          ) : (
            <div className="font-display font-bold text-2xl text-foreground">
              ₹{totalIncome.toLocaleString("en-IN")}
            </div>
          )}
          <div className="text-xs text-muted-foreground">All time earnings</div>
        </div>
      </div>

      {/* Monthly breakdown */}
      {reports?.monthlySales && reports.monthlySales.length > 0 && (
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
              <Calendar className="w-4 h-4 text-primary" />
              Monthly Breakdown
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
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Period
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.monthlySales.map(([period, amount]) => (
                  <tr
                    key={period}
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
                      Month {period}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-primary">
                      ₹{Number(amount).toLocaleString("en-IN")}
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
