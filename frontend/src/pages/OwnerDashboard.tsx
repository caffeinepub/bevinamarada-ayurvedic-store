import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  BarChart2,
  DollarSign,
  ArrowRight,
  Leaf,
} from 'lucide-react';
import {
  useGetAllStockItems,
  useGetLowStockItems,
  useGetTrendingStockItems,
  useGetTodaysSales,
  useGetIncomeSummary,
} from '../hooks/useQueries';
import TrendingStocksPanel from '../components/TrendingStocksPanel';
import TodaysSalesPanel from '../components/TodaysSalesPanel';
import IncomeTracking from '../components/IncomeTracking';
import RevenueOverview from '../components/RevenueOverview';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OwnerDashboard() {
  const { data: allStock } = useGetAllStockItems();
  const { data: lowStock } = useGetLowStockItems();
  const { data: trending } = useGetTrendingStockItems();
  const { data: todaysSales } = useGetTodaysSales();
  const { data: income } = useGetIncomeSummary();

  const totalStock = allStock?.length ?? 0;
  const lowStockCount = lowStock?.length ?? 0;
  const trendingCount = trending?.length ?? 0;
  const todaySalesCount = todaysSales?.length ?? 0;
  const todayRevenue =
    todaysSales?.reduce((sum, s) => sum + Number(s.totalPrice), 0) ?? 0;
  const monthlyIncome = income ? Number(income.monthlyIncome) : 0;

  const metrics = [
    {
      label: 'Total Stock Items',
      value: totalStock.toString(),
      icon: Package,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      link: '/admin/stocks' as const,
    },
    {
      label: 'Low Stock Alerts',
      value: lowStockCount.toString(),
      icon: AlertTriangle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      link: '/admin/stocks' as const,
    },
    {
      label: 'Trending Products',
      value: trendingCount.toString(),
      icon: TrendingUp,
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/20',
      link: '/admin/trending' as const,
    },
    {
      label: "Today's Sales",
      value: todaySalesCount.toString(),
      icon: ShoppingCart,
      color: 'text-chart-1',
      bg: 'bg-chart-1/10',
      border: 'border-chart-1/20',
      link: '/admin/sales' as const,
    },
    {
      label: "Today's Revenue",
      value: formatINR(todayRevenue),
      icon: BarChart2,
      color: 'text-chart-2',
      bg: 'bg-chart-2/10',
      border: 'border-chart-2/20',
      link: '/admin/revenue' as const,
    },
    {
      label: 'Monthly Income',
      value: formatINR(monthlyIncome),
      icon: DollarSign,
      color: 'text-chart-3',
      bg: 'bg-chart-3/10',
      border: 'border-chart-3/20',
      link: '/admin/income' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-sidebar border-b border-border">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url(/assets/generated/dashboard-hero.dim_1200x400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative px-6 py-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-sidebar-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold text-sidebar-foreground">
                Owner Dashboard
              </h1>
              <p className="text-sidebar-foreground/60 text-sm font-semibold">
                Bevinamarada Ayurvedic Store — Real-time Overview
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Metric Cards */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, i) => (
              <Link
                key={metric.label}
                to={metric.link}
                className={`
                  block bg-card border ${metric.border} rounded-2xl p-5
                  card-hover cursor-pointer
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${metric.bg} flex items-center justify-center`}
                  >
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 mt-1" />
                </div>
                <p className="text-muted-foreground text-sm font-semibold mb-1">
                  {metric.label}
                </p>
                <p className={`metric-value text-2xl ${metric.color}`}>
                  {metric.value}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Low Stock Alerts */}
        {lowStockCount > 0 && (
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
          >
            <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h2 className="font-display text-lg font-bold text-destructive">
                  Low Stock Alerts
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {lowStock?.map((item) => (
                  <span
                    key={item.id.toString()}
                    className="badge-red px-3 py-1 rounded-full text-sm"
                  >
                    {item.name} — {item.quantity.toString()} left
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trending Stocks */}
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Trending Products
            </h2>
            <Link
              to="/admin/trending"
              className="text-primary font-bold text-sm hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <TrendingStocksPanel />
        </section>

        {/* Today's Sales */}
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: '700ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Today's Sales
            </h2>
            <Link
              to="/admin/sales"
              className="text-primary font-bold text-sm hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <TodaysSalesPanel />
        </section>

        {/* Income */}
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: '800ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Income Overview
            </h2>
            <Link
              to="/admin/income"
              className="text-primary font-bold text-sm hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <IncomeTracking />
        </section>

        {/* Revenue */}
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: '900ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Revenue Overview
            </h2>
            <Link
              to="/admin/revenue"
              className="text-primary font-bold text-sm hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <RevenueOverview />
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border">
          <p className="text-muted-foreground text-sm font-medium">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline"
            >
              caffeine.ai
            </a>{' '}
            · © {new Date().getFullYear()} Bevinamarada Ayurvedic Store
          </p>
        </footer>
      </div>
    </div>
  );
}
