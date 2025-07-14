import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import YoutubeVideo from "@/components/common/youtube-video";
import { useRecipeStore } from "@/store";

import "swiper/css";

type Video = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
  url: string;
  embedUrl: string;
};

const RecipeVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const recipe = useRecipeStore(state => state.recipe);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`/api/videos?q=${recipe.title}`);
      const data = await response.json();

      if (data.error) return;

      setVideos(data);
    };

    fetchVideos();
  }, [recipe.title]);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="flex justify-center pt-10">
      <div className="h-[1430px] w-[740px]">
        <Swiper direction="horizontal" slidesPerView={2} spaceBetween={40}>
          {videos.map(video => (
            <SwiperSlide key={video.id.videoId}>
              <YoutubeVideo
                title={video.snippet.title}
                videoSrc={video.embedUrl}
                thumbnail={video.snippet.thumbnails.default}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RecipeVideos;
