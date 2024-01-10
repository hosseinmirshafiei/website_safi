import { post } from "@/http/http";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect , useContext } from "react";
import { Context } from "../Context/Context";
import ErrorMessgae from "../Error/ErrorMessage";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import DetailOrder from "./DetailOrder";
import PaymentWays from "./PaymentWays";
import usePayment from "./usePayment";

export default function OrderItem({ item }) {
    const [showDetail , setShowDetail]= useState(0)
    const [load , setLoad] = useState(0)
    const [error, setError] = useState(0);
    const [paymentWay , setPaymentWay]= useState(1)
    const [showPaymentWays ,setShowPaymentWays] = useState(0)
    const { setWalletAmount } = useContext(Context);
    const router = useRouter()
    const goToDetailOrder = ()=>{
       router.push("/orders/"+item.id)
    }

    const handleShowDetail=()=>{
       if(showDetail == 0){
        setShowDetail(1)
       }else{
        setShowDetail(0)
       }
    }
    const [handlePayment] = usePayment({
      item,
      load,
      setLoad,
      setError,
      paymentWay,
      setShowPaymentWays,
    });

    function handleShowPaymentWays(){
      if(showPaymentWays == 0){
           setShowPaymentWays(1)
      }else{
         setShowPaymentWays(0)
      }
    }

  return (
    <>
      <div className="order_item">
        <div className="info">
          <div className="payment_state">
            {item.payment == 0 ? (
              <>
                <div className="no">پرداخت نشده</div>
                <div className="warning">
                  حداکثر تا یک ساعت، قابل پرداخت می باشد.
                </div>
              </>
            ) : (
              <span className="yes">پرداخت شده</span>
            )}
          </div>
          <div className="address_parent">
            <span className="address">{item.address.address}</span>
          </div>
          <div className="price_parent">
            <span className="title">پرداخت : </span>
            <span className="price">
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
          <div className="date">
            <span className="title">تاریخ ثبت سفارش : </span>
            <span>{new Date(item.created_at).toLocaleDateString("fa-IR")}</span>
          </div>
        </div>

        <div className="btns">
          <button onClick={() => handleShowDetail()}>جزئیات</button>
          {item.payment == 0 && (
            <button onClick={() => handleShowPaymentWays()}>پرداخت</button>
          )}
        </div>
      </div>
      {showPaymentWays == 1 && item.payment == 0 && (
        <PaymentWays
          item={item}
          paymentWay={paymentWay}
          setPaymentWay={setPaymentWay}
          handleShowPaymentWays={handleShowPaymentWays}
          setShowPaymentWays={setShowPaymentWays}
          handlePayment={handlePayment}
        />
      )}

      {showDetail == 1 && (
        <DetailOrder
          item={item}
          handleShowDetail={handleShowDetail}
          handlePayment={handlePayment}
          handleShowPaymentWays={handleShowPaymentWays}
        />
      )}
      {error == 1 && <ErrorMessgae setError={setError} />}
      {load == 1 && <SpinnerLoading />}
    </>
  );
}
