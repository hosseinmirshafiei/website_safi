import UrlBase from "@/http/UrlHttp";
import { post, get } from "@/http/http";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { usePriceFinal } from "@/Components/productLogics/usePriceFinal";
import ColorsMini from "../ColorsMini/ColorsMini";
import useSelectAttribute from "../productLogics/useSelectAttribute";
import useNumberProduct from "../productLogics/useNumberProduct";
import ImageProduct from "./ImageProduct";

export default function ProductItem({ item, generalDiscount, delivery }) {
  const [firstPrice, setFirstPrice] = useState(item.price);
  const [productColors, setProductColors] = useState(item.attribute);
  const [productDiscount, setProductDiscount] = useState(item.discount);
  const [weight, setWeight] = useState(item.weight);
  const [number, setNumber] = useState();
  const [selectColor, setSelectColor] = useState();
  const [selectSize, setSelectSize] = useState();
  const [countFinal , setCountFinal] = useState(1)

  useNumberProduct({ selectColor, selectSize, setNumber , productColors});
  const [percent, finalPrice, priceProduct] = usePriceFinal({
    firstPrice,
    productColors,
    weight,
    productDiscount,
    generalDiscount,
    delivery,
    selectColor,
    setSelectColor,
    selectSize,
    setSelectSize,
    countFinal,
  });
    useSelectAttribute({
      productColors,
      setSelectColor,
      selectColor,
      selectSize,
      setSelectSize,
    });

  return (
    <div className="item">
      <Link href={"/product/" + item.slug}>
        <ColorsMini item={item} />
        <div className="inner_item">
          <div className="image">
           <ImageProduct image={item.image} alt={item.name} width={800} height={800}/>
          </div>
          <div className="info">
            <span className="name">{item.name}</span>

            <section className="price_parent">
              {number > 0 ? (
                <>
                  <span className="price">
                    {finalPrice &&
                      finalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="toman">تومان</span>
                </>
              ) : (
                <span className="not_enought">ناموجود</span>
              )}
            </section>

            {percent > 0 && number > 0 && (
              <section className="discount_parent">{percent}٪</section>
            )}

            <section className="price_discount_parent">
              <del className="price_discount">
                {priceProduct &&
                  percent > 0 &&
                  number > 0 &&
                  priceProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </del>
            </section>
          </div>
        </div>
      </Link>
    </div>
  );
}
