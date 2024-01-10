import { post } from "@/http/http";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../Context/Context";
import ErrorMessgae from "../Error/ErrorMessage";
import SpinnerLoading from "../Spinner/SpinnerLoading";

export default function Wallet({ showWallet,setShowWallet, handleShowWallet }) {
  const {setWallet , walletAmount} = useContext(Context);
  const [amount, setAmount] = useState(0);
  const [amountCharge, setAmountCharge] = useState();
  const [loading , setLoading] = useState(0)
  const [error , setError]= useState(0)
  const [errorValidation , setErrorValidation] = useState(0)

  function handleAmountWallet(e) {
    if (e.target.value.length <= 12) {
      setAmountCharge(e.target.value);
    }
    setError(0)
    setErrorValidation(0)
  }
  function handleChargeWallet() {
    if(loading == 0){
        setLoading(1)
    var request = { amount: amountCharge };
    post("/api/market/wallet/charge" , request)
    .then(response=>{
        setLoading(0)
        setError(0)
        setErrorValidation(0)
        if(response.login_state == true){
           var authority_code = response["authority_code"];
           window.location.href =
             "https://www.zarinpal.com/pg/StartPay/" +
             authority_code;
        }else{
            setShowWallet(0)
        }

    }).catch(error=>{
        setLoading(0)
        if (error.response && error.response.status == 422) {
          setErrorValidation(1);
        } else {
          setError(1);
        }
    })
   }
  }

  return (
    <>
      {showWallet == 1 && (
        <div className="wallet_parent">
          <div className="wallet">
            <div className="title_wallet">
              <img src="../wallet2.svg" />
              <span>کیف پول</span>
            </div>
            <div className="content">
              <div className="info_wallet">
                <span className="title"> موجودی کیف پول: </span>
                <span className="amount">
                  {walletAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span className="toman">تومان</span>
              </div>
              <div className="input">
                <span className="title">مبلغ شارژ</span>
                <input
                  type="tel"
                  placeHolder="مبلغ"
                  maxLength="12"
                  onChange={(e) => handleAmountWallet(e)}
                />
              </div>

              {amountCharge > 0 && (
                <div className="amount_parent">
                  <span className="amount">
                    {amountCharge
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="toman">تومان</span>
                </div>
              )}
              {errorValidation == 1 && (
                <div className="parent_error">
                  <span error="error_validation">
                    مبلغ شارژ کیف پول باید از نوع عددی باشد.
                  </span>
                </div>
              )}
            </div>

            <div className="btns">
              <button className="close_btn" onClick={() => handleShowWallet()}>
                انصراف
              </button>
              <button
                className="charge_btn"
                onClick={() => handleChargeWallet()}
              >
                شارژ کیف پول
              </button>
            </div>
          </div>
        </div>
      )}

      {loading == 1 && <SpinnerLoading />}
      {error == 1 && <ErrorMessgae setError={setError} />}
    </>
  );
}
