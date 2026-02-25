import { DollarSign, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { useGetSalesReports, useGetTodaysSales } from '../hooks/useQueries';

export default function IncomeTracking() {
  const { data: reports, isLoading: reportsLoading } = useGetSalesReports();
  const { data: todaysSales = [], isLoading: todayLoading } = useGetTodaysSales();

  const isLoading = reportsLoading || todayLoading;

  const todaysIncome = todaysSales.reduce((sum, sale) => sum + Number(sale.totalPrice), 0);
  const totalRevenue = reports ? Number(reports.totalRevenue) : 0;
  const monthlyRevenue = reports
    ? reports.monthlySales.reduce((sum, [, rev]) => sum + Number(rev), 0)
    : 0;

  const cards = [
    { label: "Today's Income", value: todaysIncome, icon: DollarSign, pulse: true },
    { label: 'Monthly Income', value: monthlyRevenue, icon: TrendingUp, pulse: false },
    { label: 'Total Income', value: totalRevenue, icon: BarChart3, pulse: false },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-neon-surface border border-neon-green/20 rounded-xl p-5 animate-pulse">
            <div className="h-4 bg-neon-green/10 rounded mb-3 w-24" />
            <div className="h-8 bg-neon-green/10 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-neon-surface border border-neon-green/30 rounded-xl p-5 ${card.pulse ? 'shadow-neon-sm animate-pulse-glow' : ''}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-neon-green" />
                </div>
                <span className="text-neon-dim font-mono text-xs uppercase tracking-wider">{card.label}</span>
              </div>
              <div className="text-2xl font-bold text-neon-green font-mono neon-text-glow">
                ₹{card.value.toLocaleString('en-IN')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Breakdown */}
      {reports && reports.monthlySales.length > 0 && (
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-neon-green/20">
            <h3 className="text-neon-green font-mono font-semibold text-sm">Monthly Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neon-green/10">
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Period</th>
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {reports.monthlySales.map(([month, revenue], idx) => (
                  <tr key={idx} className="border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors">
                    <td className="px-4 py-3 text-white font-mono text-sm">Month {month}</td>
                    <td className="px-4 py-3 text-neon-green font-mono text-sm">₹{Number(revenue).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
