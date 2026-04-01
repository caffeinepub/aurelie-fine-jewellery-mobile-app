import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { useActor } from "../../hooks/useActor";

export default function FooterSystem() {
  const { actor, isFetching: actorFetching } = useActor();

  const { data: siteContent } = useQuery({
    queryKey: ["siteContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent();
    },
    enabled: !!actor && !actorFetching,
  });

  const appId =
    typeof window !== "undefined"
      ? window.location.hostname
      : "aurelie-fine-jewellery";

  return (
    <footer
      style={{ backgroundColor: "#f5f5f0" }}
      className="border-t border-gold/20 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            {/* Flower + Brand Name */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/aurelie-flower-logo-transparent.dim_200x200.png"
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span
                  className="gold-text font-serif text-xl tracking-widest uppercase"
                  style={{
                    fontFamily: "'Didot', 'Times New Roman', serif",
                    letterSpacing: "0.12em",
                  }}
                >
                  Aurelie
                </span>
                <span
                  style={{
                    fontFamily: "'Didot', 'Times New Roman', serif",
                    letterSpacing: "0.18em",
                    fontSize: "0.6rem",
                    color: "#B5860D",
                    textTransform: "uppercase",
                  }}
                >
                  Fine Jewellery
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteContent?.aboutUs?.slice(0, 120) ||
                "Exquisite handcrafted jewellery inspired by timeless elegance."}
              {siteContent?.aboutUs && siteContent.aboutUs.length > 120
                ? "…"
                : ""}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-details"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Contact Details
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              {siteContent?.phoneNumber && <p>{siteContent.phoneNumber}</p>}
              {siteContent?.contactEmail && (
                <a
                  href={`mailto:${siteContent.contactEmail}`}
                  className="block hover:text-gold transition-colors"
                >
                  {siteContent.contactEmail}
                </a>
              )}
              {siteContent?.address && <p>{siteContent.address}</p>}
            </div>
            <div className="flex gap-3">
              {siteContent?.instagramUrl && (
                <a
                  href={siteContent.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                >
                  <SiInstagram className="w-4 h-4 text-gold" />
                </a>
              )}
              {siteContent?.facebookUrl && (
                <a
                  href={siteContent.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                >
                  <SiFacebook className="w-4 h-4 text-gold" />
                </a>
              )}
              {siteContent?.xUrl && (
                <a
                  href={siteContent.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                >
                  <SiX className="w-4 h-4 text-gold" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            {siteContent?.officialName || "Aurelie Fine Jewellery"}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-gold fill-gold" /> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
