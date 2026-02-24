import React from 'react';
import { Wallet, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { useGetIncomeSummary } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function IncomeTracking() {
  const { data: income, isLoading } = useGetIncomeSummary();

  const cards = [
    {
      label: 'All-Time Income',
      value: income ? formatINR(Number(income.totalIncome)) : '₹0',
      icon: Wallet,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      delay: '0ms',
    },
    {
      label: 'Monthly Income',
      value: income ? formatINR(Number(income.monthlyIncome)) : '₹0',
      icon: Calendar,
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/20',
      delay: '100ms',
    },
    {
      label: "Today's Income",
      value: income ? formatINR(Number(income.todaysIncome)) : '₹0',
      icon: TrendingUp,
      color: 'text-chart-1',
      bg: 'bg-chart-1/10',
      border: 'border-chart-1/20',
      delay: '200ms',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <Skeleton className="h-11 w-11 rounded-xl mb-3 shimmer" />
            <Skeleton className="h-4 w-28 mb-2 shimmer" />
            <Skeleton className="h-8 w-36 shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-card border ${card.border} rounded-2xl p-5 card-hover animate-fade-in-up`}
          style={{ animationDelay: card.delay }}
        >
          <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <p className="text-muted-foreground text-sm font-bold mb-1">{card.label}</p>
          <p className={`metric-value text-2xl ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
