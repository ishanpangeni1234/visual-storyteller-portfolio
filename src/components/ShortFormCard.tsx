import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ShortFormCardProps {
  driveId: string;
  index: number;
}

const ShortFormCard = ({ driveId, index }: ShortFormCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation(0.1);

  const embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x * 10}deg) 
      rotateX(${-y * 10}deg)
      translateY(-8px)
      scale(1.02)
    `;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  const staggerClass = `stagger-${(index % 6) + 1}`;

  return (
    <div ref={ref}>
      <div
        ref={cardRef}
        className={`video-container glass-card aspect-[9/16] scroll-scale ${staggerClass} ${isVisible ? 'visible' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: isHovered ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Loading shimmer */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-muted to-muted/50 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        )}

        {/* Glow effect on hover */}
        <div
          className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-[hsl(200,100%,60%)]/20 rounded-2xl blur-xl opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: isHovered ? 0.6 : 0 }}
        />

        <iframe
          src={embedUrl}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[320%] h-full transition-opacity duration-700 border-0 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          title={`Short Form Video ${index + 1}`}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-accent/30 rounded-tl-2xl pointer-events-none opacity-0 transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0 }} />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-accent/30 rounded-br-2xl pointer-events-none opacity-0 transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0 }} />
      </div>
    </div>
  );
};

export default ShortFormCard;
