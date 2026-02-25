import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission (no backend endpoint for enquiries from public)
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="py-16 text-center" style={{ backgroundColor: 'var(--forest-green)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--warm-cream)' }}>
            Contact Us
          </h1>
          <p className="text-base opacity-90" style={{ color: 'var(--warm-cream)' }}>
            We're here to help with all your Ayurvedic wellness needs
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--forest-green)' }}>
                Get in Touch
              </h2>

              {/* Phone */}
              <div className="ayurvedic-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--forest-green)' }}>
                  <Phone size={22} style={{ color: 'var(--gold-accent)' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--earthy-brown)', opacity: 0.7 }}>Phone</p>
                  <a href="tel:+919876543210" className="font-semibold text-lg hover:underline" style={{ color: 'var(--forest-green)' }}>
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="ayurvedic-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                  <SiWhatsapp size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--earthy-brown)', opacity: 0.7 }}>WhatsApp</p>
                  <a
                    href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20Ayurvedic%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-base hover:underline"
                    style={{ color: '#25D366' }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="ayurvedic-card p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--earthy-brown)' }}>
                  <MapPin size={22} style={{ color: 'var(--gold-accent)' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--earthy-brown)', opacity: 0.7 }}>Address</p>
                  <p className="font-medium" style={{ color: 'var(--forest-green)' }}>
                    Bevinamarada Ayurvedic Store<br />
                    Main Road, Near Temple<br />
                    Karnataka, India — 560001
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="ayurvedic-card p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--gold-accent)' }}>
                  <Clock size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--earthy-brown)', opacity: 0.7 }}>Store Hours</p>
                  <p className="text-sm" style={{ color: 'var(--forest-green)' }}>
                    Mon – Sat: 9:00 AM – 8:00 PM<br />
                    Sunday: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden shadow-warm-lg border-2" style={{ borderColor: 'var(--forest-green)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>
            </div>

            {/* Enquiry Form */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--forest-green)' }}>
                Send an Enquiry
              </h2>

              {submitted ? (
                <div className="ayurvedic-card p-8 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--forest-green)' }}>
                    <Send size={28} style={{ color: 'var(--gold-accent)' }} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>
                    Thank You!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--earthy-brown)' }}>
                    Your enquiry has been received. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ayurvedic-card p-6 space-y-4">
                  {[
                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Enter your full name' },
                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                    { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--forest-green)' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-colors"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'white', color: 'var(--earthy-brown)' }}
                        onFocus={e => e.target.style.borderColor = 'var(--forest-green)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--forest-green)' }}>
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your health concern or product enquiry..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-colors resize-none"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'white', color: 'var(--earthy-brown)' }}
                      onFocus={e => e.target.style.borderColor = 'var(--forest-green)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--forest-green)', color: 'var(--warm-cream)' }}
                  >
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Enquiry</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
