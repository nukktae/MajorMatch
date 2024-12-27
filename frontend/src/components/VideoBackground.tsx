import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  opacity?: number;
}

export function VideoBackground({ videoSrc, opacity = 0.3 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ opacity }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
    </div>
  );
} 