
import UrlBase from "@/http/UrlHttp";
import React, { useRef, useState, useEffect } from "react";
import { usePriceFinal } from "../productLogics/usePriceFinal";
import ImageOrder from "./ImageOrder";

export default function DetailOrderItem({item , generalDiscount}){
  const [firstPrice , setFirstPrice] = useState(item.product.price)
  const [productColors, setProductColors] = useState(item.attribute);
  const [weight , setWeight] = useState(item.product.weight)
  const [productDiscount , setProductDiscount]=useState(item.product.discount)
  const [selectColor, setSelectColor] = useState(item.attribute);
  const [selectSize, setSelecrSize] = useState(item.attribute);
  const [countFinal, setCountFinal] = useState(item.number);

  const [percent, finalPrice, priceProduct] = usePriceFinal({
    firstPrice,
    setFirstPrice,
    productColors,
    weight,
    productDiscount,
    generalDiscount,
    selectColor,
    setSelectColor,
    selectSize,
    countFinal,
  });

    return (
      <>
        <div className="item">
          <div className="image">
            <ImageOrder
              image={item.product.image}
              alt={item.name}
              width={130}
              height={130}
            />
          </div>
          <div className="info">
            <div className="name">{item.product.name}</div>
            <div className="number_parent">
              <div className="title">تعداد: </div>
              <div className="number">{item.number}</div>
            </div>

            <div>
              {item.attribute.color && (
                <div className="color_parent">
                  <div
                    className="color"
                    style={{ background: item.attribute.color.color }}
                  ></div>
                  <div className="color_name">{item.attribute.color.name}</div>
                </div>
              )}

              {item.attribute.size && (
                <div className="size_parent">
                  <div className="title">
                    <span>سایز</span>
                  </div>
                  <div className="size">{item.attribute.size.size}</div>
                </div>
              )}
            </div>

            <div className="price_parent">
              <div className="first_price_parent">
                <del className="first_price">
                  {firstPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </del>
                <div className="percent">
                  {percent}٪<span className="percent_title">تخفیف</span>
                </div>
              </div>
              <div className="final_price_parent">
                <div className="final_price">
                  {finalPrice &&
                    finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <span className="toman">تومان</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}