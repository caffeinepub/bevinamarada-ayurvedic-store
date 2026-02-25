import { useState } from 'react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Warehouse,
  ChevronDown,
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import TrialStatusBanner from './TrialStatusBanner';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/stock', label: 'Stock', icon: Warehouse },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { path: '/admin/sales-reports', label: 'Sales Reports', icon: BarChart3 },
];

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-forest-900 via-forest-800 to-sage-900 text-white shadow-2xl">
        {/* Logo */}
        <div className="p-6 border-b border-forest-700/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center shadow-lg">
              <img src="/assets/generated/neem-leaf-logo.dim_256x256.png" alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight text-white font-display">Bevinamarada</p>
              <p className="text-xs text-forest-300">Ayurvedic Store</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-saffron-500/30 to-gold-500/20 text-saffron-300 border border-saffron-500/30 shadow-lg'
                    : 'text-forest-300 hover:bg-forest-700/50 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-saffron-400' : 'text-forest-400 group-hover:text-white'}`} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-saffron-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-forest-700/50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-forest-800/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center text-white text-sm font-bold">
              {userProfile?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userProfile?.name || 'Admin'}</p>
              <p className="text-xs text-forest-400">Administrator</p>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <Link
              to="/admin/profile"
              className="flex items-center gap-2 px-3 py-2 text-forest-300 hover:text-white hover:bg-forest-700/50 rounded-lg transition-colors text-sm"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-forest-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-sm font-semibold text-gray-800">
                {navItems.find(n => n.path === currentPath)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center">
                <img src="/assets/generated/neem-leaf-logo.dim_256x256.png" alt="Logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-bold text-forest-800 text-sm font-display">Bevinamarada</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/trending"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors border border-amber-200"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Trending
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center text-white text-xs font-bold">
                  {userProfile?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">{userProfile?.name || 'Admin'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-20">
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => { setProfileDropdownOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Trial Status Banner */}
        <TrialStatusBanner />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-forest-900 via-forest-800 to-sage-900 text-white shadow-2xl z-50 lg:hidden flex flex-col">
            <div className="p-4 border-b border-forest-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center">
                  <img src="/assets/generated/neem-leaf-logo.dim_256x256.png" alt="Logo" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white font-display">Bevinamarada</p>
                  <p className="text-xs text-forest-300">Ayurvedic Store</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-forest-700/50 transition-colors"
              >
                <X className="w-5 h-5 text-forest-300" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-saffron-500/30 to-gold-500/20 text-saffron-300 border border-saffron-500/30'
                        : 'text-forest-300 hover:bg-forest-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-saffron-400' : 'text-forest-400'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <Link
                to="/admin/trending"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-forest-300 hover:bg-forest-700/50 hover:text-white transition-all duration-200"
              >
                <TrendingUp className="w-5 h-5 text-forest-400" />
                <span className="font-medium">Trending</span>
              </Link>
            </nav>

            <div className="p-4 border-t border-forest-700/50">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-forest-800/50 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center text-white text-sm font-bold">
                  {userProfile?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{userProfile?.name || 'Admin'}</p>
                  <p className="text-xs text-forest-400">Administrator</p>
                </div>
              </div>
              <Link
                to="/admin/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-forest-300 hover:text-white hover:bg-forest-700/50 rounded-lg transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-forest-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm mt-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
