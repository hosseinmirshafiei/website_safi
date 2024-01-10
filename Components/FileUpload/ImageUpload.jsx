

import React, { useState } from "react";
import Image from "next/image";

export default function ImageUpload({ image, alt, width, height, priority }) {
  const [loadedImage, setLoadedImage] = useState(0);
  return (
    <Image
      className={loadedImage == 0 ? "image_upload" : "image_upload img_loaded"}
      src={image}
      width={width}
      height={height}
      onLoad={() => setLoadedImage(1)}
      alt={alt}
      priority={priority}
      loading="eager"
    />
  );
}
