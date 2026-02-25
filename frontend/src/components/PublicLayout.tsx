import { useState } from 'react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { Menu, X, Leaf, Phone, MapPin } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-forest-100 shadow-sm">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-forest-800 to-sage-800 text-white py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +91 98765 43210
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Bangalore, Karnataka
              </span>
            </div>
            <button
              onClick={() => navigate({ to: '/admin' })}
              className="text-forest-200 hover:text-white transition-colors"
            >
              Admin Portal →
            </button>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center shadow-md">
                <img
                  src="/assets/generated/neem-leaf-logo.dim_256x256.png"
                  alt="Bevinamarada Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-forest-800 text-sm leading-tight font-display">Bevinamarada</p>
                <p className="text-xs text-forest-600">Ayurvedic Store</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-forest-700 hover:text-forest-900 hover:bg-forest-50 transition-colors font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-forest-50 transition-colors"
            >
              <Menu className="w-5 h-5 text-forest-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 md:hidden flex flex-col">
            <div className="p-4 border-b border-forest-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-forest-800 font-display">Bevinamarada</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-forest-50 transition-colors"
              >
                <X className="w-5 h-5 text-forest-700" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-forest-700 hover:text-forest-900 hover:bg-forest-50 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); navigate({ to: '/admin' }); }}
                className="w-full text-left px-4 py-3 rounded-xl text-forest-600 hover:text-forest-900 hover:bg-forest-50 transition-colors font-medium text-sm"
              >
                Admin Portal →
              </button>
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-forest-900 to-sage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center">
                  <img src="/assets/generated/neem-leaf-logo.dim_256x256.png" alt="Logo" className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <p className="font-bold text-white font-display">Bevinamarada</p>
                  <p className="text-xs text-forest-300">Ayurvedic Store</p>
                </div>
              </div>
              <p className="text-forest-300 text-sm leading-relaxed">
                Your trusted source for authentic Ayurvedic medicines and natural wellness products.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-forest-300 hover:text-saffron-300 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Contact Us</h3>
              <div className="space-y-2 text-forest-300 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-saffron-400" />
                  +91 98765 43210
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-saffron-400" />
                  Bangalore, Karnataka
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-forest-700/50 mt-8 pt-6 text-center text-forest-400 text-sm">
            <p>
              © {new Date().getFullYear()} Bevinamarada Ayurvedic Store. Built with{' '}
              <span className="text-red-400">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'bevinamarada-ayurvedic')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron-400 hover:text-saffron-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
