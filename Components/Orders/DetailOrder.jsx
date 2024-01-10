import UrlBase from "@/http/UrlHttp";
import React, { useRef, useState, useEffect } from "react";
import DetailOrderItem from "./DetailOrderItem";
import usePayment from "./usePayment";

export default function DetailOrder({ item,handleShowPaymentWays, handleShowDetail, handlePayment }) {
  const [address, setAddress] = useState(item.address);
  const [cart, setCart] = useState(JSON.parse(item.cart));
  const [generalDiscount, setGeneralDiscount] = useState(
    JSON.parse(item.general_discount)
  );

  return (
    <>
      <div className="detail_order_parent">
        <div className="modal">
          <div className="state_order">
            {item.payment == 0 ?
               <span className="no_payment">در انتظار پرداخت</span>
               :
               <span className="ok_payment">پرداخت شده</span>
            }
           
          </div>
          <div className="detail_order">
            <div className="address_parent">
              <div className="address">{address.address}</div>
              <div>
                <span className="first_name">{address.first_name}</span>
                <span className="last_name">{address.last_name}</span>
              </div>
              <div className="city_parent">
                <div className="province">
                  <span className="title">استان: </span>
                  <span>{address.province}</span>
                </div>
                <div className="city">
                  <span className="title">شهر: </span>
                  <span>{address.city}</span>
                </div>
              </div>
              <div className="mobile_parent">
                <div className="mobile">
                  <span className="title">شماره همراه: </span>
                  <span>{address.mobile}</span>
                </div>
                <div className="phone">
                  <span className="title">تلفن ثابت: </span>
                  <span>{address.phone}</span>
                </div>
              </div>
              <div className="price_parent">
                <div className="delivery_price_parent">
                  <span className="title">هزینه ارسال: </span>
                  <span className="delivery_price">
                    {item.delivery_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="toman">تومان</span>
                </div>
                <div className="payment_price">
                  <span className="title">مبلغ کل پرداخت: </span>
                  <span className="total_price">
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="toman">تومان</span>
                </div>
              </div>
            </div>

            <div className="products_parent">
              {cart &&
                cart.map((item, index) => (
                  <DetailOrderItem
                    item={item}
                    key={item.index}
                    generalDiscount={generalDiscount}
                  />
                ))}
            </div>
          </div>

          <div className="navigation">
            <div className="btns">
              <button className="close" onClick={() => handleShowDetail()}>
                بستن
              </button>
              {item.payment == 0 &&
              <button
                className="payment"
                onClick={() => handleShowPaymentWays()}
              >
                پرداخت
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
