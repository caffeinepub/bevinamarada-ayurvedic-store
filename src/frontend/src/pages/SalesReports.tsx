import {
  BarChart3,
  Download,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  useGetAllStockItems,
  useGetSalesReports,
  useGetTodaysSales,
} from "../hooks/useQueries";

type ReportTab = "daily" | "monthly" | "products";

export default function SalesReports() {
  const [activeTab, setActiveTab] = useState<ReportTab>("daily");
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
        <title>Sales Report - Bevinamarada Ayurvedic Store</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #1a2e1a; padding: 32px; }
          h1 { color: #2d5a2d; font-size: 22px; margin-bottom: 4px; }
          h2 { color: #3a6b3a; font-size: 16px; margin-top: 24px; margin-bottom: 8px; }
          p { color: #444; font-size: 14px; margin: 4px 0; }
          .header-band { background: linear-gradient(135deg, #1f4a1f, #2d6a2d); padding: 20px 24px; border-radius: 8px; margin-bottom: 20px; }
          .header-band h1 { color: #fff; margin: 0; }
          .header-band p { color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px; }
          .summary-row { display: flex; gap: 16px; margin-bottom: 20px; }
          .summary-card { flex: 1; padding: 16px; border: 1px solid #c8e6c9; border-radius: 8px; background: #f1f8f1; }
          .summary-card .label { font-size: 11px; color: #5a7a5a; text-transform: uppercase; letter-spacing: 0.5px; }
          .summary-card .value { font-size: 20px; font-weight: 700; color: #2d5a2d; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th { background: #2d5a2d; color: #fff; padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.4px; }
          td { padding: 9px 12px; font-size: 13px; border-bottom: 1px solid #e8f5e8; }
          tr:hover td { background: #f5fdf5; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #c8e6c9; font-size: 11px; color: #888; }
        </style>
      </head>
      <body>
        <div class="header-band">
          <h1>🌿 Bevinamarada Ayurvedic Store</h1>
          <p>Sales Report — Generated: ${new Date().toLocaleString("en-IN")}</p>
        </div>
        <div class="summary-row">
          <div class="summary-card">
            <div class="label">Total Revenue</div>
            <div class="value">₹${Number(reports?.totalRevenue ?? 0).toLocaleString("en-IN")}</div>
          </div>
          <div class="summary-card">
            <div class="label">Total Sales</div>
            <div class="value">${reports?.totalSales ?? 0}</div>
          </div>
          <div class="summary-card">
            <div class="label">Today's Sales</div>
            <div class="value">${todaysSales.length}</div>
          </div>
        </div>
        <h2>Today's Transactions (${todaysSales.length})</h2>
        <table>
          <tr><th>Sale ID</th><th>Product</th><th>Quantity</th><th>Total (₹)</th></tr>
          ${todaysSales.map((s) => `<tr><td>${s.id}</td><td>${getProductName(s.stockItemId)}</td><td>${s.quantity}</td><td>₹${Number(s.totalPrice).toLocaleString("en-IN")}</td></tr>`).join("")}
        </table>
        <h2>Daily Sales Breakdown</h2>
        <table>
          <tr><th>Days Ago</th><th>Revenue (₹)</th></tr>
          ${(reports?.dailySales ?? []).map(([day, revenue]) => `<tr><td>${day} days ago</td><td>₹${Number(revenue).toLocaleString("en-IN")}</td></tr>`).join("")}
        </table>
        <h2>Monthly Sales Breakdown</h2>
        <table>
          <tr><th>Month</th><th>Revenue (₹)</th></tr>
          ${(reports?.monthlySales ?? []).map(([month, revenue]) => `<tr><td>${month}</td><td>₹${Number(revenue).toLocaleString("en-IN")}</td></tr>`).join("")}
        </table>
        <div class="footer">Bevinamarada Ayurvedic Store — Confidential Business Report</div>
      </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(content);
      win.document.close();
      win.print();
    }
  };

  const tabs: { id: ReportTab; label: string }[] = [
    { id: "daily", label: "Daily" },
    { id: "monthly", label: "Monthly" },
    { id: "products", label: "Per Product" },
  ];

  const summaryCards = [
    {
      label: "Total Revenue",
      value: `₹${Number(reports?.totalRevenue ?? 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      borderColor: "border-l-primary",
      iconBg: "oklch(0.75 0.22 150 / 0.12)",
      iconColor: "oklch(0.75 0.22 150)",
    },
    {
      label: "Total Sales",
      value: String(reports?.totalSales ?? 0),
      icon: ShoppingBag,
      borderColor: "border-l-accent",
      iconBg: "oklch(0.72 0.18 200 / 0.12)",
      iconColor: "oklch(0.72 0.18 200)",
    },
    {
      label: "Today's Sales",
      value: String(todaysSales.length),
      icon: TrendingUp,
      borderColor: "border-l-success",
      iconBg: "oklch(0.72 0.2 150 / 0.12)",
      iconColor: "oklch(0.72 0.2 150)",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.75 0.22 150 / 0.12)" }}
          >
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">
              Sales Reports
            </h1>
            <p className="text-muted-foreground text-sm">
              Analytics & business insights
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleExportPDF}
          data-ocid="reports.primary_button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm h-11 neon-btn"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-card rounded-xl shadow-card p-5 border-l-4 ${card.borderColor} flex flex-col gap-2 neon-card`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {card.label}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: card.iconBg }}
                >
                  <Icon className="w-4 h-4" style={{ color: card.iconColor }} />
                </div>
              </div>
              <div className="text-2xl font-bold font-display text-foreground">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            data-ocid={`reports.${tab.id}.tab`}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={
              activeTab === tab.id
                ? {
                    background: "oklch(0.75 0.22 150)",
                    color: "oklch(0.09 0.005 250)",
                    boxShadow: "0 0 8px oklch(0.75 0.22 150 / 0.3)",
                  }
                : {
                    background: "oklch(0.14 0.008 250)",
                    color: "oklch(0.94 0.01 250)",
                    border: "1px solid oklch(0.22 0.015 250)",
                  }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="rounded-xl overflow-hidden shadow-card"
        style={{
          background: "oklch(0.14 0.008 250)",
          border: "1px solid oklch(0.22 0.015 250)",
        }}
      >
        {isLoading ? (
          <div className="p-12 text-center" data-ocid="reports.loading_state">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
              style={{
                borderColor: "oklch(0.22 0.015 250)",
                borderTopColor: "oklch(0.75 0.22 150)",
              }}
            />
            <p className="text-muted-foreground text-sm font-medium">
              Loading reports...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === "daily" && (
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.18 0.01 250 / 0.5)",
                      borderBottom: "1px solid oklch(0.22 0.015 250)",
                    }}
                  >
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Days Ago
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(reports?.dailySales ?? []).length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-10 text-center text-muted-foreground text-sm"
                        data-ocid="reports.empty_state"
                      >
                        No daily sales data available yet
                      </td>
                    </tr>
                  ) : (
                    (reports?.dailySales ?? []).map(([day, revenue], idx) => (
                      <tr
                        key={String(day)}
                        style={{
                          borderBottom: "1px solid oklch(0.22 0.015 250 / 0.4)",
                        }}
                        data-ocid={`reports.row.${idx + 1}`}
                        className="transition-colors"
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "";
                        }}
                      >
                        <td className="px-4 py-3.5 text-foreground text-sm font-medium">
                          {String(day)} days ago
                        </td>
                        <td className="px-4 py-3.5 text-primary font-semibold text-sm">
                          ₹{Number(revenue).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
            {activeTab === "monthly" && (
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.18 0.01 250 / 0.5)",
                      borderBottom: "1px solid oklch(0.22 0.015 250)",
                    }}
                  >
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Month
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(reports?.monthlySales ?? []).length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-10 text-center text-muted-foreground text-sm"
                        data-ocid="reports.empty_state"
                      >
                        No monthly sales data available yet
                      </td>
                    </tr>
                  ) : (
                    (reports?.monthlySales ?? []).map(
                      ([month, revenue], idx) => (
                        <tr
                          key={month}
                          style={{
                            borderBottom:
                              "1px solid oklch(0.22 0.015 250 / 0.4)",
                          }}
                          data-ocid={`reports.row.${idx + 1}`}
                          className="transition-colors"
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLTableRowElement
                            ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLTableRowElement
                            ).style.background = "";
                          }}
                        >
                          <td className="px-4 py-3.5 text-foreground text-sm font-medium">
                            Month {month}
                          </td>
                          <td className="px-4 py-3.5 text-primary font-semibold text-sm">
                            ₹{Number(revenue).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ),
                    )
                  )}
                </tbody>
              </table>
            )}
            {activeTab === "products" && (
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.18 0.01 250 / 0.5)",
                      borderBottom: "1px solid oklch(0.22 0.015 250)",
                    }}
                  >
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Units Sold
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(reports?.productBreakdown ?? []).length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-10 text-center text-muted-foreground text-sm"
                        data-ocid="reports.empty_state"
                      >
                        No product sales data available yet
                      </td>
                    </tr>
                  ) : (
                    (reports?.productBreakdown ?? []).map(
                      ([productId, qty], idx) => (
                        <tr
                          key={String(productId)}
                          style={{
                            borderBottom:
                              "1px solid oklch(0.22 0.015 250 / 0.4)",
                          }}
                          data-ocid={`reports.row.${idx + 1}`}
                          className="transition-colors"
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLTableRowElement
                            ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLTableRowElement
                            ).style.background = "";
                          }}
                        >
                          <td className="px-4 py-3.5 text-foreground text-sm font-semibold">
                            {getProductName(productId)}
                          </td>
                          <td className="px-4 py-3.5 text-primary font-semibold text-sm">
                            {String(qty)}
                          </td>
                        </tr>
                      ),
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Today's Sales Detail */}
      {todaysSales.length > 0 && (
        <div
          className="rounded-xl overflow-hidden shadow-card"
          style={{
            background: "oklch(0.14 0.008 250)",
            border: "1px solid oklch(0.22 0.015 250)",
          }}
        >
          <div
            className="px-5 py-4"
            style={{
              borderBottom: "1px solid oklch(0.22 0.015 250)",
              background: "oklch(0.18 0.01 250 / 0.3)",
            }}
          >
            <h2 className="font-heading font-semibold text-foreground text-base">
              Today's Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background: "oklch(0.18 0.01 250 / 0.5)",
                    borderBottom: "1px solid oklch(0.22 0.015 250)",
                  }}
                >
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {todaysSales.map((sale, idx) => (
                  <tr
                    key={String(sale.id)}
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.015 250 / 0.4)",
                    }}
                    data-ocid={`reports.item.${idx + 1}`}
                    className="transition-colors"
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "";
                    }}
                  >
                    <td className="px-4 py-3.5 text-foreground text-sm font-semibold">
                      {getProductName(sale.stockItemId)}
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-sm">
                      {String(sale.quantity)}
                    </td>
                    <td className="px-4 py-3.5 text-primary font-semibold text-sm">
                      ₹{Number(sale.totalPrice).toLocaleString("en-IN")}
                    </td>
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
