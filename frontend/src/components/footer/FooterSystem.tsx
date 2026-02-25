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
    <footer className="w-full bg-[#f5f5f0] border-t border-gold-medium/20" data-footer-scope>
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

            {/* Policy Links */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-bottle-green-dark">Policies</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  to="/privacy-policy"
                  className="text-bottle-green-dark hover:text-gold-medium transition-colors underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/shipping-policy"
                  className="text-bottle-green-dark hover:text-gold-medium transition-colors underline-offset-2 hover:underline"
                >
                  Shipping Policy
                </Link>
                <Link
                  to="/terms-conditions"
                  className="text-bottle-green-dark hover:text-gold-medium transition-colors underline-offset-2 hover:underline"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-bottle-green-dark">Follow Us</h3>
              <div className="flex items-center gap-4">
                {siteContent?.instagramUrl && (
                  <a
                    href={siteContent.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bottle-green-dark hover:text-gold-medium transition-colors"
                    aria-label="Instagram"
                  >
                    <SiInstagram className="h-5 w-5" />
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
                    <SiFacebook className="h-5 w-5" />
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
                    <SiX className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        {siteContent?.footerContent && (
          <div className="mt-8 pt-6 border-t border-gold-medium/20">
            <p className="text-sm text-bottle-green-medium text-center">
              {siteContent.footerContent}
            </p>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gold-medium/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bottle-green-medium">
            &copy; {currentYear} {siteContent?.officialName || 'Aurelie Fine Jewellery'}. All rights reserved.
          </p>
          <p className="text-xs text-bottle-green-medium flex items-center gap-1">
            Built with{' '}
            <span className="text-gold-medium">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-medium hover:text-gold-dark transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
