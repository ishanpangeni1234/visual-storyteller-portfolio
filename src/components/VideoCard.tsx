import { useState } from "react";

interface VideoCardProps {
  driveId: string;
  title?: string;
  index: number;
}

const VideoCard = ({ driveId, title, index }: VideoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;

  return (
    <div 
      className="video-container aspect-video bg-muted opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <iframe
        src={embedUrl}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title={title || `Video ${index + 1}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border border-muted-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default VideoCard;
