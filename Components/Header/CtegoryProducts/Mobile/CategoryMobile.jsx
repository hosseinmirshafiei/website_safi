import { Context } from "@/Components/Context/Context";
import React, { useState, useRef, useEffect, useContext } from "react";
import CategoryMobileItem from "./CategoryMobileItem";

export default function CategoryMobile() {
  const { info } = useContext(Context);
  const [parentCategories, setParentCategories] = useState([]);
  var run = 0; 

  useEffect(() => {
    if (run == 0) {
      handleParentCategory();
    }
    run = 1;
  }, []);

  function handleParentCategory() {
    if (info && info.menu && info.menu.length > 0) {
      info.menu.forEach((element) => {
        if (element.category_id == 0 || element.category_id == null) {
          setParentCategories((parentCategories) => [
            ...parentCategories,
            element,
          ]);
        }
      });
    }
  }
   
  return (
    <>
      <div>
        {parentCategories &&
          parentCategories.length > 0 &&
          parentCategories.map((item, index) => (
            <CategoryMobileItem
              item={item}
              key={item.id}
            />
          ))}
      </div>
    </>
  );
}
