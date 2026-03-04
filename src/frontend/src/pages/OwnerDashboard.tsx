import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import React from "react";
import LowStockWarning from "../components/LowStockWarning";
import {
  useGetAllStockItems,
  useGetLowStockItems,
  useGetSalesReports,
  useGetTodaysSales,
} from "../hooks/useQueries";

export default function OwnerDashboard() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: stockItems, isLoading: stockLoading } = useGetAllStockItems();
  const { data: lowStockItems } = useGetLowStockItems();
  const { data: todaysSales } = useGetTodaysSales();

  const totalRevenue = reports ? Number(reports.totalRevenue) : 0;
  const totalSales = reports ? Number(reports.totalSales) : 0;
  const totalProducts = stockItems ? stockItems.length : 0;
  const lowStockCount = lowStockItems ? lowStockItems.length : 0;
  const todayRevenue = todaysSales
    ? todaysSales.reduce((sum, s) => sum + Number(s.totalPrice), 0)
    : 0;

  const metricCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      borderColor: "border-l-primary",
      iconStyle: {
        background: "oklch(0.75 0.22 150 / 0.12)",
        color: "oklch(0.75 0.22 150)",
      },
      loading: reportsLoading,
    },
    {
      title: "Today's Revenue",
      value: `₹${todayRevenue.toLocaleString("en-IN")}`,
      icon: Activity,
      borderColor: "border-l-accent",
      iconStyle: {
        background: "oklch(0.72 0.18 200 / 0.12)",
        color: "oklch(0.72 0.18 200)",
      },
      loading: reportsLoading,
    },
    {
      title: "Total Sales",
      value: totalSales.toLocaleString("en-IN"),
      icon: ShoppingCart,
      borderColor: "border-l-neon-blue",
      iconStyle: {
        background: "oklch(0.65 0.22 250 / 0.12)",
        color: "oklch(0.65 0.22 250)",
      },
      loading: reportsLoading,
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString("en-IN"),
      icon: Package,
      borderColor: "border-l-success",
      iconStyle: {
        background: "oklch(0.72 0.2 150 / 0.12)",
        color: "oklch(0.72 0.2 150)",
      },
      loading: stockLoading,
    },
  ];

  const quickActions = [
    { label: "View Sales Report", path: "/admin/reports", icon: BarChart3 },
    { label: "Manage Stock", path: "/admin/stock", icon: Package },
    { label: "View Trending", path: "/admin/trending", icon: TrendingUp },
  ];

  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Owner Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Store performance overview and key metrics.
        </p>
      </div>

      {/* Low stock warning */}
      {lowStockCount > 0 && (
        <div className="mb-6">
          <LowStockWarning />
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`bg-card rounded-xl shadow-card p-5 border-l-4 ${card.borderColor} flex flex-col gap-2 neon-card`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {card.title}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={card.iconStyle}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: card.iconStyle.color }}
                  />
                </div>
              </div>
              {card.loading ? (
                <div className="h-8 w-28 bg-muted rounded-lg animate-pulse" />
              ) : (
                <div className="text-3xl font-bold font-display text-foreground">
                  {card.value}
                </div>
              )}
              <div className="text-xs text-muted-foreground font-medium mt-0.5">
                {card.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Neon divider */}
      <div className="neon-divider mb-6" />

      {/* Quick actions */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          background: "oklch(0.14 0.008 250)",
          border: "1px solid oklch(0.22 0.015 250)",
        }}
      >
        <h2 className="font-heading font-semibold text-foreground mb-4 text-base">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="flex items-center gap-3 p-4 rounded-xl transition-all group neon-card"
                style={{
                  border: "1px solid oklch(0.22 0.015 250)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors shrink-0"
                  style={{ background: "oklch(0.75 0.22 150 / 0.1)" }}
                >
                  <Icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                  {action.label}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Neon divider */}
      {lowStockCount > 0 && <div className="neon-divider mb-6" />}

      {/* Low stock detail */}
      {lowStockCount > 0 && (
        <div
          className="rounded-xl p-5"
          style={{
            background: "oklch(0.75 0.18 72 / 0.08)",
            borderLeft: "4px solid oklch(0.75 0.18 72)",
            border: "1px solid oklch(0.75 0.18 72 / 0.3)",
            borderLeftWidth: "4px",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
            <h3 className="font-heading font-semibold text-foreground">
              {lowStockCount} item{lowStockCount > 1 ? "s" : ""} running low on
              stock
            </h3>
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            Please restock these items to avoid stockouts.
          </p>
          <Link
            to="/admin/stock"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Manage Stock <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
