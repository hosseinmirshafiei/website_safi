import { post } from "@/http/http";
import UrlBase from "@/http/UrlHttp";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../Context/Context";
import ErrorMessgae from "../Error/ErrorMessage";
import { usePriceFinal } from "../productLogics/usePriceFinal";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import ImageCart from "./ImageCart";

export default function CartItem({
  item,
  generalDiscount,
  delivery,
  changePriceFinal,
  setChangePriceFinal,
  totalCartList,
  setTotalCartList,
  submitCart,
  setSubmitCart,
  setCart,
}) {
  const [firstPrice, setFirstPrice] = useState(item.product.price);
  const [productColors, setProductColors] = useState([item.attribute]);
  const [productDiscount, setProductDiscount] = useState(item.product.discount);
  const [number, setNumber] = useState(parseInt(parseInt(item.attribute.number)));
  const [weight, setWeight] = useState(parseInt(item.product.weight));
  const [selectColor, setSelectColor] = useState(item.attribute);
  const [selectSize, setSelectSize] = useState(item.attribute);
  const [countFinal, setCountFinal] = useState(parseInt(item.number));
  const [limit, setLimit] = useState(0);
  const [load, setLoad] = useState(0);
  const [error, setError] = useState(0);
  const [errorEnoughCartItem, setErrorEnoughCartItem] = useState(0);
  const { cartContext, setCartContext } = useContext(Context);
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

  useEffect(()=>{
    handleCheckEnoughCartItem()
  },[submitCart])

    useEffect(() => {
      if (errorEnoughCartItem == 1) {
        handleScrolltoErrorElement();
      }
    }, [errorEnoughCartItem , submitCart]);

        function handleScrolltoErrorElement() {
          var error_validation_element =
            document.getElementById("error_enough");
          error_validation_element.scrollIntoView();
          window.scrollBy({ top: -200, behavior: "smooth" });
        }

  function handleCheckEnoughCartItem(){

     if (parseInt(item.number) > parseInt(item.attribute.number)) {
       setErrorEnoughCartItem(1);
     } else {
       setErrorEnoughCartItem(0);
     }
  }

  useEffect(() => {
    handleTotalCartListFinal();
  }, [finalPrice]);

  function handleTotalCartListFinal() {
    if (finalPrice) {
      var cart_find = totalCartList.find(({ id }) => id === item.id);
      if (cart_find) {
        var total = totalCartList;
        total.forEach((element) => {
          if (element.id == cart_find.id) {
            element.finalPrice = finalPrice;
            element.count = countFinal;
          }
        });
        setTotalCartList(total);
      } else {
        setTotalCartList((totalCartList) => [
          ...totalCartList,
          { id: item.id, finalPrice: finalPrice ,count: countFinal },
        ]);
      }
      setChangePriceFinal(changePriceFinal + 1);
    }
  }

  function handlePlus() {
    if (countFinal < number) {
       var count_updated = parseInt(countFinal) + 1; 
      setCountFinal(count_updated);
    } else {
      setLimit(1);
    }
  }

  function handleDown() {
    if (countFinal > 1) {
      var count_updated = parseInt(countFinal) - 1; 
      setCountFinal(count_updated);
    }
  }
  function handleDelete() {
    if (load == 0) {
      setLoad(1);
      var request = { id: item.id };
      post("/api/market/cart/delete", request)
        .then((response) => {
          setLoad(0);
          setCart(response);
          setCartContext(response);
          const totalCartList_updated = totalCartList.filter((el) => el.id !== item.id);
          setTotalCartList(totalCartList_updated);
        })
        .catch((error) => {
          setLoad(0);
          setError(1);
        });
    }
  }

  return (
    <>
      {item && item.product && (
        <div className="item">
          {errorEnoughCartItem == 1 && (
            <div className="error_enough_cart_item" id="error_enough">
              متأسفانه تنها
              <span className="number">{item.attribute.number}</span>
              عدد از این محصول در انبار باقی مانده است.
            </div>
          )}
          <div className="image_parent">
            <Link href={"./product/" + item.product.slug}>

              <ImageCart
                image={item.product.image}
                alt={item.name}
                width={110}
                height={110}
              />
            </Link>
          </div>
          <div className="info">
            <div className="name">
              <div>{item.product.name}</div>
            </div>
            {item.attribute.color && item.attribute.color.color && (
              <div className="color_parent">
                <div>رنگ</div>
                <div
                  className="color"
                  style={{ background: item.attribute.color.color }}
                ></div>
              </div>
            )}
            {item.attribute.size && item.attribute.size.size && (
              <div className="size_parent">
                <div className="title">اندازه : </div>
                <div className="size">{item.attribute.size.size}</div>
              </div>
            )}
            <div className="final_price">
              {finalPrice &&
                finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className="toman">تومان</span>
            </div>

            {priceProduct && (
              <div className="first_price_parent">
                <div className="first_price">
                  <>
                    <del>
                      {priceProduct
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </del>
                    <span className="toman">تومان</span>
                  </>
                </div>
                {percent && (
                  <div className="percent">
                    <span>٪</span>
                    <span>{percent}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="delete_parent">
            <button className="delete" onClick={() => handleDelete()}>
              حذف
            </button>
          </div>
          <div className="number_control">
            <button className="plus" onClick={() => handlePlus()}>
              +
            </button>
            <div className="number">{countFinal}</div>
            <button className="down" onClick={() => handleDown()}>
              -
            </button>
          </div>

          {limit == 1 && (
            <div className="error_not_enough">
              حداکثر {number} عدد از این محصول قابل خرید است.
            </div>
          )}

          {load == 1 && <SpinnerLoading />}
          {error == 1 && <ErrorMessgae setError={setError} />}
        </div>
      )}
    </>
  );
}