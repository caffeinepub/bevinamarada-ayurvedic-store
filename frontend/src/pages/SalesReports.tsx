import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Calendar, Package, RefreshCw } from 'lucide-react';
import { useGetSalesReports, useGetAllStockItems } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const formatINR = (amount: bigint | number) => {
  const num = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
};

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 flex-1 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function SalesReports() {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'product'>('daily');
  const { data: reports, isLoading, error, refetch, isFetching } = useGetSalesReports();
  const { data: stockItems = [] } = useGetAllStockItems();

  const getProductName = (id: bigint) => {
    const item = stockItems.find((s) => s.id === id);
    return item?.name ?? `Product #${id}`;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const dailyRows = (reports?.dailySales ?? [])
      .map(([day, amount]) => `<tr><td>Day ${day} ago</td><td>${formatINR(amount)}</td></tr>`)
      .join('');

    const monthlyRows = (reports?.monthlySales ?? [])
      .map(([month, amount]) => `<tr><td>Month ${month}</td><td>${formatINR(amount)}</td></tr>`)
      .join('');

    const productRows = (reports?.productBreakdown ?? [])
      .map(([id, qty]) => `<tr><td>${getProductName(id)}</td><td>${qty} units</td></tr>`)
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sales Report - Bevinamarada Ayurvedic Store</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #1a1a1a; }
          h1 { color: #c2410c; font-size: 24px; margin-bottom: 4px; }
          h2 { color: #0f766e; font-size: 18px; margin-top: 24px; margin-bottom: 8px; }
          .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
          .summary { display: flex; gap: 24px; margin-bottom: 24px; }
          .summary-card { background: #f5f5f5; border-radius: 8px; padding: 16px; flex: 1; }
          .summary-card .value { font-size: 22px; font-weight: bold; color: #c2410c; }
          .summary-card .label { font-size: 12px; color: #666; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { background: #f0f0f0; padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666; }
          td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
          tr:hover td { background: #fafafa; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <h1>Sales Report</h1>
        <p class="meta">Bevinamarada Ayurvedic Store &bull; Generated: ${new Date().toLocaleString('en-IN')}</p>
        <div class="summary">
          <div class="summary-card">
            <div class="value">${formatINR(reports?.totalRevenue ?? 0n)}</div>
            <div class="label">Total Revenue</div>
          </div>
          <div class="summary-card">
            <div class="value">${reports?.totalSales ?? 0}</div>
            <div class="label">Total Sales</div>
          </div>
        </div>
        <h2>Daily Sales</h2>
        <table><thead><tr><th>Period</th><th>Revenue</th></tr></thead><tbody>${dailyRows || '<tr><td colspan="2">No data</td></tr>'}</tbody></table>
        <h2>Monthly Sales</h2>
        <table><thead><tr><th>Month</th><th>Revenue</th></tr></thead><tbody>${monthlyRows || '<tr><td colspan="2">No data</td></tr>'}</tbody></table>
        <h2>Product Breakdown</h2>
        <table><thead><tr><th>Product</th><th>Quantity Sold</th></tr></thead><tbody>${productRows || '<tr><td colspan="2">No data</td></tr>'}</tbody></table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const tabs = [
    { id: 'daily' as const, label: 'Daily Sales', icon: <Calendar size={15} /> },
    { id: 'monthly' as const, label: 'Monthly Sales', icon: <TrendingUp size={15} /> },
    { id: 'product' as const, label: 'By Product', icon: <Package size={15} /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-coral flex items-center justify-center shadow-coral">
              <BarChart3 size={20} className="text-white" />
            </div>
            Sales Reports
          </h1>
          <p className="text-muted-foreground mt-1">Comprehensive sales analytics and insights</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-saffron text-white text-sm font-semibold shadow-saffron hover:opacity-90 transition-opacity"
          >
            <Download size={15} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="admin-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center shadow-teal">
              <TrendingUp size={22} className="text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
              {isLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  {formatINR(reports?.totalRevenue ?? 0n)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="admin-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center shadow-saffron">
              <BarChart3 size={22} className="text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Sales</p>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-1" />
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  {Number(reports?.totalSales ?? 0n).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="admin-card p-5 border-l-4 border-destructive bg-destructive/5">
          <p className="text-destructive font-medium">Failed to load sales reports</p>
          <p className="text-muted-foreground text-sm mt-1">{String(error)}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="admin-card overflow-hidden">
        {/* Tab Bar */}
        <div className="flex border-b border-border bg-muted/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all duration-150 border-b-2 ${
                activeTab === tab.id
                  ? 'border-saffron text-saffron bg-saffron-light'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Daily Sales Tab */}
              {activeTab === 'daily' && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Daily Sales Breakdown</h3>
                  {!reports?.dailySales || reports.dailySales.length === 0 ? (
                    <div className="text-center py-16">
                      <Calendar size={48} className="mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium">No daily sales data yet</p>
                      <p className="text-muted-foreground/60 text-sm mt-1">
                        Sales will appear here once transactions are recorded
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Period</th>
                            <th>Revenue</th>
                            <th>Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reports.dailySales.map(([day, amount], idx) => {
                            const total = Number(reports.totalRevenue);
                            const share = total > 0 ? ((Number(amount) / total) * 100).toFixed(1) : '0';
                            return (
                              <tr key={idx}>
                                <td className="text-muted-foreground">{idx + 1}</td>
                                <td className="font-medium">
                                  {Number(day) === 0 ? 'Today' : `${day} day(s) ago`}
                                </td>
                                <td>
                                  <span className="font-semibold text-teal">{formatINR(amount)}</span>
                                </td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                                      <div
                                        className="h-2 rounded-full gradient-teal"
                                        style={{ width: `${share}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{share}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Monthly Sales Tab */}
              {activeTab === 'monthly' && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Monthly Sales Summary</h3>
                  {!reports?.monthlySales || reports.monthlySales.length === 0 ? (
                    <div className="text-center py-16">
                      <TrendingUp size={48} className="mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium">No monthly sales data yet</p>
                      <p className="text-muted-foreground/60 text-sm mt-1">
                        Monthly aggregates will appear here once sales are recorded
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Month Period</th>
                            <th>Revenue</th>
                            <th>Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reports.monthlySales.map(([month, amount], idx) => {
                            const total = Number(reports.totalRevenue);
                            const share = total > 0 ? ((Number(amount) / total) * 100).toFixed(1) : '0';
                            return (
                              <tr key={idx}>
                                <td className="text-muted-foreground">{idx + 1}</td>
                                <td className="font-medium">
                                  {Number(month) === 0 ? 'This Month' : `${month} month(s) ago`}
                                </td>
                                <td>
                                  <span className="font-semibold text-saffron">{formatINR(amount)}</span>
                                </td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                                      <div
                                        className="h-2 rounded-full gradient-saffron"
                                        style={{ width: `${share}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{share}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Product Breakdown Tab */}
              {activeTab === 'product' && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Product Sales Breakdown</h3>
                  {!reports?.productBreakdown || reports.productBreakdown.length === 0 ? (
                    <div className="text-center py-16">
                      <Package size={48} className="mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium">No product sales data yet</p>
                      <p className="text-muted-foreground/60 text-sm mt-1">
                        Product breakdown will appear here once sales are recorded
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Units Sold</th>
                            <th>Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reports.productBreakdown
                            .slice()
                            .sort((a, b) => Number(b[1]) - Number(a[1]))
                            .map(([productId, qty], idx) => {
                              const totalQty = reports.productBreakdown.reduce(
                                (sum, [, q]) => sum + Number(q),
                                0,
                              );
                              const share =
                                totalQty > 0
                                  ? ((Number(qty) / totalQty) * 100).toFixed(1)
                                  : '0';
                              return (
                                <tr key={idx}>
                                  <td className="text-muted-foreground">{idx + 1}</td>
                                  <td>
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg gradient-coral flex items-center justify-center">
                                        <Package size={13} className="text-white" />
                                      </div>
                                      <span className="font-medium">{getProductName(productId)}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="font-semibold text-coral">
                                      {Number(qty).toLocaleString()} units
                                    </span>
                                  </td>
                                  <td>
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 bg-muted rounded-full h-2 max-w-24">
                                        <div
                                          className="h-2 rounded-full gradient-coral"
                                          style={{ width: `${share}%` }}
                                        />
                                      </div>
                                      <span className="text-xs text-muted-foreground">{share}%</span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
