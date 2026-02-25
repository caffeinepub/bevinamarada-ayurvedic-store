import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Leaf, Phone, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--warm-cream)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-warm-lg" style={{ backgroundColor: 'var(--forest-green)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: 'var(--gold-accent)' }}>
                <img
                  src="/assets/generated/neem-leaf-logo.dim_256x256.png"
                  alt="Bevinamarada Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="font-display font-bold text-sm leading-tight" style={{ color: 'var(--warm-cream)' }}>
                  Bevinamarada
                </div>
                <div className="text-xs" style={{ color: 'var(--gold-accent-light)' }}>
                  Ayurvedic Store
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                  style={{ color: 'var(--warm-cream)' }}
                  activeProps={{ style: { color: 'var(--gold-accent)' } }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--warm-cream)' }}
              >
                Admin Login
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--warm-cream)' }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col md:hidden"
          style={{ backgroundColor: 'var(--forest-green-dark)' }}
        >
          {/* Overlay header row: logo + close button */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            {/* Logo in overlay */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: 'var(--gold-accent)' }}
              >
                <img
                  src="/assets/generated/neem-leaf-logo.dim_256x256.png"
                  alt="Bevinamarada Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="font-display font-bold text-sm leading-tight" style={{ color: 'var(--warm-cream)' }}>
                  Bevinamarada
                </div>
                <div className="text-xs" style={{ color: 'var(--gold-accent-light)' }}>
                  Ayurvedic Store
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-2 rounded-full transition-colors"
              style={{ color: 'var(--warm-cream)', backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links — vertically centered */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="w-full max-w-xs text-center px-6 py-4 rounded-xl text-lg font-semibold transition-colors duration-200"
                style={{ color: 'var(--warm-cream)', backgroundColor: 'rgba(255,255,255,0.07)' }}
                activeProps={{ style: { color: 'var(--gold-accent)', backgroundColor: 'rgba(255,255,255,0.12)' } }}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-full max-w-xs my-2" style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

            {/* Admin Login */}
            <Link
              to="/admin"
              className="w-full max-w-xs text-center px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--warm-cream)' }}
              onClick={closeMobileMenu}
            >
              Admin Login
            </Link>
          </div>

          {/* Footer hint */}
          <div
            className="flex items-center justify-center gap-2 py-6 text-sm opacity-50 flex-shrink-0"
            style={{ color: 'var(--warm-cream)' }}
          >
            <Leaf size={14} />
            <span>Bevinamarada Ayurvedic Store</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--forest-green-dark)', color: 'var(--warm-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Leaf size={24} style={{ color: 'var(--gold-accent)' }} />
                <span className="font-display font-bold text-lg">Bevinamarada</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Authentic Ayurvedic remedies rooted in centuries of tradition. 
                Bringing nature's healing wisdom to your doorstep.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-semibold text-base mb-4" style={{ color: 'var(--gold-accent)' }}>
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
                <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-semibold text-base mb-4" style={{ color: 'var(--gold-accent)' }}>
                Contact Us
              </h3>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <a href="tel:+919876543210" className="hover:opacity-100">+91 98765 43210</a>
                </div>
                <div className="flex items-center gap-2">
                  <SiWhatsapp size={14} />
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                    WhatsApp Chat
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Bevinamarada Road, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-60" style={{ borderColor: 'var(--forest-green-light)' }}>
            <span>© {new Date().getFullYear()} Bevinamarada Ayurvedic Store. All rights reserved.</span>
            <span>
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'bevinamarada-ayurvedic')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
