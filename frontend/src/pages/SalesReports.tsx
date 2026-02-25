import { useState } from 'react';
import { BarChart3, Download, Zap } from 'lucide-react';
import { useGetSalesReports, useGetAllStockItems, useGetTodaysSales } from '../hooks/useQueries';

type ReportTab = 'daily' | 'monthly' | 'products';

export default function SalesReports() {
  const [activeTab, setActiveTab] = useState<ReportTab>('daily');
  const { data: reports, isLoading } = useGetSalesReports();
  const { data: stockItems = [] } = useGetAllStockItems();
  const { data: todaysSales = [] } = useGetTodaysSales();

  const getProductName = (id: bigint) => {
    const item = stockItems.find((s) => s.id === id);
    return item?.name ?? `Product #${id}`;
  };

  const handleExportPDF = () => {
    const content = `
      <html>
      <head>
        <title>Sales Report</title>
        <style>
          body { font-family: monospace; background: #0a0a0a; color: #39ff14; padding: 20px; }
          h1 { color: #39ff14; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #39ff14; padding: 8px; text-align: left; }
          th { background: #1a1a1a; }
        </style>
      </head>
      <body>
        <h1>Sales Report - Bevinamarada Ayurvedic Store</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <h2>Summary</h2>
        <p>Total Revenue: ₹${Number(reports?.totalRevenue ?? 0).toLocaleString('en-IN')}</p>
        <p>Total Sales: ${reports?.totalSales ?? 0}</p>
        <h2>Today's Sales (${todaysSales.length} transactions)</h2>
        <table>
          <tr><th>Sale ID</th><th>Product ID</th><th>Quantity</th><th>Total</th></tr>
          ${todaysSales.map((s) => `<tr><td>${s.id}</td><td>${s.stockItemId}</td><td>${s.quantity}</td><td>₹${Number(s.totalPrice).toLocaleString('en-IN')}</td></tr>`).join('')}
        </table>
      </body>
      </html>
    `;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(content);
      win.document.close();
      win.print();
    }
  };

  const tabs: { id: ReportTab; label: string }[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'products', label: 'Per Product' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/40 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-neon-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-mono neon-text-glow">Sales Reports</h1>
            <p className="text-neon-dim text-sm font-mono">Analytics & insights</p>
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2.5 bg-neon-green/10 border border-neon-green/50 text-neon-green font-mono text-sm rounded-lg hover:bg-neon-green/20 hover:border-neon-green hover:shadow-neon transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neon-surface border border-neon-green/30 rounded-xl p-5 shadow-neon-sm animate-pulse-glow">
          <div className="text-neon-dim font-mono text-xs uppercase tracking-wider mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-neon-green font-mono neon-text-glow">
            ₹{Number(reports?.totalRevenue ?? 0).toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl p-5">
          <div className="text-neon-dim font-mono text-xs uppercase tracking-wider mb-2">Total Sales</div>
          <div className="text-2xl font-bold text-white font-mono">{String(reports?.totalSales ?? 0)}</div>
        </div>
        <div className="bg-neon-surface border border-neon-green/20 rounded-xl p-5">
          <div className="text-neon-dim font-mono text-xs uppercase tracking-wider mb-2">Today's Sales</div>
          <div className="text-2xl font-bold text-white font-mono">{todaysSales.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-neon-green/10 border border-neon-green/50 text-neon-green shadow-neon-sm'
                : 'bg-neon-surface border border-neon-green/10 text-neon-dim hover:border-neon-green/30 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-neon-surface border border-neon-green/20 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-neon-dim font-mono text-sm">Loading reports...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === 'daily' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-green/20">
                    <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Days Ago</th>
                    <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {(reports?.dailySales ?? []).length === 0 ? (
                    <tr><td colSpan={2} className="px-4 py-8 text-center text-neon-dim font-mono text-sm">No daily data</td></tr>
                  ) : (
                    (reports?.dailySales ?? []).map(([day, revenue], idx) => (
                      <tr key={idx} className="border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors">
                        <td className="px-4 py-3 text-white font-mono text-sm">{String(day)} days ago</td>
                        <td className="px-4 py-3 text-neon-green font-mono text-sm">₹{Number(revenue).toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
            {activeTab === 'monthly' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-green/20">
                    <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Month</th>
                    <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {(reports?.monthlySales ?? []).length === 0 ? (
                    <tr><td colSpan={2} className="px-4 py-8 text-center text-neon-dim font-mono text-sm">No monthly data</td></tr>
                  ) : (
                    (reports?.monthlySales ?? []).map(([month, revenue], idx) => (
                      <tr key={idx} className="border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors">
                        <td className="px-4 py-3 text-white font-mono text-sm">Month {month}</td>
                        <td className="px-4 py-3 text-neon-green font-mono text-sm">₹{Number(revenue).toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
            {activeTab === 'products' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-green/20">
                    <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Product</th>
                    <th className="text-left px-4 py-3 text-neon-green font-mono text-xs uppercase tracking-wider">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {(reports?.productBreakdown ?? []).length === 0 ? (
                    <tr><td colSpan={2} className="px-4 py-8 text-center text-neon-dim font-mono text-sm">No product data</td></tr>
                  ) : (
                    (reports?.productBreakdown ?? []).map(([productId, qty], idx) => (
                      <tr key={idx} className="border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors">
                        <td className="px-4 py-3 text-white font-mono text-sm">{getProductName(productId)}</td>
                        <td className="px-4 py-3 text-neon-green font-mono text-sm">{String(qty)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
