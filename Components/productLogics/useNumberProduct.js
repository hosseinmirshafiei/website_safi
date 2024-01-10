
import React, { useState, useEffect, useLayoutEffect } from "react";
export default function useNumberProduct({selectColor , selectSize ,number , setNumber , productColors}){
    
  useEffect(() => {
    handleNumber();
  }, [selectColor, selectSize]);

    function handleNumber() {
     if (selectSize && selectColor == "noColors") {
       setNumber(selectSize.number);
     } 
     else if (selectSize && !selectColor) {
       setNumber(selectSize.number);
     } 
     else if (selectColor && selectColor != "noColors") {
       setNumber(selectColor.number);
     }
     else {
       productColors.forEach((element) => {
         if (
           element.color_id == null &&
           element.size_id == null &&
           element.status == 1
         ) {
           setNumber(element.number);
         }
       });
     }
    }
}