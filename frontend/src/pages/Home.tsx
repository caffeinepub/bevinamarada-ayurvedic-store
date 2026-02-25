import { Link } from '@tanstack/react-router';
import { Leaf, Shield, Award, Phone, Zap, ArrowRight, Star } from 'lucide-react';
import TrendingProducts from '../components/TrendingProducts';

export default function Home() {
  return (
    <div className="bg-neon-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-grid-neon">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green opacity-5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green opacity-3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 mb-6">
            <Leaf className="w-3.5 h-3.5 text-neon-green" />
            <span className="text-xs font-mono text-neon-green tracking-widest">PURE AYURVEDIC WELLNESS</span>
          </div>

          {/* Heading */}
          <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">BEVINAMARADA</span>
            <br />
            <span className="gradient-text-neon neon-text-glow">AYURVEDIC STORE</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-rajdhani leading-relaxed">
            Discover the ancient wisdom of Ayurveda. Premium herbal products crafted with nature's finest ingredients for your holistic wellness journey.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 neon-btn-solid rounded-md font-orbitron text-sm font-bold tracking-wider"
            >
              EXPLORE PRODUCTS
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 neon-btn rounded-md font-orbitron text-sm font-bold tracking-wider"
            >
              CONTACT US
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Products' },
              { value: '10K+', label: 'Customers' },
              { value: '15+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-orbitron text-2xl font-black text-neon-green neon-text-sm">{stat.value}</p>
                <p className="text-xs text-gray-500 font-mono mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-neon-green to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-y border-neon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Certified Quality',
                desc: 'All products are certified and tested for purity and potency.',
              },
              {
                icon: Leaf,
                title: '100% Natural',
                desc: 'Sourced from the finest natural ingredients with no harmful additives.',
              },
              {
                icon: Award,
                title: 'Expert Formulations',
                desc: 'Crafted by experienced Ayurvedic practitioners and herbalists.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="neon-card rounded-lg p-6 text-center group hover:neon-glow-sm transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-neon-green/30 bg-neon-green/5 mb-4 group-hover:border-neon-green transition-colors">
                    <Icon className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3 className="font-orbitron text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-rajdhani leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 mb-4">
              <Star className="w-3 h-3 text-neon-green" />
              <span className="text-xs font-mono text-neon-green tracking-widest">POPULAR NOW</span>
            </div>
            <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-3">
              TRENDING PRODUCTS
            </h2>
            <p className="text-gray-500 font-rajdhani max-w-xl mx-auto">
              Our most sought-after Ayurvedic remedies and wellness products.
            </p>
          </div>
          <TrendingProducts />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-neon-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="neon-card rounded-xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-neon opacity-50" />
            <div className="relative z-10">
              <Zap className="w-10 h-10 text-neon-green mx-auto mb-4 animate-pulse-glow" />
              <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-4">
                START YOUR WELLNESS JOURNEY
              </h2>
              <p className="text-gray-400 font-rajdhani text-lg mb-8 max-w-xl mx-auto">
                Connect with our Ayurvedic experts and discover the perfect products for your health goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 neon-btn-solid rounded-md font-orbitron text-sm font-bold tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  GET IN TOUCH
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-3.5 neon-btn rounded-md font-orbitron text-sm font-bold tracking-wider"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
