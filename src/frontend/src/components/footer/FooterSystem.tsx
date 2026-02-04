import { Mail, Phone, MapPin, Heart } from 'lucide-react';

type ContactInfo = {
  contactEmail: string;
  phoneNumber: string;
  address: string;
};

interface FooterSystemProps {
  contactInfo?: ContactInfo;
  footerContent?: string;
}

export default function FooterSystem({
  contactInfo,
  footerContent,
}: FooterSystemProps) {
  return <SplitLayoutFooter contactInfo={contactInfo} footerContent={footerContent} />;
}

// Split Layout Footer with New Branding
function SplitLayoutFooter({
  contactInfo,
  footerContent,
}: {
  contactInfo?: ContactInfo;
  footerContent?: string;
}) {
  return (
    <footer className="relative border-t border-gold-medium/20 bg-ivory-prestige backdrop-blur py-12">
      <div className="hairline-gold-divider" />
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column: Brand + Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/aurelie-icon-transparent.dim_512x512.png"
                alt="Aurelie Icon"
                className="h-12 w-12 object-contain"
              />
              <img
                src="/assets/generated/aurelie-wordmark-goldshine-transparent.dim_1600x500.png"
                alt="Aurelie Fine Jewellery"
                className="h-6 object-contain"
                style={{ width: 'auto' }}
              />
            </div>
            <p className="footer-text-didot text-sm font-light max-w-xs">
              Exquisite handcrafted jewellery inspired by timeless elegance
            </p>
          </div>

          {/* Right Column: Contact Info + Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contact Info */}
            {contactInfo && (
              <div className="flex flex-col gap-3">
                <h3 className="footer-heading-didot text-sm tracking-wider uppercase">
                  Contact
                </h3>
                <div className="flex flex-col gap-2 text-xs">
                  <a
                    href={`mailto:${contactInfo.contactEmail}`}
                    className="footer-link-didot flex items-center gap-2 hover:opacity-70 transition-opacity"
                  >
                    <Mail className="h-3 w-3" />
                    <span className="font-light">{contactInfo.contactEmail}</span>
                  </a>
                  <a
                    href={`tel:${contactInfo.phoneNumber}`}
                    className="footer-link-didot flex items-center gap-2 hover:opacity-70 transition-opacity"
                  >
                    <Phone className="h-3 w-3" />
                    <span className="font-light">{contactInfo.phoneNumber}</span>
                  </a>
                  <div className="footer-text-didot flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span className="font-light">{contactInfo.address}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <h3 className="footer-heading-didot text-sm tracking-wider uppercase">
                Policies
              </h3>
              <div className="flex flex-col gap-2 text-xs">
                <span className="footer-text-didot font-light">Terms of Service</span>
                <span className="footer-text-didot font-light">Privacy Policy</span>
                <span className="footer-text-didot font-light">Shipping Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        {footerContent && (
          <div className="mt-8 pt-6 border-t border-gold-medium/10">
            <p className="footer-text-didot text-xs font-light text-center">
              {footerContent}
            </p>
          </div>
        )}

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gold-medium/10 flex items-center justify-center">
          <p className="footer-text-didot text-xs font-light">
            © 2026. Built with <Heart className="inline h-3 w-3 fill-current" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
