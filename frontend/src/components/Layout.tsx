import { Link } from '@tanstack/react-router';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sage-50 to-white">
      <header className="sticky top-0 z-50 bg-sage-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Leaf className="h-8 w-8 text-sage-200" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Bevinamarada</span>
                <span className="text-xs text-sage-200">Ayurvedic Store</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium hover:text-sage-200 transition-colors"
                activeProps={{ className: 'text-sage-200' }}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium hover:text-sage-200 transition-colors"
                activeProps={{ className: 'text-sage-200' }}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-sage-200 transition-colors"
                activeProps={{ className: 'text-sage-200' }}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-sage-200 transition-colors"
                activeProps={{ className: 'text-sage-200' }}
              >
                Contact
              </Link>
              {isAuthenticated && isAdmin && (
                <Link to="/admin">
                  <Button variant="secondary" size="sm">
                    Admin Panel
                  </Button>
                </Link>
              )}
            </nav>

            <button
              className="md:hidden p-2 hover:bg-sage-700 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-sage-700">
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="px-4 py-2 hover:bg-sage-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-sage-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 hover:bg-sage-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 hover:bg-sage-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {isAuthenticated && isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-sage-600 hover:bg-sage-500 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-earth-900 text-earth-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-sage-400" />
                <span className="font-bold text-lg">Bevinamarada Ayurvedic Store</span>
              </div>
              <p className="text-sm text-earth-300">
                Authentic Ayurvedic medicines and wellness products for your health and well-being.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/" className="hover:text-sage-400 transition-colors">
                  Home
                </Link>
                <Link to="/products" className="hover:text-sage-400 transition-colors">
                  Products
                </Link>
                <Link to="/about" className="hover:text-sage-400 transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="hover:text-sage-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="text-sm text-earth-300 space-y-2">
                <p>Phone: +91 98765 43210</p>
                <p>Email: info@bevinamarada.com</p>
                <p>Open: Mon-Sat, 9 AM - 8 PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-earth-800 mt-8 pt-6 text-center text-sm text-earth-400">
            <p>
              © {new Date().getFullYear()} Bevinamarada Ayurvedic Store. All rights reserved. | Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'bevinamarada-ayurvedic-store'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sage-400 transition-colors"
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
