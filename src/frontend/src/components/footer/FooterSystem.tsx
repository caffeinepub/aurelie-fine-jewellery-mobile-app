import { useGetSiteContent } from '../../hooks/useQueries';
import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function FooterSystem() {
  const { data: siteContent } = useGetSiteContent();

  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'aurelie-jewellery'
  );

  return (
    <footer className="w-full bg-beige-champagne border-t border-gold-medium/20" data-footer-scope>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Logo */}
          <div className="flex flex-col items-start">
            <img
              src="/assets/generated/aurelie-lockup-transparent.dim_1000x320.png"
              alt="Aurelie Fine Jewellery"
              className="h-16 object-contain mb-4"
            />
          </div>

          {/* Right Column: Contact & Policies */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-bottle-green-dark">Contact Us</h3>
              <div className="space-y-1 text-sm text-bottle-green-dark">
                <p>{siteContent?.contactEmail || 'contact@aurelie.com'}</p>
                <p>{siteContent?.phoneNumber || '+65 1234 5678'}</p>
                <p>{siteContent?.address || 'Orchard Road, Singapore'}</p>
              </div>
            </div>

            {/* Social Media Icons */}
            {(siteContent?.instagramUrl || siteContent?.facebookUrl || siteContent?.xUrl) && (
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-semibold text-bottle-green-dark">Follow Us</h3>
                <div className="flex gap-4">
                  {siteContent?.instagramUrl && (
                    <a
                      href={siteContent.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bottle-green-dark hover:text-gold-medium transition-colors"
                      aria-label="Instagram"
                    >
                      <SiInstagram className="h-6 w-6" />
                    </a>
                  )}
                  {siteContent?.facebookUrl && (
                    <a
                      href={siteContent.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bottle-green-dark hover:text-gold-medium transition-colors"
                      aria-label="Facebook"
                    >
                      <SiFacebook className="h-6 w-6" />
                    </a>
                  )}
                  {siteContent?.xUrl && (
                    <a
                      href={siteContent.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bottle-green-dark hover:text-gold-medium transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <SiX className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Policies */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-bottle-green-dark">Policies</h3>
              <div className="flex flex-wrap gap-4 text-sm text-bottle-green-dark">
                <Link
                  to="/privacy-policy"
                  className="hover:text-gold-medium transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/shipping-policy"
                  className="hover:text-gold-medium transition-colors"
                >
                  Shipping Policy
                </Link>
                <Link
                  to="/terms-conditions"
                  className="hover:text-gold-medium transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Footer Content */}
            {siteContent?.footerContent && (
              <div className="text-sm text-bottle-green-dark">
                <p>{siteContent.footerContent}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gold-medium/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-bottle-green-dark">
            <p>© {currentYear} {siteContent?.officialName || 'Aurelie Fine Jewellery'}. All rights reserved.</p>
            <p>
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-medium transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
