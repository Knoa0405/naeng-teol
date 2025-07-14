"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

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
  return (
    <MediaPlayer
      viewType="video"
      posterLoad="eager"
      load="eager"
      logLevel="warn"
      crossOrigin
      playsInline
      title={title}
      src={videoSrc}
      aspectRatio={`${402 / 715}`}
    >
      <MediaProvider />
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        thumbnails={thumbnail.url}
      />
    </MediaPlayer>
  );
};

export default YoutubeVideo;
