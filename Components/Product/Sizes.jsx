import React, { useState, useEffect, useLayoutEffect } from "react";
import Size from "./Size";
export default function Sizes({ product, selectSize, setSelectSize, setSelectColor }) {
  const [sizes, setSizes] = useState();
  const [dropDown, setDropDown] = useState(0);
  const [colorNoSize , setColorNoSize] = useState(0)
  useEffect(() => {
    handleSizesList();
    handleSelectSizeDefault();
    handleCheckColorNoSize();
  }, []);

  function handleSelectSizeDefault() {
    var find = false;
    if (product && product.attribute) {
      product.attribute.forEach((element) => {
        if (find == false && element.size && element.number > 0) {
          setSelectSize(element);
          find = true;
        }
      });
    }
  }

  function handleSizesList() {
    var sizes_array = [];
    if (product && product.attribute) {
      product.attribute.forEach((element) => {
        if (element.size) {
          const find_size = sizes_array.find(
            ({ size_id }) => size_id === element.size_id
          );
          if (!find_size) {
            sizes_array = [...sizes_array, element];
          }
        }
      });
    }
    if(sizes_array.length > 0){
    setSizes(sizes_array);
    }
    console.log(sizes_array);
  }
  function handleDropSize() {
    if (dropDown == 0) {
      setDropDown(1);
    } else {
      setDropDown(0);
    }
  }
  function handleCheckColorNoSize(){
    if(product && product.attribute){
       product.attribute.forEach(element => {
         if(element.color_id != null && element.size_id == null){
            setColorNoSize(1)
         }
       });
    }
  }

  return (
    <>
      {product && sizes && selectSize && (
        <div className="size_parent">
          <p className="title">سایز</p>
          {/* <div className="size_select" onClick={() => handleDropSize()}>
            {selectSize && selectSize.size.size}
            <img src="../drop_down.svg" className="icon" />
          </div> */}
          <div className={dropDown == 0 ? "size_list" : "size_list dropDown"}>
            {sizes.map((item, index) => (
              <Size
                item={item}
                setDropDown={setDropDown}
                selectSize={selectSize}
                setSelectSize={setSelectSize}
                setSelectColor={setSelectColor}
              />
            ))}
            {selectSize && colorNoSize == 1 &&
            <Size
              item={{ size_id: null, size: { size: "فاقد سایز" } }}
              setDropDown={setDropDown}
              selectSize={selectSize}
              setSelectSize={setSelectSize}
              setSelectColor={setSelectColor}
            />
            }
          </div>
        </div>
      )}
    </>
  );
}
