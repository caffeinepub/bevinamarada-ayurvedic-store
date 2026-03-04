import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronRight,
  LayoutDashboard,
  Leaf,
  Lock,
  PackageSearch,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import React from "react";
import TrendingProducts from "../components/TrendingProducts";

const stats = [
  { label: "Years of Trust", value: "25+" },
  { label: "Ayurvedic Products", value: "500+" },
  { label: "Happy Customers", value: "10,000+" },
  { label: "Expert Consultations", value: "5,000+" },
];

const features = [
  {
    icon: Shield,
    title: "Authentic Products",
    description:
      "All our products are sourced directly from certified Ayurvedic manufacturers and verified for quality.",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "We stock only natural, herbal, and organic products free from harmful chemicals and additives.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery to your doorstep across Karnataka and neighboring states.",
  },
  {
    icon: Star,
    title: "Expert Guidance",
    description:
      "Our trained staff provides personalized guidance to help you choose the right products.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    text: "Excellent quality Ayurvedic products. The staff is very knowledgeable and helpful. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Mysore",
    text: "I have been buying from Bevinamarada store for years. Always authentic products at fair prices.",
    rating: 5,
  },
  {
    name: "Anitha Rao",
    location: "Hubli",
    text: "Great selection of herbal medicines. The online enquiry system makes it very convenient.",
    rating: 5,
  },
];

const adminFeatures = [
  {
    icon: PackageSearch,
    title: "Stock Management",
    description:
      "Track inventory levels, set low-stock alerts, and manage product listings with ease.",
    accent: "bg-forest/10 text-forest",
    border: "border-forest/20",
  },
  {
    icon: BarChart3,
    title: "Sales Reports",
    description:
      "View daily, monthly, and per-product sales analytics with downloadable PDF reports.",
    accent: "bg-gold/10 text-gold-dark",
    border: "border-gold/20",
  },
  {
    icon: Users,
    title: "Customer Management",
    description:
      "Manage customer profiles, track repeat buyers, and record enquiry history.",
    accent: "bg-sage/10 text-sage-dark",
    border: "border-sage/20",
  },
  {
    icon: TrendingUp,
    title: "Income Tracking",
    description:
      "Monitor revenue streams, today's earnings, and monthly income at a glance.",
    accent: "bg-forest/10 text-forest",
    border: "border-forest/20",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── Admin Portal Section ── */}
      <section className="relative overflow-hidden bg-forest-dark py-20">
        {/* Decorative leaf-pattern background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('/assets/generated/leaf-pattern-bg.dim_400x400.png')",
            backgroundSize: "320px 320px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-medium text-gold-light mb-5">
              <Lock className="w-4 h-4" />
              Restricted Access
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Admin <span className="text-gold">Portal</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              A powerful management suite built for store owners — monitor
              stock, track sales, manage customers, and gain full visibility
              into your business performance.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {adminFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold-light group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-base mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feat.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider with dashboard icon */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
              <LayoutDashboard className="w-4 h-4 text-gold" />
              <span className="text-white/60 text-xs font-medium tracking-wide uppercase">
                Dashboard Access
              </span>
            </div>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Checklist + CTA */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-white/5 border border-white/10 rounded-2xl px-8 py-8">
            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {[
                "Real-time stock level monitoring",
                "Daily & monthly sales analytics",
                "Low-stock & expiry alerts",
                "Customer enquiry management",
                "Trending product controls",
                "Downloadable PDF reports",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 lg:items-end">
              <p className="text-white/50 text-sm text-center lg:text-right max-w-xs">
                Authorized personnel only. Use your admin credentials to access
                the management dashboard.
              </p>
              <Link
                to="/admin-login"
                className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-forest-dark font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5 text-base"
              >
                <Lock className="w-5 h-5" />
                Admin Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero min-h-[520px] flex items-center">
        {/* Background overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('/assets/generated/herbal-background.dim_1920x1080.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Authentic Ayurvedic Store
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Nature's Healing,{" "}
                <span className="text-gold-light">Delivered to You</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                Discover the power of authentic Ayurvedic medicines and natural
                health products. Trusted by thousands of families across
                Karnataka for over 25 years.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-forest font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors shadow-lg"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-white/10 flex items-center justify-center">
                  <img
                    src="/assets/generated/neem-hero.dim_1200x600.png"
                    alt="Ayurvedic herbs"
                    className="w-72 h-72 object-cover rounded-full shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gold rounded-xl px-4 py-3 shadow-gold">
                  <div className="text-white font-bold text-lg leading-none">
                    25+
                  </div>
                  <div className="text-white/80 text-xs">Years of Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-2xl text-forest">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <TrendingProducts />

      {/* Features */}
      <section className="py-16 bg-sage-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-forest mb-3">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are committed to providing the highest quality Ayurvedic
              products with exceptional service.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow border border-border/50 text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4 group-hover:bg-forest transition-colors">
                    <Icon className="w-6 h-6 text-forest group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-forest mb-3">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Trusted by thousands of families across Karnataka
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-sage-light/30 rounded-xl p-6 border border-border/50 hover:shadow-card transition-shadow"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }, (_, i) => String(i)).map(
                    (k) => (
                      <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                    ),
                  )}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-forest py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Browse our extensive collection of authentic Ayurvedic products or
            contact us for personalized guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-forest font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors shadow-lg"
            >
              View Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
