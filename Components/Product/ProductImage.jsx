import UrlBase from "@/http/UrlHttp";
import Gallery from "./Gallery/Gallery";
import React, { useState } from "react";
import Image from "next/image";

export default function ProductImage({ product , gallery }) {
    const [loadedImage, setLoadedImage] = useState(0);
  return (
    <>
      {product && (
        <div className="image_product">
          <Image
            className={loadedImage == 0 ? "img" : "img img_loaded"}
            src={product.image == null || product.image.length == 0 ? "/images/missingbook.webp" : UrlBase + product.image}
            alt={product.name}
            width={700}
            height={700}
            priority="true"
            onLoad={() => setLoadedImage(1)}
          />
          <Gallery gallery={gallery} />
        </div>
      )}
    </>
  );
}
