import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function OurStoryStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stripRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '320px' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/our-story-bg.dim_1440x480.jpg')`,
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      {/* Gold accent border top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      {/* Gold accent border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 py-12 md:py-16 gap-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Left: Floral accent */}
        <div
          className={`hidden md:flex items-center justify-center shrink-0 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <img
            src="/assets/generated/floral-pattern-outline-shimmering-gold-transparent-minimal.dim_400x400.png"
            alt=""
            className="w-32 h-32 opacity-60"
          />
        </div>

        {/* Center: Text content */}
        <div className="flex-1 text-center md:text-left max-w-2xl">
          <p
            className={`text-xs tracking-[0.3em] uppercase mb-3 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: '#c9a84c' }}
          >
            Est. 2020 · Handcrafted Excellence
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The Aurelie Story
          </h2>
          <p
            className={`text-sm md:text-base text-white/80 leading-relaxed mb-6 max-w-xl transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Born from a passion for timeless beauty, every Aurelie piece is a testament to the art of fine jewellery.
            Our master artisans weave heritage craftsmanship with contemporary elegance — creating heirlooms that
            transcend generations.
          </p>
          <button
            onClick={() => navigate({ to: '/contact' })}
            className={`inline-flex items-center gap-2 px-6 py-2.5 border text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
          >
            Discover Our Craft
          </button>
        </div>

        {/* Right: Stats */}
        <div
          className={`flex flex-row md:flex-col gap-6 md:gap-8 shrink-0 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          {[
            { value: '500+', label: 'Unique Designs' },
            { value: '22K', label: 'Pure Gold' },
            { value: '5★', label: 'Rated' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-serif text-2xl md:text-3xl font-bold"
                style={{ color: '#c9a84c' }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/60 tracking-widest uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
