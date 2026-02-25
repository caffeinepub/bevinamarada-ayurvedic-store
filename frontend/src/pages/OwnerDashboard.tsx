import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  Package,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  PieChart,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  Users,
} from 'lucide-react';
import {
  useGetAllStockItems,
  useGetLowStockItems,
  useGetTodaysSales,
  useGetSalesReports,
} from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const formatINR = (amount: bigint | number) => {
  const num = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

type ValidAdminPath =
  | '/admin'
  | '/admin/stock'
  | '/admin/customers'
  | '/admin/sales'
  | '/admin/revenue'
  | '/admin/income'
  | '/admin/trending'
  | '/admin/sales-reports'
  | '/admin/profile';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  gradientClass: string;
  shadowClass: string;
  linkTo: ValidAdminPath;
  isLoading?: boolean;
  delay?: number;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  gradientClass,
  shadowClass,
  linkTo,
  isLoading,
  delay = 0,
}: MetricCardProps) {
  return (
    <Link
      to={linkTo}
      className="admin-card p-5 flex flex-col gap-4 cursor-pointer group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center ${shadowClass}`}
        >
          {icon}
        </div>
        <ArrowRight
          size={16}
          className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
        />
      </div>
      <div>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-28 mt-1" />
        ) : (
          <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
        )}
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </Link>
  );
}

export default function OwnerDashboard() {
  const { data: stockItems = [], isLoading: stockLoading } = useGetAllStockItems();
  const { data: lowStockItems = [], isLoading: lowStockLoading } = useGetLowStockItems();
  const { data: todaysSales = [], isLoading: salesLoading } = useGetTodaysSales();
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();

  const todaysRevenue = todaysSales.reduce((sum, s) => sum + Number(s.totalPrice), 0);
  const trendingCount = stockItems.filter((s) => s.isTrending).length;

  return (
    <div className="space-y-8 animate-fade-in-up p-6">
      {/* Welcome Banner */}
      <div className="gradient-hero rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
            <p className="text-white/70 mt-1 text-sm">
              Here's what's happening at your store today.
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="text-white/60 text-sm">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Products"
            value={stockItems.length}
            subtitle={`${lowStockItems.length} low stock`}
            icon={<Package size={22} className="text-white" />}
            gradientClass="gradient-saffron"
            shadowClass="shadow-saffron"
            linkTo="/admin/stock"
            isLoading={stockLoading}
            delay={0}
          />
          <MetricCard
            title="Today's Revenue"
            value={formatINR(todaysRevenue)}
            subtitle={`${todaysSales.length} transactions`}
            icon={<ShoppingCart size={22} className="text-white" />}
            gradientClass="gradient-teal"
            shadowClass="shadow-teal"
            linkTo="/admin/sales"
            isLoading={salesLoading}
            delay={50}
          />
          <MetricCard
            title="Total Revenue"
            value={formatINR(reports?.totalRevenue ?? 0n)}
            subtitle={`${Number(reports?.totalSales ?? 0n)} total sales`}
            icon={<DollarSign size={22} className="text-white" />}
            gradientClass="gradient-coral"
            shadowClass="shadow-coral"
            linkTo="/admin/income"
            isLoading={reportsLoading}
            delay={100}
          />
          <MetricCard
            title="Trending Products"
            value={trendingCount}
            subtitle="Currently trending"
            icon={<TrendingUp size={22} className="text-white" />}
            gradientClass="gradient-gold"
            shadowClass="shadow-gold"
            linkTo="/admin/trending"
            isLoading={stockLoading}
            delay={150}
          />
          <MetricCard
            title="Revenue Overview"
            value={formatINR(reports?.totalRevenue ?? 0n)}
            subtitle="All-time revenue"
            icon={<PieChart size={22} className="text-white" />}
            gradientClass="gradient-violet"
            shadowClass=""
            linkTo="/admin/revenue"
            isLoading={reportsLoading}
            delay={200}
          />
          <MetricCard
            title="Sales Reports"
            value={`${Number(reports?.totalSales ?? 0n)} Sales`}
            subtitle="View detailed reports"
            icon={<BarChart3 size={22} className="text-white" />}
            gradientClass="gradient-coral"
            shadowClass="shadow-coral"
            linkTo="/admin/sales-reports"
            isLoading={reportsLoading}
            delay={250}
          />
        </div>
      </div>

      {/* Low Stock Alerts */}
      {!lowStockLoading && lowStockItems.length > 0 && (
        <div className="admin-card overflow-hidden">
          <div className="gradient-coral px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <AlertTriangle size={18} />
              <h2 className="font-bold text-lg">Low Stock Alerts</h2>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {lowStockItems.length} items
            </span>
          </div>
          <div className="p-4 space-y-2">
            {lowStockItems.slice(0, 5).map((item) => (
              <div
                key={String(item.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-coral-light border border-coral/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-coral flex items-center justify-center">
                    <Package size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-coral font-bold text-sm">{Number(item.quantity)} left</p>
                  <p className="text-xs text-muted-foreground">Min: {Number(item.lowStockThreshold)}</p>
                </div>
              </div>
            ))}
            {lowStockItems.length > 5 && (
              <Link
                to="/admin/stock"
                className="flex items-center justify-center gap-2 py-2 text-sm text-coral font-medium hover:underline"
              >
                View all {lowStockItems.length} low stock items <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="admin-card overflow-hidden">
        <div className="gradient-teal px-6 py-4">
          <h2 className="font-bold text-lg text-white">Quick Actions</h2>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(
            [
              {
                label: 'Add Stock',
                icon: <Package size={18} />,
                to: '/admin/stock' as ValidAdminPath,
                color: 'gradient-saffron shadow-saffron',
              },
              {
                label: 'Customers',
                icon: <Users size={18} />,
                to: '/admin/customers' as ValidAdminPath,
                color: 'gradient-teal shadow-teal',
              },
              {
                label: 'Sales',
                icon: <ShoppingCart size={18} />,
                to: '/admin/sales' as ValidAdminPath,
                color: 'gradient-coral shadow-coral',
              },
              {
                label: 'Reports',
                icon: <BarChart3 size={18} />,
                to: '/admin/sales-reports' as ValidAdminPath,
                color: 'gradient-gold shadow-gold',
              },
            ] as { label: string; icon: React.ReactNode; to: ValidAdminPath; color: string }[]
          ).map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}
            >
              {action.icon}
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
