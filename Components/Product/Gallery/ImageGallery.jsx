import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import UrlBase from "@/http/UrlHttp";

export default function ImageGallery({ image, alt, width, height, handleDragStart , priority}) {
  const [loadedImage, setLoadedImage] = useState(0);
  return (
    <Image
      className={
        loadedImage == 0 ? "image_gallery" : "image_gallery img_loaded"
      }
      src={image == null || image.length == 0 ? "/images/missingbook.webp" : UrlBase + image}
      width={width}
      height={height}
      onLoad={() => setLoadedImage(1)}
      alt={alt}
      onDragStart={handleDragStart}
      role="presentation"
      priority={priority}
      // placeholder="blur"
      // blurDataURL="/images/avatar.png"
      loading="eager"
    />
  );
}
