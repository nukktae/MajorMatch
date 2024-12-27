import anuVideo from '../assets/videos/anubilegdemberel.MOV';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  isLocalAsset?: boolean;
}

export function VideoPlayer({ src, poster, isLocalAsset }: VideoPlayerProps) {
  return (
    <video 
      className="w-full h-full object-cover"
      controls
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
} 