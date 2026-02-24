import React, { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  ShoppingCart,
  BarChart2,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Leaf,
  LogOut,
  User,
  Menu,
  X,
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/stocks', label: 'Stock Management', icon: Package },
  { path: '/admin/trending', label: 'Trending', icon: TrendingUp },
  { path: '/admin/sales', label: 'Sales', icon: ShoppingCart },
  { path: '/admin/revenue', label: 'Revenue', icon: BarChart2 },
  { path: '/admin/income', label: 'Income', icon: DollarSign },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const currentPath = routerState.location.pathname;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const principalShort = identity
    ? identity.getPrincipal().toString().slice(0, 8) + '...'
    : '';

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return currentPath === path;
    return currentPath.startsWith(path);
  };

  const closeMobileSidebar = () => setMobileOpen(false);

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`
        flex flex-col h-full flex-shrink-0
        bg-sidebar border-r border-sidebar-border
        ${mobile ? 'w-64' : `sidebar-transition ${collapsed ? 'w-16' : 'w-64'}`}
      `}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border ${
          !mobile && collapsed ? 'justify-center' : ''
        }`}
      >
        <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0 shadow-gold">
          <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {(mobile || !collapsed) && (
          <div className="animate-fade-in overflow-hidden">
            <p className="text-sidebar-primary font-display font-bold text-sm leading-tight truncate">
              Bevinamarada
            </p>
            <p className="text-sidebar-foreground/60 text-xs font-medium">Ayurvedic Store</p>
          </div>
        )}
        {/* Close button for mobile */}
        {mobile && (
          <button
            onClick={closeMobileSidebar}
            className="ml-auto w-7 h-7 rounded-full flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map(({ path, label, icon: Icon, exact }) => {
            const active = isActive(path, exact);
            return (
              <li key={path}>
                <Link
                  to={path as '/admin'}
                  onClick={mobile ? closeMobileSidebar : undefined}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    font-semibold text-sm
                    transition-all duration-200
                    ${!mobile && collapsed ? 'justify-center' : ''}
                    ${
                      active
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-gold'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                    }
                  `}
                  title={!mobile && collapsed ? label : undefined}
                >
                  <Icon className="flex-shrink-0 w-5 h-5" />
                  {(mobile || !collapsed) && (
                    <span className="animate-fade-in truncate">{label}</span>
                  )}
                  {active && (mobile || !collapsed) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary-foreground opacity-80" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {(mobile || !collapsed) && identity && (
          <div className="flex items-center gap-2 px-2 py-1.5 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-sidebar-primary/30 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-sidebar-primary" />
            </div>
            <span className="text-sidebar-foreground/70 text-xs font-medium truncate">
              {principalShort}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-2 px-3 py-2 rounded-lg
            text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10
            transition-all duration-200 font-semibold text-sm
            ${!mobile && collapsed ? 'justify-center' : ''}
          `}
          title={!mobile && collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {(mobile || !collapsed) && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle — desktop only */}
      {!mobile && (
        <div className="flex justify-center pb-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center shadow-gold hover:scale-110 transition-transform duration-200"
          >
            {collapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </button>
        </div>
      )}
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Desktop sidebar (always visible, collapsible) ── */}
      <div className="hidden md:flex h-full">
        <SidebarContent mobile={false} />
      </div>

      {/* ── Mobile sidebar backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile sidebar drawer ── */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent mobile={true} />
      </div>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar with hamburger */}
        <div className="flex items-center gap-3 px-4 py-3 bg-sidebar border-b border-sidebar-border md:hidden flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-lg bg-sidebar-primary/20 flex items-center justify-center text-sidebar-primary hover:bg-sidebar-primary/30 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <span className="text-sidebar-primary font-display font-bold text-sm">
              Bevinamarada
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
