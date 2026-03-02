import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';
import { MapPin, Phone, Mail, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { SiInstagram, SiFacebook, SiX } from 'react-icons/si';

export default function ContactDetailsPage() {
  const { actor, isFetching: actorFetching } = useActor();
  const navigate = useNavigate();

  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactInfo();
    },
    enabled: !!actor && !actorFetching,
  });

  const { data: siteContent } = useQuery({
    queryKey: ['siteContent'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent();
    },
    enabled: !!actor && !actorFetching,
  });

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen bg-[#f5f5f0] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-foreground mb-3">Contact Us</h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-muted-foreground">
              We'd love to hear from you. Reach out through any of the channels below.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Phone */}
              <div className="bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    {contactInfo?.phoneNumber || '+91 98765 43210'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href={`mailto:${contactInfo?.contactEmail || 'contact@aurelie.com'}`}
                    className="text-gold hover:underline"
                  >
                    {contactInfo?.contactEmail || 'contact@aurelie.com'}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    {contactInfo?.address || 'Mumbai, Maharashtra, India'}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4">
                <div className="p-3 bg-gold/10 rounded-full shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 11:00 AM – 5:00 PM</p>
                </div>
              </div>

              {/* Social Media */}
              {siteContent && (
                <div className="bg-white border border-gold/30 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {siteContent.instagramUrl && (
                      <a
                        href={siteContent.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                      >
                        <SiInstagram className="w-5 h-5 text-gold" />
                      </a>
                    )}
                    {siteContent.facebookUrl && (
                      <a
                        href={siteContent.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                      >
                        <SiFacebook className="w-5 h-5 text-gold" />
                      </a>
                    )}
                    {siteContent.xUrl && (
                      <a
                        href={siteContent.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                      >
                        <SiX className="w-5 h-5 text-gold" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Inquiry CTA */}
              <div className="bg-gold/5 border border-gold/40 rounded-lg p-6 text-center">
                <p className="text-foreground mb-3">Have a specific question or inquiry?</p>
                <button
                  onClick={() => navigate({ to: '/contact' })}
                  className="px-6 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 transition-colors"
                >
                  Send Us a Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
