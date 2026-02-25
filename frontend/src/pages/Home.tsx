import React from 'react';
import { Link } from '@tanstack/react-router';
import { Leaf, Shield, Star, Phone, ChevronRight, Droplets, Flower2, Pill } from 'lucide-react';

const categories = [
  { icon: Droplets, name: 'Herbal Oils', desc: 'Pure cold-pressed oils for wellness', color: '#2D5016' },
  { icon: Leaf, name: 'Herbal Powders', desc: 'Authentic churnas and powders', color: '#6B3A1F' },
  { icon: Pill, name: 'Ayurvedic Tablets', desc: 'Traditional formulations', color: '#C8922A' },
  { icon: Flower2, name: 'Herbal Teas', desc: 'Healing infusions and kadhas', color: '#2D5016' },
];

const trustPoints = [
  { icon: Shield, title: '100% Natural', desc: 'All products are sourced from certified organic farms' },
  { icon: Star, title: 'Authentic Recipes', desc: 'Formulations based on ancient Ayurvedic texts' },
  { icon: Leaf, title: 'Neem Heritage', desc: 'Inspired by the sacred Neem (Bevinamarada) tree' },
];

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center" style={{ backgroundColor: 'var(--forest-green)' }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/hero-banner.dim_1200x400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(45,80,22,0.9) 0%, rgba(107,58,31,0.7) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={20} style={{ color: 'var(--gold-accent)' }} />
              <span className="text-sm font-medium tracking-wider uppercase" style={{ color: 'var(--gold-accent)' }}>
                Authentic Ayurveda
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--warm-cream)' }}>
              Bevinamarada
              <span className="block text-3xl sm:text-4xl mt-2" style={{ color: 'var(--gold-accent)' }}>
                Ayurvedic Store
              </span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 opacity-90" style={{ color: 'var(--warm-cream)' }}>
              Authentic Ayurvedic remedies rooted in centuries of tradition. 
              Bringing nature's healing wisdom — inspired by the sacred Neem tree — to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 shadow-gold"
                style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--warm-cream)' }}
              >
                Contact Us <ChevronRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border-2"
                style={{ borderColor: 'var(--warm-cream)', color: 'var(--warm-cream)' }}
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16" style={{ backgroundColor: 'var(--warm-cream-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--forest-green)' }}>
              Why Choose Bevinamarada?
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--earthy-brown)' }}>
              We are committed to providing the purest, most authentic Ayurvedic products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((point, i) => (
              <div key={i} className="ayurvedic-card p-6 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--forest-green)' }}>
                  <point.icon size={24} style={{ color: 'var(--gold-accent)' }} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--forest-green)' }}>
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--earthy-brown)' }}>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--forest-green)' }}>
              Our Product Range
            </h2>
            <p className="text-base" style={{ color: 'var(--earthy-brown)' }}>
              Carefully curated Ayurvedic products for holistic wellness
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="ayurvedic-card p-6 text-center cursor-pointer group">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon size={24} style={{ color: 'var(--gold-accent)' }} />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--forest-green)' }}>
                  {cat.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--earthy-brown)', opacity: 0.8 }}>
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Message */}
      <section className="py-16" style={{ backgroundColor: 'var(--forest-green)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf size={40} className="mx-auto mb-6" style={{ color: 'var(--gold-accent)' }} />
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--warm-cream)' }}>
            Rooted in Tradition, Trusted by Generations
          </h2>
          <p className="text-base leading-relaxed mb-8 opacity-90" style={{ color: 'var(--warm-cream)' }}>
            The Neem tree — known as Bevinamarada in Kannada — has been the cornerstone of Ayurvedic healing 
            for thousands of years. Our store carries this legacy forward, offering products that honor 
            ancient wisdom while meeting modern quality standards.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--warm-cream)' }}
          >
            <Phone size={18} />
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
