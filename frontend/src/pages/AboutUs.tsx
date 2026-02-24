import { Leaf, Award, Users, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-earth-900 mb-4">About Us</h1>
        <p className="text-lg text-earth-600 max-w-2xl mx-auto">
          Learn about our journey in bringing authentic Ayurvedic wellness to our community
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/assets/generated/mortar-pestle.dim_800x600.png"
          alt="Traditional Ayurvedic Medicine"
          className="w-full h-64 lg:h-96 object-cover"
        />
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-earth-900 mb-6 flex items-center gap-3">
            <Leaf className="h-8 w-8 text-sage-700" />
            Our Story
          </h2>
          <div className="prose prose-lg text-earth-700 space-y-4">
            <p>
              Bevinamarada Ayurvedic Store was founded with a vision to make authentic Ayurvedic medicines accessible to
              everyone. The name "Bevinamarada" comes from the Neem tree (Azadirachta indica), known as "Bevu" in
              Kannada, which symbolizes healing and purification in Ayurvedic tradition.
            </p>
            <p>
              For years, we have been serving our community with genuine Ayurvedic products sourced from trusted
              manufacturers. Our commitment to quality and authenticity has made us a trusted name in traditional
              medicine.
            </p>
            <p>
              We believe in the ancient wisdom of Ayurveda and its holistic approach to health and wellness. Every
              product in our store is carefully selected to ensure it meets the highest standards of purity and
              effectiveness.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-earth-900 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-sage-200">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-earth-900">Authenticity</h3>
              <p className="text-sm text-earth-600">100% genuine Ayurvedic products from certified sources</p>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-earth-900">Quality</h3>
              <p className="text-sm text-earth-600">Rigorous quality checks on every product we sell</p>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-earth-900">Expertise</h3>
              <p className="text-sm text-earth-600">Knowledgeable staff with deep Ayurvedic understanding</p>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-earth-900">Care</h3>
              <p className="text-sm text-earth-600">Personalized service and genuine care for your health</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Ayurveda */}
      <section className="bg-sage-50 rounded-2xl p-8 lg:p-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-earth-900 mb-6">What is Ayurveda?</h2>
          <div className="prose prose-lg text-earth-700 space-y-4">
            <p>
              Ayurveda is an ancient system of medicine that originated in India over 5,000 years ago. The word
              "Ayurveda" comes from Sanskrit: "Ayur" meaning life and "Veda" meaning knowledge or science.
            </p>
            <p>
              This holistic healing system focuses on maintaining balance between the body, mind, and spirit to prevent
              illness and promote overall wellness. Ayurveda uses natural herbs, minerals, and lifestyle practices to
              restore harmony and health.
            </p>
            <p>
              At Bevinamarada Ayurvedic Store, we honor this ancient tradition by providing authentic Ayurvedic
              medicines that have been used for centuries to treat various ailments and promote natural healing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
