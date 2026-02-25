import React from 'react';
import { Link } from '@tanstack/react-router';
import { Shield, Truck, Award, Phone, ChevronRight, Star, CheckCircle, Users, Package, TrendingUp } from 'lucide-react';
import TrendingProducts from '../components/TrendingProducts';

const stats = [
  { label: 'Products Available', value: '5000+', icon: Package },
  { label: 'Happy Customers', value: '10,000+', icon: Users },
  { label: 'Years of Service', value: '15+', icon: Award },
  { label: 'Daily Orders', value: '500+', icon: TrendingUp },
];

const features = [
  {
    icon: Shield,
    title: 'Genuine Medicines',
    description: 'All products are sourced directly from certified manufacturers ensuring 100% authenticity.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery to your doorstep with real-time tracking.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Every product undergoes strict quality checks before reaching our shelves.',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Our pharmacists are available round the clock for expert medical guidance.',
  },
];

const testimonials = [
  { name: 'Priya Sharma', rating: 5, text: 'Excellent service and genuine medicines. Highly recommended!' },
  { name: 'Rajesh Kumar', rating: 5, text: 'Fast delivery and great customer support. My go-to pharmacy.' },
  { name: 'Anita Patel', rating: 5, text: 'Very professional staff and quality products at reasonable prices.' },
];

export default function Home() {
  return (
    <div className="bg-[oklch(0.98_0.005_200)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="relative min-h-[520px] flex items-center"
          style={{
            backgroundImage: 'url(/assets/generated/pharma-hero-bg.dim_1440x600.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.04_220)]/90 via-[oklch(0.25_0.06_210)]/75 to-[oklch(0.35_0.1_195)]/50" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium mb-6 border border-white/20">
                <CheckCircle className="w-3.5 h-3.5 text-[oklch(0.7_0.15_155)]" />
                Trusted Pharmaceutical Partner Since 2009
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading leading-tight mb-4">
                Your Health,<br />
                <span className="text-[oklch(0.75_0.15_155)]">Our Priority</span>
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Quality medicines, expert guidance, and reliable healthcare solutions — all in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-all shadow-pharma hover:shadow-pharma-lg"
                >
                  Browse Products
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold rounded-lg transition-all border border-white/30"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[oklch(0.45_0.15_195)] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-white/70" />
                  <p className="text-2xl font-bold font-heading">{stat.value}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[oklch(0.15_0.02_220)] font-heading mb-3">Why Choose BASL Pharma?</h2>
            <p className="text-[oklch(0.5_0.03_200)] max-w-xl mx-auto">
              We are committed to providing the highest quality pharmaceutical products and services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-[oklch(0.98_0.005_200)] rounded-xl border border-[oklch(0.92_0.01_200)] hover:shadow-card-hover hover:border-[oklch(0.85_0.05_195)] transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.05_195)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.45_0.15_195)] transition-colors">
                    <Icon className="w-6 h-6 text-[oklch(0.45_0.15_195)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-[oklch(0.15_0.02_220)] mb-2 font-heading">{feature.title}</h3>
                  <p className="text-[oklch(0.5_0.03_200)] text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-[oklch(0.97_0.01_200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[oklch(0.15_0.02_220)] font-heading mb-3">Trending Products</h2>
            <p className="text-[oklch(0.5_0.03_200)]">Most popular medicines and healthcare products</p>
          </div>
          <TrendingProducts />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[oklch(0.15_0.02_220)] font-heading mb-3">What Our Customers Say</h2>
            <p className="text-[oklch(0.5_0.03_200)]">Trusted by thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 bg-[oklch(0.98_0.005_200)] rounded-xl border border-[oklch(0.92_0.01_200)] shadow-card">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[oklch(0.7_0.15_75)] fill-[oklch(0.7_0.15_75)]" />
                  ))}
                </div>
                <p className="text-[oklch(0.3_0.03_220)] text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-semibold text-[oklch(0.15_0.02_220)] text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(0.45_0.15_195)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-heading mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Contact us today for all your pharmaceutical needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[oklch(0.35_0.15_195)] font-bold rounded-lg hover:bg-[oklch(0.95_0.02_200)] transition-all shadow-lg"
          >
            Contact Us Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
