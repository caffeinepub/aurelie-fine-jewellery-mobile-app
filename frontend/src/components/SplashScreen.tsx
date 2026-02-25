import { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-beige-light">
      <div className="flex flex-col items-center gap-6 animate-splash-zoom">
        {/* Logo */}
        <img
          src="/assets/generated/aurelie-logo-transparent.dim_200x200.png"
          alt="Aurelie Fine Jewellery"
          className="w-32 h-32 object-contain"
        />
        
        {/* Brand Name */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gold-medium gold-text">
          Aurelie Fine Jewellery
        </h1>
      </div>
    </div>
  );
}
