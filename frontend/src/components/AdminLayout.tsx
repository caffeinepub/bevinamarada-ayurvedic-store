import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  PieChart,
  Menu,
  X,
  LogOut,
  ChevronRight,
  User,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';

type ValidAdminPath =
  | '/admin'
  | '/admin/stocks'
  | '/admin/customers'
  | '/admin/sales'
  | '/admin/revenue'
  | '/admin/income'
  | '/admin/trending'
  | '/admin/sales-reports'
  | '/admin/profile';

interface NavItem {
  label: string;
  path: ValidAdminPath;
  icon: React.ReactNode;
  color: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} />, color: 'text-saffron' },
  { label: 'Stock', path: '/admin/stocks', icon: <Package size={18} />, color: 'text-teal' },
  { label: 'Customers', path: '/admin/customers', icon: <Users size={18} />, color: 'text-coral' },
  { label: 'Sales', path: '/admin/sales', icon: <ShoppingCart size={18} />, color: 'text-gold' },
  { label: 'Revenue', path: '/admin/revenue', icon: <PieChart size={18} />, color: 'text-violet' },
  { label: 'Income', path: '/admin/income', icon: <DollarSign size={18} />, color: 'text-teal' },
  { label: 'Trending', path: '/admin/trending', icon: <TrendingUp size={18} />, color: 'text-saffron' },
  { label: 'Reports', path: '/admin/sales-reports', icon: <BarChart3 size={18} />, color: 'text-coral' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

function ProfileDropdown() {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: profile } = useGetCallerUserProfile();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const principalId = identity?.getPrincipal().toString() ?? '';
  const displayName = profile?.name ?? 'Admin';
  const role = profile?.role ?? 'admin';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyPrincipal = () => {
    navigator.clipboard.writeText(principalId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setOpen(false);
    navigate({ to: '/' });
  };

  const handleViewProfile = () => {
    setOpen(false);
    navigate({ to: '/admin/profile' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10 transition-colors"
      >
        <div className="w-9 h-9 rounded-full gradient-saffron flex items-center justify-center text-white font-bold text-sm shadow-saffron">
          {initials || <User size={16} />}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-white text-sm font-semibold leading-tight">{displayName}</p>
          <p className="text-white/60 text-xs capitalize">{String(role)}</p>
        </div>
        <ChevronRight
          size={14}
          className={`text-white/60 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-2xl shadow-card-hover z-50 animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="gradient-saffron p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                {initials || <User size={20} />}
              </div>
              <div>
                <p className="font-bold text-base">{displayName}</p>
                <span className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded-full capitalize mt-0.5">
                  {String(role)}
                </span>
              </div>
            </div>
          </div>

          {/* Principal ID */}
          <div className="p-4 border-b border-border">
            <p className="text-xs text-muted-foreground font-medium mb-1.5 uppercase tracking-wider">
              Principal ID
            </p>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <code className="text-xs font-mono text-foreground flex-1 truncate">
                {principalId ? `${principalId.slice(0, 20)}...` : 'Not available'}
              </code>
              <button
                onClick={handleCopyPrincipal}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                title="Copy Principal ID"
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="p-2">
            <button
              onClick={handleViewProfile}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-saffron-light flex items-center justify-center">
                <User size={15} className="text-saffron" />
              </div>
              <span className="text-sm font-medium text-foreground">View Profile</span>
              <ExternalLink size={13} className="ml-auto text-muted-foreground" />
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-destructive/10 transition-colors text-left mt-1"
            >
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <LogOut size={15} className="text-destructive" />
              </div>
              <span className="text-sm font-medium text-destructive">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 gradient-sidebar fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-saffron flex items-center justify-center shadow-saffron">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Bevinamarada</p>
              <p className="text-white/50 text-xs">Ayurvedic Store</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                isActive(item.path)
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className={isActive(item.path) ? 'text-white' : item.color}>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {isActive(item.path) && (
                <ChevronRight size={14} className="ml-auto text-white/60" />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">Admin Panel v1.0</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 gradient-sidebar z-50 lg:hidden transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-saffron flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Bevinamarada</p>
              <p className="text-white/50 text-xs">Ayurvedic Store</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                isActive(item.path)
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className={isActive(item.path) ? 'text-white' : item.color}>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="gradient-hero sticky top-0 z-20 px-4 lg:px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-white font-bold text-lg">Admin Dashboard</h1>
              <p className="text-white/60 text-xs">Bevinamarada Ayurvedic Store</p>
            </div>
            <div className="lg:hidden">
              <h1 className="text-white font-bold text-base">Admin</h1>
            </div>
          </div>

          <ProfileDropdown />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-4 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Bevinamarada Ayurvedic Store. Built with{' '}
            <span className="text-coral">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
