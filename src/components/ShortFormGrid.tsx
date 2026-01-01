import { useState } from "react";
import ShortFormCard from "./ShortFormCard";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ShortFormGridProps {
  videos: string[];
}

const INITIAL_COUNT = 6;

const ShortFormGrid = ({ videos }: ShortFormGridProps) => {
  const [showAll, setShowAll] = useState(false);
  
  const visibleVideos = showAll ? videos : videos.slice(0, INITIAL_COUNT);
  const hasMore = videos.length > INITIAL_COUNT;

  return (
    <div className="relative px-6 md:px-12 lg:px-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {visibleVideos.map((videoId, index) => (
          <ShortFormCard 
            key={videoId} 
            driveId={videoId} 
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

export default ShortFormGrid;
