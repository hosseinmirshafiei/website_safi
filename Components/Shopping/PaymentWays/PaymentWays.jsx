
import React, { useState, useEffect, useRef, useContext } from "react";
export default function PaymentWays({paymentWay , setPaymentWay}){
    function handleSelectPaymentWay(e){
      setPaymentWay(e.target.value)
    }

    return (
      <>
        <div className="payment_ways_parent">
          <div className="title">انتخاب روش خرید</div>
          <div>
            <div className="way">
              <label
                htmlFor="1"
                className={paymentWay == 1 ? "checkBox checked" : "checkBox"}
              ></label>
              <div className="label">
                <label htmlFor="1">پرداخت اینترنتی</label>
              </div>
              <input
                id="1"
                value="1"
                type="radio"
                checked={paymentWay == 1 && "checked"}
                onChange={(e) => handleSelectPaymentWay(e)}
              />
            </div>

            <div className="way">
              <label
                htmlFor="2"
                className={paymentWay == 2 ? "checkBox checked" : "checkBox"}
              ></label>
              <div className="label">
                <label htmlFor="2">کیف پول</label>
              </div>
              <input
                id="2"
                value="2"
                type="radio"
                checked={paymentWay == 2 && "checked"}
                onChange={(e) => handleSelectPaymentWay(e)}
              />
            </div>
          </div>
        </div>
      </>
    );
}