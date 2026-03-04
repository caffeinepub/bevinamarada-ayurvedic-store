import { Award, CheckCircle, Heart, Leaf, Users } from "lucide-react";
import React from "react";

const values = [
  {
    icon: Leaf,
    title: "Natural & Pure",
    description:
      "We source only the finest natural ingredients, ensuring every product meets the highest standards of purity.",
    color: "bg-sage-light text-forest",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description:
      "All products are certified by recognized Ayurvedic authorities and undergo rigorous quality checks.",
    color: "bg-gold-light text-gold-dark",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We are deeply rooted in our community, serving generations of families with trusted healthcare solutions.",
    color: "bg-sage-light text-forest",
  },
  {
    icon: Heart,
    title: "Holistic Wellness",
    description:
      "We believe in treating the whole person — body, mind, and spirit — through the wisdom of Ayurveda.",
    color: "bg-gold-light text-gold-dark",
  },
];

const milestones = [
  {
    year: "1999",
    event:
      "Founded in Bevinamarada village with a small collection of herbal medicines",
  },
  {
    year: "2005",
    event:
      "Expanded product range to over 200 authentic Ayurvedic formulations",
  },
  {
    year: "2012",
    event:
      "Received certification from Karnataka Ayurvedic Medical Association",
  },
  { year: "2018", event: "Launched home delivery service across Karnataka" },
  {
    year: "2024",
    event: "Serving 10,000+ satisfied customers with 500+ products",
  },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Our Story
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
                25 Years of Healing with Nature
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Bevinamarada Ayurvedic Store has been a trusted name in natural
                healthcare since 1999. We are committed to bringing the ancient
                wisdom of Ayurveda to modern families.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center shadow-2xl">
                  <Leaf className="w-32 h-32 text-white/60" />
                </div>
                <div className="absolute -top-4 -right-4 bg-gold rounded-xl px-4 py-3 shadow-gold">
                  <div className="text-white font-bold text-xl leading-none">
                    25+
                  </div>
                  <div className="text-white/80 text-xs">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-forest mb-6">
                Our Journey
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Founded in 1999 by a family passionate about traditional
                medicine, Bevinamarada Ayurvedic Store began as a small shop in
                the heart of our village. Over the decades, we have grown into
                one of the most trusted Ayurvedic stores in the region.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Our founder believed that nature holds the cure for most
                ailments, and this philosophy continues to guide everything we
                do. We work directly with certified manufacturers and farmers to
                ensure the authenticity and quality of every product we stock.
              </p>
              <div className="space-y-3">
                {[
                  "Certified Ayurvedic products only",
                  "Direct sourcing from manufacturers",
                  "Expert staff guidance",
                  "Competitive pricing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-forest shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground text-lg mb-4">
                Our Milestones
              </h3>
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="font-semibold text-forest text-sm">
                      {m.year}
                    </div>
                    <div className="text-foreground/70 text-sm mt-0.5">
                      {m.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sage-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-forest mb-3">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These principles guide every decision we make and every product we
              offer.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow border border-border/50 text-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
