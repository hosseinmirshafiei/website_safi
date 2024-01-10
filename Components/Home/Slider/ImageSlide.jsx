import React, { useState } from "react";
import Image from "next/image";
import UrlBase from "@/http/UrlHttp";

export default function ImageSlide({
  image,
  alt,
  width,
  height,
  handleDragStart,
  priority,
}) {
  const [loadedImage, setLoadedImage] = useState(0);
  return (
    <Image
      className={loadedImage == 0 ? "image_slide" : "image_slide img_loaded"}
      src={UrlBase + image}
      width={width}
      height={height}
      onLoad={() => setLoadedImage(1)}
      alt={alt}
      loading="eager"
      priority={priority}

      // placeholder="blur"
      // blurDataURL="/images/avatar.png
    />
  );
}
