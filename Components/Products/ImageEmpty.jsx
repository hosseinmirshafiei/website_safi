import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import UrlBase from "@/http/UrlHttp";

export default function ImageEmpty({
  image,
  alt,
  width,
  height,
  priority,
}) {
  const [loadedImage, setLoadedImage] = useState(0);
  return (
    <Image
      className={loadedImage == 0 ? "image_empty" : "image_empty img_loaded"}
      src={image}
      width={width}
      height={height}
      onLoad={() => setLoadedImage(1)}
      alt={alt}
      priority={priority}
      loading="lazy"
      // placeholder="blur"
      // blurDataURL="/images/avatar.png"
    />
  );
}
