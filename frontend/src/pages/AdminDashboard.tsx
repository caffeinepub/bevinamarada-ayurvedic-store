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
  Zap,
  ArrowRight,
} from 'lucide-react';

const modules = [
  { path: '/admin/owner-dashboard', label: 'Owner Dashboard', icon: Zap, desc: 'Main overview & metrics' },
  { path: '/admin/stock', label: 'Stock Management', icon: Package, desc: 'Manage inventory levels' },
  { path: '/admin/products', label: 'Products', icon: ShoppingCart, desc: 'Product catalog management' },
  { path: '/admin/sales', label: "Today's Sales", icon: TrendingUp, desc: 'Daily sales transactions' },
  { path: '/admin/revenue', label: 'Revenue', icon: DollarSign, desc: 'Revenue analytics' },
  { path: '/admin/income', label: 'Income', icon: BarChart3, desc: 'Income tracking' },
  { path: '/admin/customers', label: 'Customers', icon: Users, desc: 'Customer management' },
  { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare, desc: 'Customer enquiries' },
  { path: '/admin/trending', label: 'Trending', icon: TrendingUp, desc: 'Trending products' },
  { path: '/admin/reports', label: 'Reports', icon: FileText, desc: 'Sales reports & exports' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-neon-green neon-glow mb-4 animate-pulse-glow">
          <Zap className="w-7 h-7 text-neon-green" />
        </div>
        <h1 className="font-orbitron text-3xl font-black text-white mb-2">ADMIN PORTAL</h1>
        <p className="text-gray-500 font-mono text-sm">Bevinamarada Ayurvedic Store — Control Center</p>
      </div>

      {/* Modules Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.path}
              to={mod.path}
              className="neon-card rounded-lg p-5 flex items-center gap-4 group hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg border border-neon-green/20 bg-neon-green/5 flex items-center justify-center group-hover:border-neon-green/60 group-hover:bg-neon-green/10 group-hover:neon-glow-sm transition-all duration-300 flex-shrink-0">
                <Icon className="w-6 h-6 text-neon-green" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-rajdhani font-bold text-white text-sm group-hover:text-neon-green transition-colors">{mod.label}</p>
                <p className="text-gray-600 text-xs font-mono mt-0.5">{mod.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-neon-green group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
