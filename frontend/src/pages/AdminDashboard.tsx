import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  Package, Users, BarChart3, ShoppingCart, TrendingUp,
  DollarSign, ArrowRight, Activity
} from 'lucide-react';

const navCards = [
  {
    title: 'Stock Management',
    description: 'Manage inventory, add new items, and track stock levels',
    icon: Package,
    path: '/admin/stock',
    color: 'bg-[oklch(0.92_0.05_230)]',
    iconColor: 'text-[oklch(0.4_0.15_230)]',
    borderColor: 'border-[oklch(0.85_0.08_230)]',
  },
  {
    title: 'Products',
    description: 'View and manage all products in the catalog',
    icon: ShoppingCart,
    path: '/admin/products',
    color: 'bg-[oklch(0.92_0.05_195)]',
    iconColor: 'text-[oklch(0.4_0.15_195)]',
    borderColor: 'border-[oklch(0.85_0.08_195)]',
  },
  {
    title: 'Customers',
    description: 'Manage customer records and enquiry history',
    icon: Users,
    path: '/admin/customers',
    color: 'bg-[oklch(0.92_0.05_155)]',
    iconColor: 'text-[oklch(0.4_0.15_155)]',
    borderColor: 'border-[oklch(0.85_0.08_155)]',
  },
  {
    title: 'Sales Reports',
    description: 'View detailed sales analytics and download reports',
    icon: BarChart3,
    path: '/admin/reports',
    color: 'bg-[oklch(0.92_0.05_75)]',
    iconColor: 'text-[oklch(0.5_0.15_75)]',
    borderColor: 'border-[oklch(0.85_0.08_75)]',
  },
  {
    title: "Today's Sales",
    description: 'Track daily sales transactions and revenue',
    icon: DollarSign,
    path: '/admin/sales',
    color: 'bg-[oklch(0.92_0.05_155)]',
    iconColor: 'text-[oklch(0.4_0.15_155)]',
    borderColor: 'border-[oklch(0.85_0.08_155)]',
  },
  {
    title: 'Revenue Overview',
    description: 'Analyze revenue trends and financial performance',
    icon: Activity,
    path: '/admin/revenue',
    color: 'bg-[oklch(0.92_0.05_195)]',
    iconColor: 'text-[oklch(0.4_0.15_195)]',
    borderColor: 'border-[oklch(0.85_0.08_195)]',
  },
  {
    title: 'Income Tracking',
    description: 'Monitor income streams and financial summaries',
    icon: TrendingUp,
    path: '/admin/income',
    color: 'bg-[oklch(0.92_0.05_230)]',
    iconColor: 'text-[oklch(0.4_0.15_230)]',
    borderColor: 'border-[oklch(0.85_0.08_230)]',
  },
  {
    title: 'Trending Products',
    description: 'View and manage trending product listings',
    icon: TrendingUp,
    path: '/admin/trending',
    color: 'bg-[oklch(0.92_0.05_75)]',
    iconColor: 'text-[oklch(0.5_0.15_75)]',
    borderColor: 'border-[oklch(0.85_0.08_75)]',
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[oklch(0.15_0.02_220)] font-heading">Admin Dashboard</h1>
        <p className="text-[oklch(0.5_0.03_200)] mt-1">Manage all aspects of your pharmaceutical business</p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {navCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.path}
              to={card.path}
              className={`group block p-5 bg-white rounded-xl border ${card.borderColor} shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <h3 className="font-semibold text-[oklch(0.15_0.02_220)] mb-1.5 font-heading text-sm">{card.title}</h3>
              <p className="text-[oklch(0.5_0.03_200)] text-xs leading-relaxed mb-3">{card.description}</p>
              <div className="flex items-center gap-1 text-[oklch(0.45_0.15_195)] text-xs font-medium group-hover:gap-2 transition-all">
                <span>Open</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
