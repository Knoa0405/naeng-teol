"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RecipeItem {
  id: number;
  image: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
}

interface RecipeListItemProps {
  item: RecipeItem;
}

const RecipeListItem = ({ item }: RecipeListItemProps) => {
  const router = useRouter();

  return (
    <div className="break-inside-avoid mb-4">
      <Card
        className="overflow-hidden cursor-pointer"
        onClick={() => router.push(`/posts/${item.id}`)}
      >
        <CardContent className="p-0">
          <Image
            src={item.image}
            alt={item.title}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPc8h8AAm0BtR3QMUIAAAAASUVORK5CYII="
          />
        </CardContent>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{item.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{item.comments}</span>
            </button>
          </div>
          <button className="hover:text-gray-600">
            <Share2 className="w-4 h-4" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipeListItem;
