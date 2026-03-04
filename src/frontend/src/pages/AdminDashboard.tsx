import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  DollarSign,
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
    color: "gradient-card-green",
    iconBg: "bg-white/20",
  },
  {
    title: "Stock Management",
    description: "Manage inventory and record sales",
    icon: Package,
    path: "/admin/stock",
    color: "gradient-card-teal",
    iconBg: "bg-white/20",
  },
  {
    title: "Products",
    description: "Add, edit and manage product catalog",
    icon: ShoppingCart,
    path: "/admin/products",
    color: "gradient-card-gold",
    iconBg: "bg-white/20",
  },
  {
    title: "Customers",
    description: "View and manage customer records",
    icon: Users,
    path: "/admin/customers",
    color: "gradient-card-emerald",
    iconBg: "bg-white/20",
  },
  {
    title: "Sales Reports",
    description: "Daily, monthly and product-wise reports",
    icon: TrendingUp,
    path: "/admin/reports",
    color: "gradient-card-green",
    iconBg: "bg-white/20",
  },
  {
    title: "Enquiries",
    description: "View and manage customer enquiries",
    icon: MessageSquare,
    path: "/admin/enquiries",
    color: "gradient-card-teal",
    iconBg: "bg-white/20",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your store.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.path}
              to={card.path}
              className={`${card.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white text-lg mb-1">
                {card.title}
              </h3>
              <p className="text-white/75 text-sm">{card.description}</p>
              <div className="mt-4 flex items-center gap-1 text-white/60 text-xs font-medium group-hover:text-white/90 transition-colors">
                <Activity className="w-3.5 h-3.5" />
                <span>Open section</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
