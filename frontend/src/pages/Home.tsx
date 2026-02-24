import { Link } from '@tanstack/react-router';
import { Phone, MessageCircle, Leaf, ShieldCheck, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const phoneNumber = '+919876543210';
  const whatsappNumber = '919876543210';

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-20 lg:py-32"
        style={{
          backgroundImage: 'url(/assets/generated/neem-hero.dim_1200x600.png)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(34, 84, 61, 0.85)',
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="h-12 w-12 text-sage-200" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Bevinamarada Ayurvedic Store
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-sage-100">
              Your Trusted Source for Authentic Ayurvedic Medicines
            </p>
            <p className="text-lg mb-10 text-sage-200 max-w-2xl mx-auto">
              Experience the healing power of nature with our carefully curated selection of traditional Ayurvedic
              remedies and wellness products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${phoneNumber}`}>
                <Button size="lg" className="bg-white text-sage-800 hover:bg-sage-100 w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-earth-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              We are committed to providing authentic Ayurvedic products that promote natural healing and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-sage-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-sage-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-earth-900">100% Authentic</h3>
                <p className="text-earth-600">
                  All our products are sourced from certified Ayurvedic manufacturers and verified for authenticity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sage-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-sage-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-earth-900">Expert Guidance</h3>
                <p className="text-earth-600">
                  Our knowledgeable staff provides personalized recommendations based on traditional Ayurvedic
                  principles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sage-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-sage-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-earth-900">Customer Care</h3>
                <p className="text-earth-600">
                  We prioritize your health and satisfaction with dedicated customer support and quality service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sage-700 to-sage-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Explore Our Products</h2>
          <p className="text-lg mb-8 text-sage-100 max-w-2xl mx-auto">
            Browse our extensive collection of Ayurvedic medicines, herbs, and wellness products.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-sage-800 hover:bg-sage-100">
              View Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
