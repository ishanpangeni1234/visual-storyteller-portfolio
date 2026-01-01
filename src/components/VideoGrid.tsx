import VideoCard from "./VideoCard";

interface Video {
  id: string;
  category: string;
}

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className="relative px-6 md:px-12 lg:px-24 pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {videos.map((video, index) => (
          <VideoCard 
            key={video.id} 
            driveId={video.id} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
