import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Package, Phone } from "lucide-react";
import React from "react";

export default function Products() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium text-white mb-6">
            <Leaf className="w-4 h-4" />
            Our Collection
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Ayurvedic Products
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Explore our curated collection of authentic Ayurvedic medicines and
            natural health products.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 bg-sage-light/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-forest" />
          </div>
          <h2 className="font-display text-3xl font-bold text-forest mb-4">
            Full Catalog Coming Soon
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            We're currently building our online product catalog. In the
            meantime, please contact us directly to enquire about specific
            products or to place an order.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-forest text-white font-semibold px-6 py-3 rounded-lg hover:bg-forest-dark transition-colors shadow-pharma"
            >
              <Phone className="w-4 h-4" />
              Contact for Enquiry
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-forest/30 text-forest font-semibold px-6 py-3 rounded-lg hover:bg-sage-light transition-colors"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
