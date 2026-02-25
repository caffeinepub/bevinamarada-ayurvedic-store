import { useState } from 'react';
import { Phone, MapPin, Clock, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-800 to-sage-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Contact Us</h1>
          <p className="text-forest-200 text-lg max-w-xl mx-auto">
            We'd love to hear from you. Reach out for product enquiries, consultations, or any questions.
          </p>
        </div>
      </section>

      <section className="py-16 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-forest-800 mb-6 font-display">Get in Touch</h2>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Phone', value: '+91 98765 43210', color: 'from-forest-500 to-sage-600' },
                    { icon: Mail, label: 'Email', value: 'info@bevinamarada.com', color: 'from-saffron-500 to-gold-500' },
                    { icon: MapPin, label: 'Address', value: 'Bangalore, Karnataka, India', color: 'from-teal-500 to-forest-600' },
                    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9 AM – 7 PM', color: 'from-coral-500 to-saffron-500' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-forest-100 shadow-sm">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-forest-500 font-medium">{item.label}</p>
                          <p className="text-forest-800 font-semibold">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-forest-100 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.99!2d77.35073!3d12.97194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-forest-100">
              <h2 className="text-2xl font-bold text-forest-800 mb-6 font-display">Send an Enquiry</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest-100 flex items-center justify-center">
                    <Send className="w-8 h-8 text-forest-600" />
                  </div>
                  <h3 className="text-xl font-bold text-forest-800 mb-2 font-display">Message Sent!</h3>
                  <p className="text-forest-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-forest-700">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                      className="border-forest-200 focus:border-forest-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-forest-700">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-forest-200 focus:border-forest-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-forest-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="border-forest-200 focus:border-forest-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-forest-700">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your enquiry..."
                      rows={4}
                      required
                      className="border-forest-200 focus:border-forest-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Enquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
