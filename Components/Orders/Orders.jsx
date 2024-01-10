import React, { useRef, useState, useEffect } from "react";
import DetailOrder from "./DetailOrder";
import OrderItem from "./OrderItem";

export default function Orders({ response }) {
  const [orders, setOrders] = useState(response.orders);
  console.log(response);
  return (
    <>
      {orders && orders.length > 0 ? (
        <div className="orders">
          <div className="orders_title">
            <h2>سفارشات</h2>
          </div>
          {orders.map((item, index) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="cart_empty">
          <img src="./cart2.svg" alt="" />
          <span>سفارشی وجود ندارد</span>
        </div>
      )}
    </>
  );
}
