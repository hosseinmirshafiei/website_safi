import ImageProduct from "@/Components/Products/ImageProduct";
import UrlBase from "@/http/UrlHttp";
import React, { useState, useEffect, useRef } from "react";
import GalleryItem from "./GalleryItem";

export default function Gallery({gallery}){

    const [indexImage, setIndexImage] = useState(0);
    const [showGallery , setShowGallery] = useState(0)
    function handleNext(){
    
     if(gallery.length-1 > indexImage){
       setIndexImage(indexImage + 1);
     }else{
        setIndexImage(0);
     }
    }
    function handleBack(){
     if (indexImage != 0) {
       setIndexImage(indexImage - 1);
     } else {
       setIndexImage(gallery.length-1);
     }
    }

    function handleShowGallery(index){
      if(showGallery == 0){
      setShowGallery(1);
      setIndexImage(index)

      }else{
      setShowGallery(0);
      setIndexImage(0)
      }
    }

    return (
      <>
        <div className="sub_gallery">
          {gallery &&
            gallery.map((item, index) => (
              <div className="item" onClick={() => handleShowGallery(index)}>
                <ImageProduct
                  image={item.image}
                  alt={""}
                  width={65}
                  height={65}
                />
              </div>
            ))}
        </div>

        {showGallery == 1 && gallery && (
          <div className="gallery_parent">
            <div className="gallery_content">
              <div className="close_gallery">
                <button onClick={() => handleShowGallery()}>&#x2715;</button>
              </div>
              <div className="gallery">
                <div className="image_selected">
                  <button className="next" onClick={() => handleNext()}>
                    &#8249;
                  </button>
                  <ImageProduct
                    image={gallery[indexImage].image}
                    alt={""}
                    width={600}
                    height={600}
                  />
                  <button className="back" onClick={() => handleBack()}>
                    &#8250;
                  </button>
                </div>
                <div className="items">
                  {gallery.map((item, index) => (
                    <GalleryItem
                      key={index}
                      item={item}
                      index={index}
                      indexImage={indexImage}
                      setIndexImage={setIndexImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}