import React, { useState, useEffect } from 'react';
import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Menu, X, Phone, Mail, MapPin, Heart } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.005_200)]">
      {/* Top Info Bar */}
      <div className="bg-[oklch(0.45_0.15_195)] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              info@baslpharma.com
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Your trusted pharmaceutical partner
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-[oklch(0.92_0.01_200)]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/generated/pharma-logo.dim_200x60.png"
                alt="BASL Pharma"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'flex items-center gap-2';
                    fallback.innerHTML = `<div class="w-9 h-9 rounded-lg bg-[oklch(0.45_0.15_195)] flex items-center justify-center"><span class="text-white font-bold text-sm">B</span></div><div><p class="font-bold text-[oklch(0.15_0.02_220)] text-base font-heading leading-tight">BASL Pharma</p><p class="text-[oklch(0.5_0.03_200)] text-xs">Healthcare Solutions</p></div>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
              <div className="hidden sm:block">
                <p className="font-bold text-[oklch(0.15_0.02_220)] text-base font-heading leading-tight">BASL Pharma</p>
                <p className="text-[oklch(0.5_0.03_200)] text-xs">Healthcare Solutions</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    currentPath === link.path
                      ? 'bg-[oklch(0.92_0.05_195)] text-[oklch(0.35_0.15_195)]'
                      : 'text-[oklch(0.3_0.03_220)] hover:bg-[oklch(0.95_0.02_200)] hover:text-[oklch(0.35_0.15_195)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[oklch(0.45_0.15_195)] text-white text-sm font-semibold rounded-lg hover:bg-[oklch(0.4_0.15_195)] transition-colors shadow-pharma-sm"
              >
                Get in Touch
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-lg text-[oklch(0.3_0.03_220)] hover:bg-[oklch(0.95_0.02_200)] transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[oklch(0.92_0.01_200)]">
              <span className="font-bold text-[oklch(0.15_0.02_220)] font-heading">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-[oklch(0.95_0.02_200)] text-[oklch(0.3_0.03_220)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPath === link.path
                      ? 'bg-[oklch(0.92_0.05_195)] text-[oklch(0.35_0.15_195)]'
                      : 'text-[oklch(0.25_0.03_220)] hover:bg-[oklch(0.95_0.02_200)]'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-[oklch(0.92_0.01_200)]">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[oklch(0.45_0.15_195)] text-white text-sm font-semibold rounded-lg hover:bg-[oklch(0.4_0.15_195)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[oklch(0.18_0.03_220)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-lg font-heading mb-3">BASL Pharma</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Your trusted pharmaceutical partner providing quality healthcare solutions and medicines.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/60 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-3">Contact</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +91 98765 43210</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@baslpharma.com</li>
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Your City, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <p>© {new Date().getFullYear()} BASL Pharma. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.6_0.1_195)] hover:text-[oklch(0.7_0.1_195)] transition-colors"
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
