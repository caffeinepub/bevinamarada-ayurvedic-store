import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

function LazyMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-64 rounded-xl overflow-hidden bg-sage-light/50 border border-border/50"
    >
      {visible ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d76.6!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3NsKwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Store Location"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-forest/40" />
            <p className="text-sm">Map loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage for admin to view
    const enquiries = JSON.parse(localStorage.getItem("enquiries") || "[]");
    enquiries.push({
      ...formData,
      date: new Date().toISOString(),
      id: Date.now(),
    });
    localStorage.setItem("enquiries", JSON.stringify(enquiries));
    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", product: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium text-white mb-6">
            <Phone className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Have questions about our products? We're here to help you find the
            right Ayurvedic solution.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-sage-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Store Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-forest mb-6">
                  Store Information
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      value: "Bevinamarada Village, Karnataka, India – 571 xxx",
                    },
                    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "info@bevinamarada.com",
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value:
                        "Monday – Saturday: 9:00 AM – 7:00 PM\nSunday: Closed",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex gap-4 p-4 bg-white rounded-xl border border-border/50 shadow-card"
                    >
                      <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-forest" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {label}
                        </div>
                        <div className="text-muted-foreground text-sm mt-0.5 whitespace-pre-line">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <LazyMap />
            </div>

            {/* Enquiry Form */}
            <div className="bg-white rounded-xl shadow-card border border-border/50 p-6 lg:p-8">
              <h2 className="font-display text-2xl font-bold text-forest mb-2">
                Send an Enquiry
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Fill in the form below and we'll get back to you within 24
                hours.
              </p>

              {submitted && (
                <div className="flex items-center gap-3 bg-sage-light/50 border border-forest/20 rounded-lg p-4 mb-6">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0" />
                  <p className="text-forest text-sm font-medium">
                    Thank you! Your enquiry has been submitted. We'll contact
                    you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                      placeholder="+91 xxxxx xxxxx"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-product"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Product of Interest
                  </label>
                  <input
                    id="contact-product"
                    type="text"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({ ...formData, product: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    placeholder="e.g., Ashwagandha, Triphala..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors resize-none"
                    placeholder="Tell us about your health concern or product query..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-forest text-white font-semibold py-3 rounded-lg hover:bg-forest-dark transition-colors shadow-pharma"
                >
                  <Send className="w-4 h-4" />
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
