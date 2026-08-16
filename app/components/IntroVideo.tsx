'use client';

import { useEffect, useRef, useState } from 'react';

import { PortfolioMode } from '../mode';

const VIDEO_SRC: Record<PortfolioMode, string> = {
  light: '/paper-animation-light.mp4',
  dark: '/paper-animation-dark.mp4',
};

interface IntroVideoProps {
  mode: PortfolioMode;
  onComplete: () => void;
}

const IntroVideo = ({ mode, onComplete }: IntroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const src = VIDEO_SRC[mode];

  const finish = () => {
    setOpacity(0);
    window.setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 500);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let safetyTimer: number | undefined;

    const handleEnded = () => {
      window.clearTimeout(safetyTimer);
      finish();
    };

    const handleLoadedMetadata = () => {
      // Fallback: if the video stalls and never ends, skip after its duration + 2s buffer.
      const timeout = (video.duration || 5) + 2;
      safetyTimer = window.setTimeout(handleEnded, timeout * 1000);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Make sure the correct source is loaded before playing.
    video.load();
    video.play().catch(() => {
      // Autoplay blocked or failed: skip the intro so the site still loads.
      handleEnded();
    });

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.clearTimeout(safetyTimer);
    };
  }, [src, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-500"
      style={{ opacity }}
      onClick={finish}
      role="button"
      aria-label="Skip intro video"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          finish();
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-contain md:object-cover md:object-[50%_35%]"
      />
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 text-center text-sm text-white/50">
        Tap anywhere to skip
      </div>
    </div>
  );
};

export default IntroVideo;
