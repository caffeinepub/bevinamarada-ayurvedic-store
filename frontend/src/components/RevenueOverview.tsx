import { DollarSign, TrendingUp, Package } from 'lucide-react';
import { useGetSalesReports, useGetAllStockItems } from '../hooks/useQueries';

export default function RevenueOverview() {
  const { data: reports, isLoading } = useGetSalesReports();
  const { data: stockItems = [] } = useGetAllStockItems();

  const totalRevenue = reports ? Number(reports.totalRevenue) : 0;
  const monthlyRevenue = reports
    ? reports.monthlySales.reduce((sum, [, rev]) => sum + Number(rev), 0)
    : 0;

  const getProductName = (id: bigint) => {
    const item = stockItems.find((s) => s.id === id);
    return item?.name ?? `Product #${id}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-neon-surface border border-neon-green/20 rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-neon-green/10 rounded mb-3 w-24" />
              <div className="h-8 bg-neon-green/10 rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-neon-surface border border-neon-green/30 rounded-xl p-5 shadow-neon-sm animate-pulse-glow">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-neon-green" />
            </div>
            <span className="text-neon-dim font-mono text-xs uppercase tracking-wider">Total Revenue</span>
          </div>
          <div className="text-2xl font-bold text-neon-green font-mono neon-text-glow">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-neon-green" />
            </div>
            <span className="text-neon-dim font-mono text-xs uppercase tracking-wider">Monthly Revenue</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ₹{monthlyRevenue.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Product Breakdown */}
      {reports && reports.productBreakdown.length > 0 && (
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-neon-green/20 flex items-center gap-2">
            <Package className="w-4 h-4 text-neon-green" />
            <h3 className="text-neon-green font-mono font-semibold text-sm">Top Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neon-green/10">
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Units Sold</th>
                </tr>
              </thead>
              <tbody>
                {reports.productBreakdown.map(([productId, qty], idx) => (
                  <tr key={idx} className="border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors">
                    <td className="px-4 py-3 text-white font-mono text-sm">{getProductName(productId)}</td>
                    <td className="px-4 py-3 text-neon-green font-mono text-sm">{String(qty)}</td>
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
