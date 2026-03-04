import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  ShoppingCart,
  TrendingUp,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Owner Dashboard", path: "/admin/owner-dashboard", icon: BarChart3 },
  { label: "Stock Management", path: "/admin/stock", icon: Package },
  { label: "Products", path: "/admin/products", icon: ShoppingCart },
  { label: "Customers", path: "/admin/customers", icon: Users },
  { label: "Sales Reports", path: "/admin/reports", icon: TrendingUp },
  { label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: NavItem) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-session");
    sessionStorage.removeItem("adminSessionActive");
    navigate({ to: "/admin-login" });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-forest">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-heading font-bold text-white text-sm leading-tight">
              Admin Panel
            </div>
            <div className="text-xs text-white/60 leading-tight">
              Bevinamarada Store
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-white/60 group-hover:text-white"}`}
              />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 text-white/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Profile + Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {/* User info area */}
        <div className="px-3 py-2 mb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                baslxr
              </p>
              <p className="text-white/50 text-xs truncate">Admin / Owner</p>
            </div>
          </div>
        </div>
        <Link
          to="/admin/profile"
          onClick={() => setSidebarOpen(false)}
          data-ocid="nav.profile.link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            location.pathname === "/admin/profile"
              ? "bg-white/20 text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <UserCircle className="w-4 h-4 shrink-0" />
          <span>My Profile</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="nav.logout.button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-muted overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col shadow-lg">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSidebarOpen(false);
            }}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-border/50 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-forest hover:bg-sage-light transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-forest" />
            <span className="font-heading font-semibold text-forest text-sm">
              Admin Panel
            </span>
          </div>
          <Link
            to="/admin/profile"
            data-ocid="nav.profile.link"
            className="p-2 rounded-lg text-forest hover:bg-sage-light transition-colors"
          >
            <UserCircle className="w-5 h-5" />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
