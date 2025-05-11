import { createYoutubeUrl } from "@/lib/utils";

type Params = Promise<{ q: string }>;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  const videos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${query}&part=snippet&maxResults=10`,
  );

  const data = await videos.json();

  const formattedVideos = data.items.map((item: any) => ({
    ...item,
    url: createYoutubeUrl(item.id.videoId),
  }));

  return Response.json(formattedVideos, { status: 200 });
};
