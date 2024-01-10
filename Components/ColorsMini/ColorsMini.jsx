
import React, { useState, useEffect } from "react";
export default function ColorsMini({ item }) {
  const [colors , setColors]= useState([])
  const [hasColor, setHasColor] = useState(0)
  useEffect(() => {
    handleHasColor();
  });
  const handleHasColor = () => {
    if (item.attribute) {
      item.attribute.map((el)=>{
         if(el.color && el.color != null){
            setHasColor(1)
         }
      })
    }
  };
  const handleColors =()=>{
     var colors_list = [];
     if(item.attribute){
       item.attribute.map((item_attribute) => {
         var find = colors_list.find((color) => {
           return color == item_attribute.color.color;
         });
         if (item_attribute.color != null && !find) {
           colors_list = [...colors_list, item_attribute.color.color];
         }
       });
     }
     setColors(colors_list);       
  }
  useEffect(()=>{
    handleColors()
  },[])
  return (
    <div className="product_colors_mini">
      {colors &&
        colors.map((color, index) => (
          <div key={index}>
            {index < 3 &&(
              <div
                className="color"
                style={{ background: color }}
              ></div>
            )}
          </div>
        ))}
      {colors && colors.length > 3 && hasColor == 1 &&(
        <span className="more_colors">+</span>
      )}
    </div>
  );
}
