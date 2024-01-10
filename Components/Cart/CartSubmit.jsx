import { post } from "@/http/http";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../Context/Context";
import ErrorMessgae from "../Error/ErrorMessage";
import LoginRegister from "../Header/LoginRegister/LoginRegister";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import CartBoxMobile from "./CartBoxMobile";

export default function CartSubmit({
  cart,
  setCart,
  totalCartPrice,
  setTotalCartPrice,
  changePriceFinal,
  totalCartList,
  submitCart,
  setSubmitCart,
}) {
  const [count, setCount] = useState(0);
  const [load, setLoad] = useState(0);
  const [error, setError] = useState(0);
  const [showLoginRegister, setShowLoginRegister] = useState(0);
  const [target , setTarget] = useState()
  const [loginSuccessCart , setLoginSuccessCart]= useState(0)
  const { cartConttext, setCartContext , isLogin} = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    handleTotalCartPrice();
  }, [changePriceFinal , totalCartList]);

  function handleTotalCartPrice() {
    if (totalCartList && totalCartList.length > 0) {
      var price = 0;
      var number = 0;
      totalCartList.forEach((element) => {
        if (element.finalPrice) {
          price = price + parseInt(element.finalPrice);
          number = number + parseInt(element.count);
        }
      });
      setTotalCartPrice(price);
      setCount(number);
    }
  }

  function handleSubmitCart() {
    if(isLogin == true){
    if (load == 0) {
      setLoad(1);
      var request = { cart: totalCartList };
      post("/api/market/cart/submit", request)
        .then((response) => {
          setLoad(0);
          setError(0);
          setCartContext(response.cart);
          handleTargetAfterSubmitCart(response);
          setCart(response.cart);
          setSubmitCart(submitCart + 1);
        })
        .catch((error) => {
          setLoad(0);
          setError(1);
        });
    }
  }else{
    setShowLoginRegister(1);
  }
  }

  useEffect(() => {
    if (loginSuccessCart == 1) {
      handleSubmitCart();
    }
  }, [loginSuccessCart]);

  function handleTargetAfterSubmitCart(response) {
    if (
      user_state != "token" &&
      response.cart &&
      response.cart.length > 0
    ) {
      var user_state = response.user_state;
      if (user_state == "token" && response.result_submit == "success") {
        router.push("/shopping");
      }
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <div className="cart_submit">
        <div className="row price_items">
          <div className="title">
            <span>قیمت کالاها</span>
            <span className="count_cart">{count}</span>
          </div>
          <div className="price_parent">
            <span className="price">
              {totalCartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
        </div>

        <div className="row">
          <div className="title">
            <span>جمع سبد خرید</span>
          </div>
          <div className="price_parent">
            <span className="price">
              {totalCartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
        </div>

        <div className="cart_total_price_button">
          <button onClick={() => handleSubmitCart()}>ثبت سفارش</button>
        </div>

        <CartBoxMobile
          totalCartPrice={totalCartPrice}
          handleSubmitCart={handleSubmitCart}
        />

        {load == 1 && <SpinnerLoading />}
        {error == 1 && <ErrorMessgae setError={setError} />}
        {showLoginRegister == 1 && (
          <LoginRegister
            modal={showLoginRegister}
            setModal={setShowLoginRegister}
            target={target}
            loginSuccessCart={loginSuccessCart}
            setLoginSuccessCart={setLoginSuccessCart}
          />
        )}
      </div>
    </>
  );
}
