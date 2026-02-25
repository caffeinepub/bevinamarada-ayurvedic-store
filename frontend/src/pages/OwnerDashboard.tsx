import React from 'react';
import { Link } from '@tanstack/react-router';
import { Package, TrendingUp, DollarSign, Users, AlertTriangle, BarChart3, ArrowRight, Activity } from 'lucide-react';
import { useGetLowStockItems, useGetTodaysSales, useGetSalesReports, useGetAllStockItems } from '../hooks/useQueries';
import LowStockWarning from '../components/LowStockWarning';

export default function OwnerDashboard() {
  const { data: lowStockItems = [] } = useGetLowStockItems();
  const { data: todaysSales = [] } = useGetTodaysSales();
  const { data: salesReports } = useGetSalesReports();
  const { data: allStockItems = [] } = useGetAllStockItems();

  const todaysRevenue = todaysSales.reduce((sum, sale) => sum + Number(sale.totalPrice), 0);
  const totalRevenue = salesReports ? Number(salesReports.totalRevenue) : 0;
  const totalSales = salesReports ? Number(salesReports.totalSales) : 0;

  const metricCards = [
    {
      title: "Today's Revenue",
      value: `₹${todaysRevenue.toLocaleString('en-IN')}`,
      icon: DollarSign,
      link: '/admin/sales' as const,
      gradient: 'stat-card-teal',
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: BarChart3,
      link: '/admin/revenue' as const,
      gradient: 'stat-card-blue',
    },
    {
      title: 'Total Sales',
      value: totalSales.toLocaleString('en-IN'),
      icon: TrendingUp,
      link: '/admin/reports' as const,
      gradient: 'stat-card-green',
    },
    {
      title: 'Total Products',
      value: allStockItems.length.toLocaleString('en-IN'),
      icon: Package,
      link: '/admin/stock' as const,
      gradient: 'stat-card-purple',
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems.length.toLocaleString('en-IN'),
      icon: AlertTriangle,
      link: '/admin/stock' as const,
      gradient: lowStockItems.length > 0
        ? 'bg-gradient-to-br from-[oklch(0.65_0.15_50)] to-[oklch(0.55_0.18_40)]'
        : 'stat-card-teal',
    },
    {
      title: "Today's Transactions",
      value: todaysSales.length.toLocaleString('en-IN'),
      icon: Activity,
      link: '/admin/sales' as const,
      gradient: 'stat-card-green',
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[oklch(0.15_0.02_220)] font-heading">Overview Dashboard</h1>
        <p className="text-[oklch(0.5_0.03_200)] mt-1">Real-time business metrics and performance indicators</p>
      </div>

      {/* Low Stock Warning — fetches its own data internally */}
      {lowStockItems.length > 0 && (
        <div className="mb-6">
          <LowStockWarning />
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className={`group block p-5 rounded-xl text-white shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 ${card.gradient}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-white/70 text-xs font-medium mb-1">{card.title}</p>
              <p className="text-2xl font-bold font-heading">{card.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_200)] shadow-card p-5">
        <h2 className="font-semibold text-[oklch(0.15_0.02_220)] font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Stock', path: '/admin/stock' as const, icon: Package },
            { label: 'View Sales', path: '/admin/sales' as const, icon: DollarSign },
            { label: 'Customers', path: '/admin/customers' as const, icon: Users },
            { label: 'Reports', path: '/admin/reports' as const, icon: BarChart3 },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[oklch(0.97_0.01_200)] hover:bg-[oklch(0.92_0.05_195)] border border-[oklch(0.92_0.01_200)] hover:border-[oklch(0.85_0.08_195)] transition-all text-center"
              >
                <Icon className="w-5 h-5 text-[oklch(0.45_0.15_195)]" />
                <span className="text-xs font-medium text-[oklch(0.3_0.03_220)]">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
