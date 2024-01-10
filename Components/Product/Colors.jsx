
import React, { useState, useEffect, useLayoutEffect } from "react";
import Color from "./Color";

export  default function Colors({ product, selectColor, setSelectColor , selectSize }) {
  const [colors, setColors] = useState();

  useEffect(() => {
    colorsList();
  }, [selectSize]);

  useEffect(()=>{
    handleSelectColor();
  },[colors])

  function colorsList() {
    var colors_array = [];
    if (product && product.attribute) {
      product.attribute.forEach((element) => {
        if (
          element.color && 
          ((selectSize && element.size_id == selectSize.size_id) || (!selectSize))
        ) {
          const find_color = colors_array.find(
            ({ color_id }) => color_id === element.color_id
          );
          if (!find_color) {
            colors_array = [...colors_array, element];
          }
        }
      });
    }
    setColors(colors_array);
    console.log(colors_array);
  }

   function handleSelectColor(){
     if (colors && colors.length > 0) {
       var stop = false;
       colors.forEach((record) => {
         if (stop == false && record.color && record.number > 0) {
           setSelectColor(record);
           stop = true;
         }
       });
       if(stop == false){
         setSelectColor("noColors");
       }
     }else{
         setSelectColor("noColors");
     }
   }

  return (
    <>
      {product && product.attribute && selectColor && (
        <div className="colors">
          {selectColor.color ? (
            <p className="title">رنگ : {selectColor.color.name}</p>
          ) : colors && colors.length > 0 && (
            <p className="title">رنگ : </p>
          )}
          <div className="items">
            {colors &&
              colors.map((item, index) => (
                <Color
                  item={item}
                  selectColor={selectColor}
                  setSelectColor={setSelectColor}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}