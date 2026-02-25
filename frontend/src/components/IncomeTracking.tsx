import { useGetSalesReports, useGetTodaysSales } from '../hooks/useQueries';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function IncomeTracking() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: todaysSales, isLoading: todayLoading } = useGetTodaysSales();

  const isLoading = reportsLoading || todayLoading;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  const todayRevenue = todaysSales?.reduce((sum, sale) => sum + Number(sale.totalPrice), 0) ?? 0;
  const totalRevenue = Number(reports?.totalRevenue ?? 0);
  const monthlyRevenue = reports?.monthlySales
    .filter(([month]) => month === '00')
    .reduce((sum, [, amount]) => sum + Number(amount), 0) ?? 0;

  const cards = [
    {
      label: "Today's Income",
      value: todayRevenue,
      icon: TrendingUp,
      gradient: 'from-forest-500 to-sage-600',
    },
    {
      label: 'Monthly Income',
      value: monthlyRevenue,
      icon: Calendar,
      gradient: 'from-saffron-500 to-gold-500',
    },
    {
      label: 'Total Income',
      value: totalRevenue,
      icon: DollarSign,
      gradient: 'from-teal-500 to-forest-600',
    },
  ];

  return (
    <div className="space-y-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.gradient} rounded-xl p-4 text-white`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4 opacity-80" />
              <span className="text-xs opacity-80">{card.label}</span>
            </div>
            <p className="text-2xl font-bold">₹{card.value.toLocaleString('en-IN')}</p>
          </div>
        );
      })}
    </div>
  );
}
