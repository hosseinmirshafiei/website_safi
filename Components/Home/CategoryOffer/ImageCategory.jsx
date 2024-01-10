import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import UrlBase from "@/http/UrlHttp";

export default function ImageCategory({ image, alt , width, height }) {
    const [loadedImage, setLoadedImage] = useState(0);
  return (
    <Image
      className={loadedImage == 0 ? "img" : "img img_loaded"}
      src={UrlBase + image}
      width={width}
      height={height}
      onLoad={() => setLoadedImage(1)}
      alt={alt}
      // placeholder="blur"
      // blurDataURL="/images/avatar.png"
      // loading="lazy"
    />
  );
}
