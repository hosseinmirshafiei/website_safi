import React, { useState, useEffect, useRef } from "react";
import useNumberProduct from "../productLogics/useNumberProduct";
import {usePriceFinal} from "../productLogics/usePriceFinal";
import AddToCart from "./AddToCart";

export default function PriceProduct({
  product,
  generalDiscount,
  delivery,
  selectColor,
  setSelectColor,
  selectSize,
}) {
  const [firstPrice, setFirstPrice] = useState(product.price);
  const [number, setNumber] = useState();
  const [productColors, setProductColors] = useState(product.attribute);
  const [productDiscount, setProductDiscount] = useState(product.discount);
  const [weight, setWeight] = useState(product.weight);
  const [deliveryFinalPrice, setDeliveryFinalPrice] = useState();
  const [count, setCount] = useState([]);
  const [added, setAdded] = useState([]);
  const [countFinal, setCountFinal] = useState();

  const [percent, finalPrice, priceProduct] = usePriceFinal({
    firstPrice,
    setFirstPrice,
    productColors,
    weight,
    productDiscount,
    generalDiscount,
    delivery,
    selectColor,
    setSelectColor,
    selectSize,
    countFinal,
  });

  useNumberProduct({ selectColor, selectSize,number, setNumber, productColors });

  return (
    <div className="price_parent">
      {number > 0 ? (
        <div className="price_inner">
          <div className="row_parent">
            {percent > 0 && (
              <div className="row">
                <div className="parent_first_price">
                  <div className="first_price">
                    <del className="amount">
                      {priceProduct
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </del>
                  </div>

                  <div className="percent">
                    <span>٪{percent}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="price">
                <span className="amount">
                  {finalPrice &&
                    finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span className="toman">تومان</span>
              </div>
            </div>
          </div>

          <AddToCart
            product={product}
            productColors={productColors}
            count={count}
            setCount={setCount}
            number={number}
            selectColor={selectColor}
            selectSize={selectSize}
            added={added}
            setAdded={setAdded}
            countFinal={countFinal}
            setCountFinal={setCountFinal}
          />
        </div>
      ) : (
        <div className="unavailable">
          <span>ناموجود</span>
        </div>
      )}
    </div>
  );
}
