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
      color: "gradient-card-green",
      loading: reportsLoading,
    },
    {
      title: "Today's Revenue",
      value: `₹${todayRevenue.toLocaleString("en-IN")}`,
      icon: Activity,
      color: "gradient-card-teal",
      loading: reportsLoading,
    },
    {
      title: "Total Sales",
      value: totalSales.toLocaleString("en-IN"),
      icon: ShoppingCart,
      color: "gradient-card-gold",
      loading: reportsLoading,
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString("en-IN"),
      icon: Package,
      color: "gradient-card-emerald",
      loading: stockLoading,
    },
  ];

  const quickActions = [
    { label: "View Sales Report", path: "/admin/reports", icon: BarChart3 },
    { label: "Manage Stock", path: "/admin/stock", icon: Package },
    { label: "View Trending", path: "/admin/trending", icon: TrendingUp },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Owner Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`${card.color} rounded-xl p-5 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              {card.loading ? (
                <div className="h-8 w-24 bg-white/20 rounded animate-pulse" />
              ) : (
                <div className="font-heading font-bold text-2xl text-white">
                  {card.value}
                </div>
              )}
              <div className="text-white/70 text-sm mt-1">{card.title}</div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-border/50 shadow-card p-6 mb-6">
        <h2 className="font-heading font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-forest/30 hover:bg-sage-light/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-sage-light flex items-center justify-center group-hover:bg-forest transition-colors">
                  <Icon className="w-4 h-4 text-forest group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-forest transition-colors">
                  {action.label}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-forest transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Low stock detail */}
      {lowStockCount > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-warning" />
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
            className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-dark transition-colors"
          >
            Manage Stock <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
