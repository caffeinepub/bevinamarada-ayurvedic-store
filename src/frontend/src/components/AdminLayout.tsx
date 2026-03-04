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
    localStorage.removeItem("admin-session");
    localStorage.removeItem("adminSessionActive");
    navigate({ to: "/admin-login" });
  };

  const SidebarContent = () => (
    <div
      className="flex flex-col h-full"
      style={{
        background: "oklch(0.11 0.006 250)",
        borderRight: "1px solid oklch(0.22 0.015 250)",
      }}
    >
      {/* Logo area */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: "1px solid oklch(0.22 0.015 250)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 neon-glow-green"
            style={{
              background: "oklch(0.14 0.008 250)",
              border: "1.5px solid oklch(0.75 0.22 150 / 0.5)",
            }}
          >
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-foreground text-sm leading-tight truncate">
              Bevinamarada
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group border-l-2 ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={
                active ? { background: "oklch(0.75 0.22 150 / 0.08)" } : {}
              }
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {active && (
                <ChevronRight className="w-3.5 h-3.5 text-primary/50 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3">
        <div className="neon-divider" />
      </div>

      {/* Profile + Logout area */}
      <div className="px-3 py-4 space-y-0.5">
        {/* User info */}
        <div className="px-3 py-2.5 mb-1 flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "oklch(0.75 0.22 150 / 0.15)",
              border: "1px solid oklch(0.75 0.22 150 / 0.3)",
            }}
          >
            <span className="text-primary text-xs font-bold font-display">
              B
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-foreground text-xs font-semibold truncate">
              baslxr
            </p>
            <p className="text-muted-foreground text-xs truncate">
              Admin / Owner
            </p>
          </div>
        </div>

        {/* Profile link */}
        <Link
          to="/admin/profile"
          onClick={() => setSidebarOpen(false)}
          data-ocid="nav.profile.link"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2 ${
            location.pathname === "/admin/profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          style={
            location.pathname === "/admin/profile"
              ? { background: "oklch(0.75 0.22 150 / 0.08)" }
              : {}
          }
        >
          <UserCircle className="w-4 h-4 shrink-0" />
          <span>My Profile</span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="nav.logout.button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive transition-all duration-150 border-l-2 border-transparent"
          style={{}}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.62 0.22 25 / 0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "";
          }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "oklch(0 0 0 / 0.7)" }}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSidebarOpen(false);
            }}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 shadow-modal">
            {/* Close button in mobile drawer */}
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header
          className="md:hidden flex items-center justify-between px-4 h-14 shrink-0"
          style={{
            background: "oklch(0.14 0.008 250)",
            borderBottom: "1px solid oklch(0.22 0.015 250)",
          }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            data-ocid="nav.menu.button"
            className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.14 0.008 250)",
                border: "1px solid oklch(0.75 0.22 150 / 0.4)",
              }}
            >
              <Leaf className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-display font-bold text-primary text-sm">
              Bevinamarada
            </span>
          </div>
          <Link
            to="/admin/profile"
            data-ocid="nav.profile.link"
            className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
            aria-label="Profile"
          >
            <UserCircle className="w-5 h-5" />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
