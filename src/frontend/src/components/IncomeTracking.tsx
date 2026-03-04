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

  const incomeCards = [
    {
      label: "Today's Income",
      value: `₹${todayIncome.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "gradient-card-green",
      sub: "Current day earnings",
    },
    {
      label: "Monthly Income",
      value: `₹${monthlyIncome.toLocaleString("en-IN")}`,
      icon: Calendar,
      color: "gradient-card-teal",
      sub: "This month total",
    },
    {
      label: "Total Income",
      value: `₹${totalIncome.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "gradient-card-gold",
      sub: "All time earnings",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Income cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {incomeCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`${card.color} rounded-xl p-5 text-white shadow-lg`}
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-white" />
              </div>
              {isLoading ? (
                <div className="h-7 w-24 bg-white/20 rounded animate-pulse" />
              ) : (
                <div className="font-heading font-bold text-xl text-white">
                  {card.value}
                </div>
              )}
              <div className="text-white/80 text-sm font-medium mt-1">
                {card.label}
              </div>
              <div className="text-white/60 text-xs mt-0.5">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Monthly breakdown */}
      {reports?.monthlySales && reports.monthlySales.length > 0 && (
        <div className="bg-white rounded-xl border border-border/50 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border/50">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest" />
              Monthly Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Period
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {reports.monthlySales.map(([period, amount]) => (
                  <tr
                    key={period}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      Month {period}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-forest">
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
