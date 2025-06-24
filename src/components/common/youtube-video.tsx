"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { useEffect, useState } from "react";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface YoutubeVideoProps {
  title: string;
  videoSrc: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
}

const YoutubeVideo = ({ title, videoSrc, thumbnail }: YoutubeVideoProps) => {
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // timeout error
      if (!ready) setError(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [ready]);

  if (error) return null;

  return (
    <MediaPlayer
      viewType="video"
      logLevel="warn"
      crossOrigin
      playsInline
      title={title}
      src={videoSrc}
      aspectRatio={`${thumbnail.height} / ${thumbnail.width}`}
      onError={() => setError(true)}
      onCanPlay={() => setReady(true)}
      load="eager"
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default YoutubeVideo;
