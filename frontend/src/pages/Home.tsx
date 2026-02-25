import { Link } from '@tanstack/react-router';
import { Leaf, Shield, Award, Phone, ArrowRight, Sparkles } from 'lucide-react';
import TrendingProducts from '../components/TrendingProducts';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-700 to-sage-800 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/herbal-background.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-saffron-300" />
              <span className="text-saffron-300 font-medium text-sm">Authentic Ayurvedic Wellness</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight font-display">
              Nature's Healing
              <span className="block text-saffron-300">Wisdom</span>
            </h1>
            <p className="text-lg text-forest-200 mb-8 leading-relaxed">
              Discover the ancient power of Ayurveda with our carefully curated collection of
              authentic herbs, oils, and natural remedies from Bevinamarada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Enquire Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <TrendingProducts />

      {/* Trust Indicators */}
      <section className="py-16 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-forest-800 mb-2 font-display">100% Natural</h3>
              <p className="text-forest-600 text-sm">All products sourced from certified organic farms and traditional Ayurvedic practitioners.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-saffron-500 to-gold-500 flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-forest-800 mb-2 font-display">Quality Assured</h3>
              <p className="text-forest-600 text-sm">Every product undergoes rigorous quality checks to ensure purity and potency.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-forest-600 flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-forest-800 mb-2 font-display">Expert Guidance</h3>
              <p className="text-forest-600 text-sm">Our Ayurvedic experts are available to guide you to the right products for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-forest-800 to-sage-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">Ready to Start Your Wellness Journey?</h2>
          <p className="text-forest-200 mb-8 max-w-xl mx-auto">
            Contact us today to learn more about our products and how Ayurveda can transform your health.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
