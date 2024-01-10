import React, { useState, useEffect, useRef } from "react";

export function usePriceFinal({
  firstPrice,
  productColors,
  weight,
  productDiscount,
  generalDiscount,
  delivery,
  selectColor,
  selectSize,
  countFinal,
}) {
  const [priceProduct, setPriceProduct] = useState();
  const [percent, setPercent] = useState();
  const [finalPrice, setFinalPrice] = useState();
  let deliveryPrice = 0;
  let deliveryPriceWeight = 0;
  let price = 0;

  useEffect(() => {
    if (productDiscount) {
      calculatePrice(productDiscount);
    } else {
      if (generalDiscount && generalDiscount.status == 1) {
        calculatePrice(generalDiscount);
      } else {
        calculatePrice();
      }
    }
  }, [selectColor, priceProduct , selectSize , countFinal]);


  function handleFirstPrice() {
    if (selectColor || selectSize) {
        var price_increase = 0;
      if (selectSize && selectColor == "noColors") {
         price_increase = selectSize.price_increase;
      } else if (selectSize && !selectColor) {
         price_increase = selectSize.price_increase;
      } else if (selectColor && selectColor != "noColors") {
         price_increase = selectColor.price_increase;
      }
      price = parseInt(firstPrice + price_increase);
      var first_price = handleFinalPrice(price);
      setPriceProduct(first_price);
    } 
    else{
      productColors.forEach((element) => {
        if (element.color_id == null && element.size_id == null && element.status == 1) {
            price = parseInt(firstPrice);
            var first_price = handleFinalPrice(price);
            setPriceProduct(first_price);
        }
      });
    }
  }

  function handlePrcentDiscount(price, price_discounted) {
    var percent_product = ((price - price_discounted.toFixed()) / price) * 100;
    return percent_product;
  }

  function handleFinalPrice(amount) {
    var price_final =
      (amount * countFinal);
      //  + (deliveryPrice + deliveryPriceWeight * (weight * countFinal / 1000));
    return price_final;
  }

  // function handleDelivery() {
  //   if (delivery) {
  //     deliveryPrice = parseInt(delivery.sefareshiBase);
  //     deliveryPriceWeight = parseInt(delivery.sefareshiWeight);
  //   }
  // }

  function calculatePrice(Discount) {
    // handleDelivery();
    handleFirstPrice();
    //////
    if (Discount) {
      var discount = Discount.percent_discount;
      var maximum_discount = Discount.maximum_discount;
      var percent_value = price * (discount / 100);
      if (maximum_discount <= 0 || percent_value <= maximum_discount) {
        var price_discounted = price * ((100 - discount) / 100);
        var price_final = handleFinalPrice(price_discounted);
        var percent_product = handlePrcentDiscount(price, price_discounted);
        setFinalPrice(price_final.toFixed());
        setPercent(percent_product.toFixed());
      } else {
          var price_discounted = price - maximum_discount;
          var price_final = handleFinalPrice(price_discounted);
          var percent_product = handlePrcentDiscount(price, price_discounted);
          setFinalPrice(price_final.toFixed());
          setPercent(percent_product.toFixed());
      }
    } else {
      var price_final = handleFinalPrice(price);
      setFinalPrice(price_final.toFixed());
    }
  }

  return [percent, finalPrice, priceProduct];
}
