import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  MessageSquare,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

const dashboardCards = [
  {
    title: "Owner Dashboard",
    description: "Revenue, sales metrics & low stock alerts",
    icon: BarChart3,
    path: "/admin/owner-dashboard",
    iconBg: "oklch(0.75 0.22 150 / 0.12)",
    iconColor: "oklch(0.75 0.22 150)",
    accentBorder: "border-t-primary",
  },
  {
    title: "Stock Management",
    description: "Manage inventory and record sales",
    icon: Package,
    path: "/admin/stock",
    iconBg: "oklch(0.72 0.18 200 / 0.12)",
    iconColor: "oklch(0.72 0.18 200)",
    accentBorder: "border-t-accent",
  },
  {
    title: "Products",
    description: "Add, edit and manage product catalog",
    icon: ShoppingCart,
    path: "/admin/products",
    iconBg: "oklch(0.75 0.18 72 / 0.12)",
    iconColor: "oklch(0.75 0.18 72)",
    accentBorder: "border-t-warning",
  },
  {
    title: "Customers",
    description: "View and manage customer records",
    icon: Users,
    path: "/admin/customers",
    iconBg: "oklch(0.72 0.2 150 / 0.12)",
    iconColor: "oklch(0.72 0.2 150)",
    accentBorder: "border-t-success",
  },
  {
    title: "Sales Reports",
    description: "Daily, monthly and product-wise reports",
    icon: TrendingUp,
    path: "/admin/reports",
    iconBg: "oklch(0.65 0.22 250 / 0.12)",
    iconColor: "oklch(0.65 0.22 250)",
    accentBorder: "border-t-neon-blue",
  },
  {
    title: "Enquiries",
    description: "View and manage customer enquiries",
    icon: MessageSquare,
    path: "/admin/enquiries",
    iconBg: "oklch(0.62 0.22 25 / 0.12)",
    iconColor: "oklch(0.62 0.22 25)",
    accentBorder: "border-t-destructive",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Welcome back! Here's an overview of your store.
        </p>
      </div>

      {/* Neon divider below header */}
      <div className="neon-divider mb-8" />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.path}
              to={card.path}
              data-ocid={`admin.${card.title.toLowerCase().replace(/\s+/g, "_")}.card`}
              className={`group bg-card rounded-xl p-6 border border-border border-t-2 ${card.accentBorder} shadow-card neon-card`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                style={{ background: card.iconBg }}
              >
                <Icon className="w-5 h-5" style={{ color: card.iconColor }} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base mb-1.5">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {card.description}
              </p>
              <div className="flex items-center gap-1.5 text-primary/70 text-xs font-semibold group-hover:text-primary transition-colors">
                <span>Open section</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
