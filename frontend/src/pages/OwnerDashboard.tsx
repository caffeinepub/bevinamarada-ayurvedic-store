import { Link } from '@tanstack/react-router';
import {
  Package,
  TrendingUp,
  DollarSign,
  Users,
  MessageSquare,
  BarChart3,
  ShoppingCart,
  FileText,
  AlertTriangle,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useGetAllStockItems, useGetTodaysSales, useGetSalesReports, useGetLowStockItems } from '../hooks/useQueries';

const quickLinks = [
  { path: '/admin/stock', label: 'Stock Management', icon: Package, desc: 'Manage inventory' },
  { path: '/admin/products', label: 'Products', icon: ShoppingCart, desc: 'Product catalog' },
  { path: '/admin/sales', label: "Today's Sales", icon: TrendingUp, desc: 'Daily transactions' },
  { path: '/admin/revenue', label: 'Revenue', icon: DollarSign, desc: 'Revenue overview' },
  { path: '/admin/income', label: 'Income', icon: BarChart3, desc: 'Income tracking' },
  { path: '/admin/customers', label: 'Customers', icon: Users, desc: 'Customer management' },
  { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare, desc: 'Customer enquiries' },
  { path: '/admin/trending', label: 'Trending', icon: TrendingUp, desc: 'Trending products' },
  { path: '/admin/reports', label: 'Reports', icon: FileText, desc: 'Sales reports' },
];

export default function OwnerDashboard() {
  const { data: stockItems = [] } = useGetAllStockItems();
  const { data: todaysSales = [] } = useGetTodaysSales();
  const { data: salesReports } = useGetSalesReports();
  const { data: lowStockItems = [] } = useGetLowStockItems();

  const todaysRevenue = todaysSales.reduce((sum, s) => sum + Number(s.totalPrice), 0);
  const totalRevenue = salesReports ? Number(salesReports.totalRevenue) : 0;

  const metrics = [
    { label: 'Total Products', value: stockItems.length.toString(), icon: Package, color: 'text-neon-green' },
    { label: "Today's Sales", value: todaysSales.length.toString(), icon: TrendingUp, color: 'text-neon-green' },
    { label: "Today's Revenue", value: `₹${todaysRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: 'text-neon-green' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: BarChart3, color: 'text-neon-green' },
    { label: 'Low Stock Items', value: lowStockItems.length.toString(), icon: AlertTriangle, color: lowStockItems.length > 0 ? 'text-yellow-400' : 'text-neon-green' },
    { label: 'Total Sales', value: salesReports ? salesReports.totalSales.toString() : '0', icon: ShoppingCart, color: 'text-neon-green' },
  ];

  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-neon-green animate-pulse-glow" />
          <h1 className="font-orbitron text-2xl font-bold text-white">OWNER DASHBOARD</h1>
        </div>
        <p className="text-gray-500 font-mono text-sm">Welcome back, Admin. Here's your store overview.</p>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-orbitron text-sm font-bold">LOW STOCK ALERT</p>
            <p className="text-gray-400 text-sm font-mono mt-1">
              {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} running low.{' '}
              <Link to="/admin/stock" className="text-neon-green hover:underline">
                Manage stock →
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="neon-card rounded-lg p-5 group hover:border-neon-green/40 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              </div>
              <p className={`font-orbitron text-xl font-black ${metric.color} mb-1`}>{metric.value}</p>
              <p className="text-gray-500 text-xs font-mono">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="font-orbitron text-sm font-bold text-gray-400 tracking-widest mb-4">QUICK ACCESS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="neon-card rounded-lg p-4 flex items-center gap-4 group hover:border-neon-green/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-md border border-neon-green/20 bg-neon-green/5 flex items-center justify-center group-hover:border-neon-green/50 group-hover:bg-neon-green/10 transition-all duration-300">
                  <Icon className="w-5 h-5 text-neon-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-rajdhani font-semibold text-white text-sm group-hover:text-neon-green transition-colors">{link.label}</p>
                  <p className="text-gray-600 text-xs font-mono">{link.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-neon-green group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
