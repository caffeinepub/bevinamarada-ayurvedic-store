import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSalesReports, useGetTodaysSales } from '../hooks/useQueries';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export default function IncomeTracking() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: todaysSales = [], isLoading: salesLoading } = useGetTodaysSales();

  const isLoading = reportsLoading || salesLoading;

  const todaysIncome = todaysSales.reduce((sum, s) => sum + Number(s.totalPrice), 0);
  const totalIncome = Number(reports?.totalRevenue ?? 0n);

  // Approximate monthly: sales from reports that are within current month (month key "0")
  const monthlyEntry = reports?.monthlySales?.find(([key]) => key === '0' || key === '00');
  const monthlyIncome = monthlyEntry ? Number(monthlyEntry[1]) : 0;

  const metrics = [
    {
      label: "Today's Income",
      value: todaysIncome,
      icon: Calendar,
      gradientClass: 'gradient-teal',
      shadowClass: 'shadow-teal',
    },
    {
      label: 'Monthly Income',
      value: monthlyIncome,
      icon: TrendingUp,
      gradientClass: 'gradient-saffron',
      shadowClass: 'shadow-saffron',
    },
    {
      label: 'Total Income',
      value: totalIncome,
      icon: DollarSign,
      gradientClass: 'gradient-coral',
      shadowClass: 'shadow-coral',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {metrics.map(({ label, value, icon: Icon, gradientClass, shadowClass }) => (
        <div key={label} className="admin-card p-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center flex-shrink-0 ${shadowClass}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-0.5">{formatINR(value)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
