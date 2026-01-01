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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-12 lg:px-24 pb-24">
      {videos.map((video, index) => (
        <VideoCard 
          key={video.id} 
          driveId={video.id} 
          index={index}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
