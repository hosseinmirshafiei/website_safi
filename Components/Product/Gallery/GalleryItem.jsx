import ImageProduct from "@/Components/Products/ImageProduct";
import UrlBase from "@/http/UrlHttp";
import React, { useState, useEffect, useRef } from "react";

export default function GalleryItem({
  item,
  index,
  indexImage,
  setIndexImage,
}) {
  let image = item.image;
  function handleSelectImage() {
    setIndexImage(index);
  }

  return (
    <>
      <div className={index == indexImage ? "item selected" : "item"} onClick={() => handleSelectImage()}>
        <ImageProduct
          image={image}
          alt={""}
          width={65}
          height={65}
        />
      </div>
    </>
  );
}