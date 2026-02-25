import { useState, useEffect } from 'react';
import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Menu, X, Leaf, Heart } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="min-h-screen bg-neon-black text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neon-black/95 backdrop-blur-md border-b border-neon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full border border-neon-green flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                <Leaf className="w-4 h-4 text-neon-green" />
              </div>
              <div>
                <span className="font-orbitron text-sm font-bold text-neon-green neon-text-sm">
                  BEVINAMARADA
                </span>
                <p className="text-xs text-gray-500 font-mono leading-none">Ayurvedic Store</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-rajdhani font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-neon-green bg-neon-green/10 neon-text-sm'
                      : 'text-gray-400 hover:text-neon-green hover:bg-neon-green/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Admin Link + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/admin-login"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-neon-black bg-neon-green rounded-md hover:bg-neon-green-bright transition-all duration-200 neon-glow-sm"
              >
                ADMIN
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-neon-green transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-neon-black">
          <div className="flex items-center justify-between px-4 py-4 border-b border-neon-border">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-neon-green" />
              <span className="font-orbitron text-sm font-bold text-neon-green">BEVINAMARADA</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-gray-400 hover:text-neon-green transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-xl font-rajdhani font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-neon-green neon-text-sm'
                    : 'text-gray-400 hover:text-neon-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin-login"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-6 py-2.5 text-sm font-mono font-bold text-neon-black bg-neon-green rounded-md neon-glow-sm"
            >
              ADMIN PORTAL
            </Link>
          </nav>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neon-black border-t border-neon-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-neon-green" />
              <span className="font-orbitron text-xs font-bold text-neon-green">BEVINAMARADA</span>
              <span className="text-gray-600 text-xs font-mono">Ayurvedic Store</span>
            </div>
            <p className="text-gray-600 text-xs font-mono flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-neon-green fill-neon-green" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-green hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-gray-700 text-xs font-mono">
              © {new Date().getFullYear()} Bevinamarada Ayurvedic Store
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
