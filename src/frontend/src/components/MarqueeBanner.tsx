import { useGetEnabledBannerMessages } from '../hooks/useBannerQueries';

export default function MarqueeBanner() {
  const { data: messages, isLoading } = useGetEnabledBannerMessages();

  // Don't render if loading or no enabled messages
  if (isLoading || !messages || messages.length === 0) {
    return null;
  }

  // Create a continuous string of messages separated by decorative elements
  const messageText = messages
    .map((msg) => msg.message)
    .join(' ✨ ');

  // Duplicate the message text to create seamless loop
  const fullText = `${messageText} ✨ ${messageText}`;

  return (
    <div className="w-full bg-gradient-to-r from-gold-dark via-gold-medium to-gold-dark overflow-hidden border-b border-gold-medium/30 relative">
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="marquee-text">{fullText}</span>
        </div>
      </div>
      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          gap: 0;
          padding: 0.75rem 0;
        }
        
        .marquee-content {
          flex-shrink: 0;
          display: flex;
          justify-content: space-around;
          gap: 0;
          min-width: 100%;
          animation: scroll-left 30s linear infinite;
        }
        
        .marquee-text {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: oklch(var(--beige-light));
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
          padding: 0 2rem;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
