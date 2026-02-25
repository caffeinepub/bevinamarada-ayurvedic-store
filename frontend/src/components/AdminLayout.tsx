import { useState } from 'react';
import { Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  DollarSign,
  Users,
  MessageSquare,
  BarChart3,
  ShoppingCart,
  FileText,
  Menu,
  X,
  LogOut,
  Zap,
  Home,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/admin/owner-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/stock', label: 'Stock Management', icon: Package },
  { path: '/admin/products', label: 'Products', icon: ShoppingCart },
  { path: '/admin/sales', label: 'Sales', icon: TrendingUp },
  { path: '/admin/revenue', label: 'Revenue', icon: DollarSign },
  { path: '/admin/income', label: 'Income', icon: BarChart3 },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { path: '/admin/trending', label: 'Trending', icon: TrendingUp },
  { path: '/admin/reports', label: 'Reports', icon: FileText },
];

function handleLogout(navigate: ReturnType<typeof useNavigate>) {
  sessionStorage.removeItem('admin-session');
  sessionStorage.removeItem('adminSessionActive');
  localStorage.removeItem('admin-session');
  localStorage.removeItem('adminSessionActive');
  navigate({ to: '/admin-login' });
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-neon-black flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 admin-sidebar fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neon-border">
          <div className="w-8 h-8 rounded-md border border-neon-green flex items-center justify-center neon-glow-sm">
            <Zap className="w-4 h-4 text-neon-green" />
          </div>
          <div>
            <p className="font-orbitron text-xs font-bold text-neon-green neon-text-sm">ADMIN PORTAL</p>
            <p className="text-xs text-gray-600 font-mono">Bevinamarada</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-rajdhani font-medium transition-all duration-200 ${
                  active
                    ? 'text-neon-green bg-neon-green/10 border-l-2 border-neon-green pl-[10px]'
                    : 'text-gray-500 hover:text-neon-green hover:bg-neon-green/5 border-l-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-neon-green' : ''}`} />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 ml-auto text-neon-green" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-neon-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-500 hover:text-neon-green hover:bg-neon-green/5 transition-all duration-200 font-rajdhani"
          >
            <Home className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <button
            onClick={() => handleLogout(navigate)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-rajdhani"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-neon-black border-b border-neon-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded border border-neon-green flex items-center justify-center neon-glow-sm">
            <Zap className="w-3.5 h-3.5 text-neon-green" />
          </div>
          <span className="font-orbitron text-xs font-bold text-neon-green">ADMIN PORTAL</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-gray-400 hover:text-neon-green transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 bg-neon-black border-r border-neon-border flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neon-border">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-neon-green" />
                <span className="font-orbitron text-sm font-bold text-neon-green">ADMIN PORTAL</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-500 hover:text-neon-green transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Nav */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-rajdhani font-medium transition-all duration-200 ${
                      active
                        ? 'text-neon-green bg-neon-green/10 border-l-2 border-neon-green pl-[10px]'
                        : 'text-gray-500 hover:text-neon-green hover:bg-neon-green/5 border-l-2 border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-neon-green' : ''}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="px-3 py-4 border-t border-neon-border space-y-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-500 hover:text-neon-green hover:bg-neon-green/5 transition-all duration-200 font-rajdhani"
              >
                <Home className="w-4 h-4" />
                <span>Back to Store</span>
              </Link>
              <button
                onClick={() => handleLogout(navigate)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-rajdhani"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="lg:hidden h-14" /> {/* Mobile header spacer */}
        <Outlet />
      </main>
    </div>
  );
}
