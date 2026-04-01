import { useEffect } from "react";

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
        {/* Logo — contains brand name and Fine Jewellery tagline */}
        <img
          src="/assets/uploads/1773833042573-2-1-1.png"
          alt="Aurelie Fine Jewellery"
          className="w-64 h-auto object-contain"
        />
      </div>
    </div>
  );
}
