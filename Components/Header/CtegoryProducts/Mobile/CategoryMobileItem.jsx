import { useRouter } from "next/router";
import React, { useState, useRef, useEffect, useContext, use } from "react";
import CategoryChilds from "./CategoryChilds";

export default function CategoryMobileItem({ item }) {
    
  const [itemChildes , setItemChildes] = useState()  
  const [categoryChilds , setCategoryChilds] = useState([])
  const [subCategory , setSubCategory] = useState(0)
  const router = useRouter()


  useEffect(()=>{
    if(item && item.childes){
     setItemChildes(item.childes)
    }
  },[])

  function handleChildsCategory() {
    if (item && itemChildes && itemChildes.length > 0) {
      var id = item.id;
      item.childes.forEach((category) => {
        if (category.category_id == id) {
          setCategoryChilds((categoryChilds) => [...categoryChilds, category]);
        }
      });

      if (subCategory == 0) {
        setSubCategory(1);
      } else {
        setSubCategory(0);
        setCategoryChilds([]);
      }
    } else {
      router.push("/products/" + item.slug);
    }
  }

  return (
    <>
      <div>
        <button
          className={subCategory == 0 ? "item" : "item selected"}
          onClick={() => handleChildsCategory()}
        >
          {item.name}
          {subCategory == 0 && itemChildes && itemChildes.length > 0 && (
            <img className="down" src="/down2.svg" />
          )}
          {subCategory == 1 && itemChildes && itemChildes.length > 0 && (
            <img className="up" src="/up2.svg" />
          )}
        </button>
        {subCategory == 1 && categoryChilds && categoryChilds.length > 0 && (
          <CategoryChilds item={item} categoryChilds={categoryChilds} />
        )}
      </div>
    </>
  );
}
