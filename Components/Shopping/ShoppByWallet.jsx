
import React, { useState, useEffect, useRef, useContext } from "react";
export default function ShoppByWallet({ walletState , wallet , orderPrice , handleSubmitShopping , setShowShoppWallet}) {

  const [priceNeed , setPriceNeed] = useState(orderPrice)

  useEffect(()=>{
    if (wallet && walletState == false) {
      setPriceNeed(orderPrice - wallet.amount);
    }
  },[walletState])
  function handleCloseModal(){
    setShowShoppWallet(0)
  }

  return (
    <>
      <div className="shopp_by_wallet_parent">
        <div>
          <div className="shopp_by_wallet">
            <section className="title">
              <span>پرداخت از طریق کیف پول</span>
            </section>
            <div className="price_parent">
              <div className="payment_price">
                <span className="title_price">مبلغ پرداخت: </span>
                <div className="amount_parent">
                  <span className="amount">
                    {orderPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="toman">تومان</span>
                </div>
              </div>
              <div className="wallet_amount">
                <span className="title_price">موجودی کیف پول: </span>
                <div className="amount_parent">
                  <span className="amount">
                    {wallet
                      ? wallet.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </span>
                  <span className="toman">تومان</span>
                </div>
              </div>
              {walletState == false && (
                <div className="price_needed">
                  <span className="title_price">نیازمند افزایش موجودی: </span>
                  <div className="amount_parent">
                    <span className="amount">
                      {priceNeed &&
                        priceNeed
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span className="toman">تومان</span>
                  </div>
                </div>
              )}
            </div>
            <div className="btns">
              <button className="close" onClick={()=>handleCloseModal()}>انصراف</button>
              {walletState == false ? (
                <button
                  className="payment_btn"
                  onClick={() => handleSubmitShopping()}
                >
                  شارژ کیف پول و پرداخت
                </button>
              ) : (
                <button
                  className="payment_btn"
                  onClick={() => handleSubmitShopping()}
                >
                  پرداخت از طریق کیف پول
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}