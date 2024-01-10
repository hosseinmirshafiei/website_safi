import ShoppByWallet from "../Shopping/ShoppByWallet";
import React, { useRef, useState, useEffect } from "react";
import ErrorMessgae from "../Error/ErrorMessage";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import { post } from "@/http/http";
export default function PaymentWays({item , paymentWay , setPaymentWay ,handleShowPaymentWays ,handlePayment}){

    const [wallet , setWallet]= useState()
    const [walletState , setWalletState]=useState()
    const [load , setLoad] =useState(0)
    const [error , setError]= useState(0)
    const [orderPrice , setOrderPrice] = useState(0)
    const [showShoppByWallet , setShowShoppWallet] =useState(0)
    function handleSelectPaymentWay(e) {
      setPaymentWay(e.target.value);
    }

      function handleWalletPayment() {
        if (paymentWay == 2 && load == 0) {
          setLoad(1);
          var request={"order_id": item.id}
          post("/api/market/wallet/wallet-state-order" , request)
            .then((response) => {
              setLoad(0);
              setError(0);
              if (response.wallet_state == true) {
                setWalletState(true);
              } else {
                setWalletState(false);
              }
              setWallet(response.wallet);
              setOrderPrice(response.payment_price);
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
        <div className="payment_ways_parent">
          <div className="payment_ways">
            <div className="title">انتخاب روش پرداخت</div>
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
            <div className="btns">
              <button
                className="close_btn"
                onClick={() => handleShowPaymentWays()}
              >
                انصراف
              </button>
              {paymentWay == 1 ? (
                <button className="payment_btn" onClick={() => handlePayment()}>
                  پرداخت
                </button>
              ) : (
                paymentWay == 2 && (
                  <button
                    className="payment_btn"
                    onClick={() => handleWalletPayment()}
                  >
                    پرداخت
                  </button>
                )
              )}
            </div>
          </div>
          {error == 1 && <ErrorMessgae setError={setError} />}
          {load == 1 && <SpinnerLoading />}
        </div>
        {showShoppByWallet == 1 && (
          <ShoppByWallet
            walletState={walletState}
            wallet={wallet}
            orderPrice={orderPrice}
            handleSubmitShopping={handlePayment}
            setShowShoppWallet={setShowShoppWallet}
          />
        )}
      </>
    );
}