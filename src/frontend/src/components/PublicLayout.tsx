import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Clock, Leaf, MapPin, Menu, Phone, X } from "lucide-react";
import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top info bar */}
      <div className="bg-forest text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              Bevinamarada, Karnataka
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Mon–Sat: 9:00 AM – 7:00 PM
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center shadow-pharma group-hover:shadow-lg transition-shadow">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-forest text-base leading-tight">
                  Bevinamarada
                </div>
                <div className="text-xs text-sage-dark font-medium leading-tight">
                  Ayurvedic Store
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-forest text-white shadow-sm"
                      : "text-foreground/70 hover:text-forest hover:bg-sage-light"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-forest hover:bg-sage-light transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-forest text-sm leading-tight">
                  Bevinamarada
                </div>
                <div className="text-xs text-sage-dark leading-tight">
                  Ayurvedic Store
                </div>
              </div>
            </div>
            <button
              type="button"
              className="p-2 rounded-lg text-forest hover:bg-sage-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-4 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-forest text-white shadow-pharma"
                    : "text-foreground hover:bg-sage-light hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-8 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              +91 98765 43210
            </p>
          </div>
        </div>
      )}

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-base leading-tight">
                    Bevinamarada
                  </div>
                  <div className="text-xs text-white/70 leading-tight">
                    Ayurvedic Store
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Your trusted source for authentic Ayurvedic medicines and
                natural health products.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-heading font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-white mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  Bevinamarada Village, Karnataka, India
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  Mon–Sat: 9:00 AM – 7:00 PM
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} Bevinamarada Ayurvedic Store. All
              rights reserved.
            </p>
            <p>
              Built with <span className="text-gold">♥</span> using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "bevinamarada-ayurvedic")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white underline transition-colors"
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
