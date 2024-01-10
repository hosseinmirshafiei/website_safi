import React, { useState, useEffect, useLayoutEffect } from "react";
import UrlBase from "@/http/UrlHttp";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ImageGallery from "./ImageGallery";

export default function CarouselGallery({ product, gallery }) {
  const handleDragStart = (e) => e.preventDefault();
  const [items , setItems] = useState([])

  var run = 0;
  useEffect(() => {
    if(run == 0){
      run = 1;
    setItems((items) => [
      ...items,
      <ImageGallery
        image={product.image}
        alt={""}
        width={500}
        height={500}
        handleDragStart={handleDragStart}
        priority={true}
      />,
    ]);
    if(gallery){
    gallery.map((item, index) => {
      setItems((items) => [
        ...items,
        <ImageGallery
          image={item.image}
          alt={""}
          width={500}
          height={500}
          handleDragStart={handleDragStart}
          priority={false}
        />,
      ]);
    });
  }
  }
  },[]);
  return (
    <>
      <AliceCarousel mouseTracking items={items} />
    </>
  );
}