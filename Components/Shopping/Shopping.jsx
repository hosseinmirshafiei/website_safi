import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from "react";
import Address from "./Address/Address";
import { Context } from "../Context/Context";
import PaymentWays from "./PaymentWays/PaymentWays";
import ProductItem from "./ProductItem";
import ShoppingSubmit from "./ShoppingSubmit";

export default function Shopping({ response }) {

  const [cart, setCart] = useState(response.cart);
  const [address, setAddress] = useState(response.address);
  const [addressActive, setAddressActive] = useState(response.address_active);
  const [cartCount , setCartCount] = useState(response.cart_count)
  const [totalPrice, setTotalPrice] = useState(response.total_price);
  const [deliveryPrice, setDeliveryPrice] = useState(response.delivery_price);
  const [provinceCities , setProvinceCities] = useState(response.province_cities)
  const [paymentWay, setPaymentWay] = useState(1);

  const router = useRouter()
  
  useEffect(()=>{
   if(!cart || cart && cart.length <=0){
     router.push("/")
   }
  },[cart])

  return (
    <>
      <div className="shopping_parent">
        {cart && cart.length > 0 && (
          <>
            <div className="content">
              {address && (
                <Address
                  address={address}
                  setAddress={setAddress}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  provinceCities={provinceCities}
                />
              )}
              <PaymentWays
                paymentWay={paymentWay}
                setPaymentWay={setPaymentWay}
              />
              <div className="products">
                <div className="cart_count_parent">
                  <span className="cart_count">{cartCount}</span>
                  <span className="title">کالا</span>
                </div>
                {cart.map((item, index) => (
                  <ProductItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            <ShoppingSubmit
              count={cartCount}
              totalPrice={totalPrice}
              deliveryPrice={deliveryPrice}
              paymentWay={paymentWay}
            />
          </>
        )}
      </div>
    </>
  );
}
