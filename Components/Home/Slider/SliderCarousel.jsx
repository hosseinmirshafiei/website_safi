import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import UrlBase from "@/http/UrlHttp";
import ImageSlide from "./ImageSlide";

export default function SliderCarousel({ slides }) {
  return (
    <>
      <div class="banner">
        <div class="inner">
        </div>
      </div>
    </>
  );
}
