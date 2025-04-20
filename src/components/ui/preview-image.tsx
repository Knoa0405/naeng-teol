import { useEffect } from "react";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PreviewImageProps {
  imagePreviewURL: string | null;
}

const PreviewImage = ({ imagePreviewURL }: PreviewImageProps) => {
  useEffect(() => {
    return () => {
      if (imagePreviewURL) {
        URL.revokeObjectURL(imagePreviewURL);
      }
    };
  }, [imagePreviewURL]);

  return (
    imagePreviewURL && (
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src={imagePreviewURL}
          alt="image preview"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    )
  );
};

export default PreviewImage;
