import { Leaf, Heart, Star, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-800 to-sage-800 text-white py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/leaf-pattern-bg.dim_400x400.png)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center shadow-xl">
            <img src="/assets/generated/neem-leaf-logo.dim_256x256.png" alt="Logo" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-display">About Bevinamarada</h1>
          <p className="text-xl text-forest-200 max-w-2xl mx-auto">
            Rooted in tradition, committed to your wellness journey
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-forest-800 mb-6 font-display">Our Story</h2>
              <p className="text-forest-600 mb-4 leading-relaxed">
                Bevinamarada Ayurvedic Store was founded with a deep passion for traditional Indian medicine
                and a commitment to making authentic Ayurvedic products accessible to everyone.
              </p>
              <p className="text-forest-600 mb-4 leading-relaxed">
                The name "Bevinamarada" (ಬೇವಿನಮರದ) means "Neem Tree" in Kannada — a symbol of healing,
                purity, and natural wellness that has been revered in Ayurveda for thousands of years.
              </p>
              <p className="text-forest-600 leading-relaxed">
                We source our products directly from certified organic farms and work closely with
                traditional Ayurvedic practitioners to ensure authenticity and quality.
              </p>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/mortar-pestle.dim_800x600.png"
                alt="Ayurvedic preparation"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-saffron-400 to-gold-500 rounded-xl p-4 shadow-lg">
                <p className="text-white font-bold text-lg">25+ Years</p>
                <p className="text-white/80 text-sm">of Ayurvedic Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-forest-800 text-center mb-12 font-display">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Natural', desc: 'Only pure, natural ingredients sourced ethically', color: 'from-forest-500 to-sage-600' },
              { icon: Heart, title: 'Compassion', desc: 'We care deeply about your health and wellbeing', color: 'from-coral-500 to-saffron-500' },
              { icon: Star, title: 'Quality', desc: 'Uncompromising standards in every product', color: 'from-saffron-500 to-gold-500' },
              { icon: Users, title: 'Community', desc: 'Building a healthier community together', color: 'from-teal-500 to-forest-600' },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6 rounded-2xl bg-forest-50 border border-forest-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-forest-800 mb-2 font-display">{value.title}</h3>
                  <p className="text-forest-600 text-sm">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ayurveda Section */}
      <section className="py-16 bg-gradient-to-br from-forest-800 to-sage-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-display">What is Ayurveda?</h2>
            <p className="text-forest-200 mb-6 leading-relaxed text-lg">
              Ayurveda is one of the world's oldest holistic healing systems, developed more than 3,000 years ago
              in India. It's based on the belief that health and wellness depend on a delicate balance between
              the mind, body, and spirit.
            </p>
            <p className="text-forest-200 leading-relaxed">
              The word "Ayurveda" is derived from the Sanskrit words "ayur" (life) and "veda" (science or knowledge).
              Thus, Ayurveda translates to "knowledge of life." At Bevinamarada, we bring this ancient wisdom
              to your doorstep through carefully selected, authentic products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
