import { useState } from "react";
import VideoCard from "./VideoCard";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Video {
  id: string;
  category: string;
}

interface VideoGridProps {
  videos: Video[];
}

const INITIAL_COUNT = 6;

const VideoGrid = ({ videos }: VideoGridProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleVideos = showAll ? videos : videos.slice(0, INITIAL_COUNT);
  const hasMore = videos.length > INITIAL_COUNT;

  return (
    <div className="relative px-6 md:px-12 lg:px-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {visibleVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            driveId={video.id}
            index={index}
          />
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {hasMore && (
        <div className="relative flex justify-center mt-16">
          <button
            onClick={() => setShowAll(!showAll)}
            className="glass-card-hover magnetic-hover group flex items-center gap-3 px-8 py-4 text-sm tracking-wider uppercase text-foreground/80 hover:text-foreground transition-all duration-300"
          >
            <span>{showAll ? 'Show Less' : 'Show More'}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
