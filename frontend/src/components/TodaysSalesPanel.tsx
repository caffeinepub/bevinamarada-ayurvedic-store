import { ShoppingCart, DollarSign, Package } from 'lucide-react';
import { useGetTodaysSales, useGetAllStockItems } from '../hooks/useQueries';

export default function TodaysSalesPanel() {
  const { data: sales = [], isLoading } = useGetTodaysSales();
  const { data: stockItems = [] } = useGetAllStockItems();

  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.totalPrice), 0);
  const totalUnits = sales.reduce((sum, sale) => sum + Number(sale.quantity), 0);

  const getProductName = (id: bigint) => {
    const item = stockItems.find((s) => s.id === id);
    return item?.name ?? `Product #${id}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neon-surface border border-neon-green/30 rounded-xl p-5 shadow-neon-sm animate-pulse-glow">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-neon-green" />
            </div>
            <span className="text-neon-dim font-mono text-xs uppercase tracking-wider">Today's Revenue</span>
          </div>
          <div className="text-2xl font-bold text-neon-green font-mono neon-text-glow">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-neon-green" />
            </div>
            <span className="text-neon-dim font-mono text-xs uppercase tracking-wider">Transactions</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{sales.length}</div>
        </div>
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
              <Package className="w-4 h-4 text-neon-green" />
            </div>
            <span className="text-neon-dim font-mono text-xs uppercase tracking-wider">Units Sold</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalUnits}</div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-neon-surface border border-neon-green/20 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-neon-green/20">
          <h3 className="text-neon-green font-mono font-semibold text-sm">Transactions</h3>
        </div>
        {sales.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart className="w-12 h-12 text-neon-dim/30 mx-auto mb-3" />
            <p className="text-neon-dim font-mono text-sm">No sales today</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neon-green/10">
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Sale ID</th>
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Qty</th>
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Total</th>
                  <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, idx) => (
                  <tr key={String(sale.id)} className={`border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors ${idx % 2 === 0 ? '' : 'bg-neon-black/30'}`}>
                    <td className="px-4 py-3 text-neon-dim font-mono text-sm">#{String(sale.id)}</td>
                    <td className="px-4 py-3 text-white font-mono text-sm">{getProductName(sale.stockItemId)}</td>
                    <td className="px-4 py-3 text-white font-mono text-sm">{String(sale.quantity)}</td>
                    <td className="px-4 py-3 text-neon-green font-mono text-sm">₹{Number(sale.totalPrice).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-neon-dim font-mono text-sm">
                      {new Date(Number(sale.timestamp) / 1_000_000).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
