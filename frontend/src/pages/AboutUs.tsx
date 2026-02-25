import React from 'react';
import { Leaf, Shield, Heart, Star } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: 'var(--forest-green)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <Leaf size={48} className="mx-auto mb-6" style={{ color: 'var(--gold-accent)' }} />
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--warm-cream)' }}>
            About Bevinamarada
          </h1>
          <p className="text-lg opacity-90" style={{ color: 'var(--warm-cream)' }}>
            Authentic Ayurvedic Store — Rooted in Nature, Trusted by Tradition
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--forest-green)' }}>
                Our Story
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--earthy-brown)' }}>
                Bevinamarada Ayurvedic Store was founded with a simple yet profound mission: 
                to make authentic Ayurvedic remedies accessible to everyone. Our journey began 
                in the heart of Karnataka, inspired by the ancient healing traditions passed down 
                through generations.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--earthy-brown)' }}>
                We believe that true wellness comes from nature. Every product in our store is 
                carefully sourced, tested, and prepared according to classical Ayurvedic principles, 
                ensuring you receive the purest form of nature's medicine.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-warm-lg">
              <img
                src="/assets/generated/mortar-pestle.dim_800x600.png"
                alt="Ayurvedic preparation"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="p-6" style={{ backgroundColor: 'var(--forest-green)' }}>
                <p className="font-display text-lg font-semibold text-center" style={{ color: 'var(--gold-accent)' }}>
                  "Nature is the best physician"
                </p>
                <p className="text-sm text-center mt-1 opacity-80" style={{ color: 'var(--warm-cream)' }}>
                  — Ancient Ayurvedic Wisdom
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neem Identity */}
      <section className="py-16" style={{ backgroundColor: 'var(--warm-cream-dark)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--forest-green)' }}>
              The Neem (Bevinamarada) Identity
            </h2>
            <p className="text-base" style={{ color: 'var(--earthy-brown)' }}>
              Why we chose the sacred Neem tree as our symbol
            </p>
          </div>

          <div className="ayurvedic-card p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-gold" style={{ borderColor: 'var(--gold-accent)' }}>
                  <img
                    src="/assets/generated/neem-leaf-icon.dim_64x64.png"
                    alt="Neem leaf"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      el.parentElement!.style.backgroundColor = 'var(--forest-green)';
                      el.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8922A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>';
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'var(--forest-green)' }}>
                  Neem — The Village Pharmacy
                </h3>
                <p className="text-base leading-relaxed mb-3" style={{ color: 'var(--earthy-brown)' }}>
                  In Kannada, Neem is called <strong>Bevinamarada</strong> (ಬೇವಿನಮರ). For thousands of years, 
                  this remarkable tree has been called the "village pharmacy" in India. Every part of the Neem 
                  tree — leaves, bark, seeds, and roots — has medicinal properties documented in ancient Ayurvedic texts.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--earthy-brown)' }}>
                  We chose Bevinamarada as our store's identity because it represents everything we stand for: 
                  natural healing, accessibility, and the timeless wisdom of Ayurveda. Just as the Neem tree 
                  serves every community, we aim to serve every family with authentic, affordable Ayurvedic care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: 'var(--forest-green)' }}>
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: 'Quality Assurance', desc: 'Every product undergoes rigorous quality checks before reaching you.' },
              { icon: Leaf, title: 'Natural Sourcing', desc: 'We source directly from certified organic farms and trusted suppliers.' },
              { icon: Heart, title: 'Community Care', desc: 'We believe in making Ayurvedic wellness accessible to all.' },
              { icon: Star, title: 'Authentic Formulations', desc: 'Our products follow classical Ayurvedic recipes without compromise.' },
            ].map((val, i) => (
              <div key={i} className="ayurvedic-card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--forest-green)' }}>
                  <val.icon size={22} style={{ color: 'var(--gold-accent)' }} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--forest-green)' }}>
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--earthy-brown)' }}>
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
