import UrlBase from "@/http/UrlHttp";
import React, { useState, useEffect, useRef } from "react";

export default function Description({ product }) {
  const [more , setMore] = useState(0)
  const content  = useRef()

  useEffect(()=>{
   handleHeightDescription();
  },[])

  function handleHeightDescription(){
    var height = content.current.offsetHeight;
    console.log(height);
    if (height >= 200) {
      setMore(1);
    } else {
      setMore(0);
    }
  }
  function handleMoreDescription() {
    if(more == 1){
      setMore(2);
    }else{
      setMore(1);
    }
  }

    function description() {
        if(product){
      return { __html: product.description };
        }
    }
  return (
    <>
      {product && (
        <div className="description_parent">
          <h2>معرفی</h2>
          <div
            className={(more == 0 || more == 2)  ? "decription" : more == 1 && "decription more"}
            dangerouslySetInnerHTML={description()}
            ref={content}
          ></div>
          {more == 1 ? (
            <button
              className="btn_more"
              onClick={() => handleMoreDescription()}
            >
              مشاهده بیشتر
              <img className="next_icon" src="/next_more2.svg" />
            </button>
          ) : more == 2 &&(
            <button
              className="btn_more"
              onClick={() => handleMoreDescription()}
            >
              بستن
              <img className="next_icon" src="/next_more2.svg" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
