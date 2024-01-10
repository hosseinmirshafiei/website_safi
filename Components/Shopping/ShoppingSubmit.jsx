import { post } from "@/http/http";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../Context/Context";
import ErrorMessgae from "../Error/ErrorMessage";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import PaymentBoxMobile from "./PaymentBoxMobile";
import ShoppByWallet from "./ShoppByWallet";

export default function ShoppingSubmit({ count, totalPrice, deliveryPrice , paymentWay}) {
  const [load, setLoad] = useState(0);
  const [error, setError] = useState(0);
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [showShoppByWallet , setShowShoppWallet] = useState(0)
  const [wallet , setWallet] = useState()
  const [walletState , setWalletState] = useState()
  const [orderPrice , setOrderPrice] = useState(0)
  const {setWalletAmount , setCartContext} = useContext(Context)
  const router = useRouter()
  
  useEffect(()=>{
    setPaymentPrice(totalPrice + deliveryPrice);
  },[])

  function handleSubmitShopping() {
    if(load == 0){
    setLoad(1)
    var request={payment_way : paymentWay}
    post("/api/market/shopping/submit" , request)
    .then(response=>{
      setLoad(0)
      setError(0)
      setCartContext([]);
      if (response.login_state == true && response.error_number == false) {
         if (response["authority_code"] != null) {
           console.log("success");
           var authority_code = response["authority_code"];
           window.location.href =
             "https://www.zarinpal.com/pg/StartPay/" + authority_code;
         } else {
           router.push("/orders");
         }
         setWalletAmount(response.wallet_amount);
      } else if (
        response.login_state == false ||
        response.error_number == true
      ) {
        router.push("/cart");
      }
    }).catch(error=>{
      setLoad(0)
      setError(1)
    })
   }
  }

  function handleWalletPayment(){
    if(paymentWay == 2 && load == 0){
      setLoad(1)
    post("/api/market/wallet/wallet-state")
      .then((response) => {
              setLoad(0);
              setError(0);
              if(response.wallet_state == true){
                  setWalletState(true)
              }else{
                  setWalletState(false);
              }
              setWallet(response.wallet)
              setOrderPrice(response.payment_price)
              setShowShoppWallet(1);
      })
      .catch((error) => {
              setLoad(0);
              setError(1);
      });
    }
  }

  return (
    <>
      <div className="cart_submit">
        <div className="row">
          <div className="title">هزینه ارسال</div>
          <div className="price_parent">
            <span className="price">
              {deliveryPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
        </div>
        <div className="row">
          <div className="title">
            <span>قیمت کالاها</span>
            <span className="count_cart">{count}</span>
          </div>
          <div className="price_parent">
            <span className="price">
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
        </div>

        <div className="row">
          <div className="title">
            <span>قابل پرداخت</span>
          </div>
          <div className="price_parent">
            <span className="price">
              {paymentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
        </div>

          <PaymentBoxMobile paymentWay={paymentWay}  paymentPrice={paymentPrice}  handleSubmitShopping={handleSubmitShopping} handleWalletPayment={handleWalletPayment}/>

        <div className="cart_total_price_button">
          {paymentWay == 1 && (
            <button onClick={() => handleSubmitShopping()}>پرداخت</button>
          )}
          {paymentWay == 2 && (
            <button onClick={() => handleWalletPayment()}>تأیید</button>
          )}
        </div>
        {showShoppByWallet == 1 && (
          <ShoppByWallet
            walletState={walletState}
            wallet={wallet}
            orderPrice={orderPrice}
            handleSubmitShopping={handleSubmitShopping}
            setShowShoppWallet={setShowShoppWallet}
          />
        )}
        {load == 1 && <SpinnerLoading />}
        {error == 1 && <ErrorMessgae setError={setError} />}
      </div>
    </>
  );
}
