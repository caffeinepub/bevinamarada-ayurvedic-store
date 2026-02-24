import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddEnquiry } from '../hooks/useQueries';
import { useState } from 'react';

export default function Contact() {
  const addEnquiry = useAddEnquiry();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const phoneNumber = '+919876543210';
  const whatsappNumber = '919876543210';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', phone: '', message: '' });
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-earth-900 mb-4">Contact Us</h1>
        <p className="text-lg text-earth-600 max-w-2xl mx-auto">
          Get in touch with us for any queries or to place an order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-sage-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-sage-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-earth-900">Phone</h3>
                  <a href={`tel:${phoneNumber}`} className="text-sage-700 hover:underline">
                    +91 98765 43210
                  </a>
                  <p className="text-sm text-earth-600 mt-1">Call us for immediate assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-sage-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-earth-900">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage-700 hover:underline"
                  >
                    Chat with us on WhatsApp
                  </a>
                  <p className="text-sm text-earth-600 mt-1">Quick responses during business hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-sage-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-earth-900">Address</h3>
                  <p className="text-earth-700">
                    Bevinamarada Ayurvedic Store
                    <br />
                    Main Street, Market Area
                    <br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-sage-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-earth-900">Business Hours</h3>
                  <p className="text-earth-700">
                    Monday - Saturday: 9:00 AM - 8:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Map */}
          <Card className="border-sage-200">
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8267060384!2d77.59456931482!3d12.971598990861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Enquiry Form */}
        <div>
          <Card className="border-sage-200">
            <CardHeader>
              <CardTitle className="text-2xl">Send us an Enquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={addEnquiry.isPending}
                  className="w-full bg-sage-700 hover:bg-sage-800"
                >
                  {addEnquiry.isPending ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
