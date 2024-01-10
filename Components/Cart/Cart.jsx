import React, { useState, useEffect, useRef , useContext } from "react";
import CartItem from "./CartItem";
import { Context } from "../Context/Context";
import CartSubmit from "./CartSubmit";

export default function Cart({response}) {
  const [cart, setCart] = useState(response.cart);
  const [generalDiscount , setGeneralDiscount]= useState(response.general_discount)
  const [delivery , setDelivery] = useState(response.delivery)
  const [totalCartList , setTotalCartList] = useState([])
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [changePriceFinal , setChangePriceFinal] = useState(0)
  const [submitCart, setSubmitCart] = useState(0);
  const {cartContext , setCartContext , isLogin}= useContext(Context)
  const [renderComponent , setRenderComponent] = useState(0)

  useEffect(()=>{
    setCartContext(cart)
  } , [cart])

  useEffect(()=>{
    if(renderComponent == 1){
     setCart(cartContext)
    }
    setRenderComponent(1)
  },[isLogin])
  

  return (
    <div className="cart_parent">
      {cart && cart.length > 0 && (
        <>
          <div className="cart_list">
            <div className="title">
              <h2>در سبد خرید شما</h2>
            </div>
            {cart.map((item, index) => (
              <CartItem
                item={item}
                key={item.id}
                generalDiscount={generalDiscount}
                delivery={delivery}
                setTotalCartList={setTotalCartList}
                totalCartList={totalCartList}
                setChangePriceFinal={setChangePriceFinal}
                changePriceFinal={changePriceFinal}
                submitCart={submitCart}
                setSubmitCart={setSubmitCart}
                setCart={setCart}
              />
            ))}
          </div>
          <CartSubmit
            cart={cart}
            setCart={setCart}
            totalCartPrice={totalCartPrice}
            setTotalCartPrice={setTotalCartPrice}
            changePriceFinal={changePriceFinal}
            totalCartList={totalCartList}
            submitCart={submitCart}
            setSubmitCart={setSubmitCart}
          />
        </>
      )}

      {cart && cart.length <= 0 && (
        <div className="cart_empty">
          <img src="./cart2.svg" alt="" />
          <span>سبد خرید شما خالی است.</span>
        </div>
      )}
    </div>
  );
}
