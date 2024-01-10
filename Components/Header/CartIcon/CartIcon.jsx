
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Context } from "../../Context/Context";
import { useRouter } from "next/router";

export default function CartIcon() {
  const [count , setCount]= useState(0)
  const { cartContext, setCartContext } = useContext(Context);
  
  useEffect(()=>{
    if(cartContext){
    var number = 0;
    cartContext.forEach(element => {
        number = number + parseInt(element.number);
    });
    setCount(number)
    }else{
      setCount(0)
    }
  },[cartContext])

  const router = useRouter();
  function handleGoToPage() {
    if(router.pathname != "/cart"){
      router.push("/cart");
    }
  }

  return (
        <div className="cart_icon" onClick={()=>handleGoToPage()}>
          {count > 0 && <div className="number">{count}</div>}
          <img src="../bascket.svg" />
        </div>
  );
}
