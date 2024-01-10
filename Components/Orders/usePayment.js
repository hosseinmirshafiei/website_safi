
import { post } from "@/http/http";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Context } from "../Context/Context";

export default function usePayment({
  item,
  load,
  setLoad,
  setError,
  paymentWay,
  setShowPaymentWays,
}) {
  const router = useRouter();
  const { setWalletAmount } = useContext(Context);
  const handlePayment = () => {
    if (load == 0) {
      setLoad(1);
      var request = { id: item.id, payment_way: paymentWay };
      post("/api/market/orders/payment", request)
        .then((response) => {
          setLoad(0);
          setError(0);
          if (response.login_state == true && response.payment_able == true) {
            if (response["authority_code"] != null) {
              var authority_code = response["authority_code"];
              window.location.href =
                "https://www.zarinpal.com/pg/StartPay/" + authority_code;
            } else {
              router.push("/orders");
              setShowPaymentWays(0)
              var item_old = item;
              item_old.payment = 1;
            }
            setWalletAmount(response.wallet_amount);
          } else if (
            response.login_state == false ||
            response.payment_able == false
          ) {
            router.push("/cart");
          }
        })
        .catch((error) => {
          setLoad(0);
          setError(1);
        });
    }
  };
  return [handlePayment];
}