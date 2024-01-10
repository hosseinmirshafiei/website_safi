import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Filter/Context/Context";
import ImageEmpty from "./ImageEmpty";
import ProductItem from "./ProductItem";

export default function Products() {
  
  const { products, delivery, generalDiscount } = useContext(Context);
  return (
    <>
      {products && products.length > 0 ? (
        <div className="products_list">
          {products.map((item, index) => (
            <ProductItem
              key={item.id}
              item={item}
              generalDiscount={generalDiscount}
              delivery={delivery}
            />
          ))}
        </div>
      ) : (
        <div className="empty_products">
          <div className="empty">
            <ImageEmpty
              alt={""}
              image={"/images/404.svg"}
              width={230}
              height={173}
            />
            <div className="message">
              <img className="icon_message" src="/warning.svg" />
              <span>موردی پیدا نشد.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
