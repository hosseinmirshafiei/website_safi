
import { post } from "@/http/http";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../Context/Context";

export default function Logout({ handleLogOutModal, showModalLogout, setShowModalLogOut }) {
  const [loader, setLoader] = useState(0);
  const [error, setError] = useState(0);
  const modalLogout = useRef();
  const { setCartContext, setIsLogin, setUserContext } = useContext(Context);
  const router = useRouter()

  function handleLogout() {
    if (loader == 0) {
      setLoader(1);
      post("/api/market/login-register/logout")
        .then((response) => {
          setLoader(0);
          setError(0);
          setShowModalLogOut(0);
          setCartContext([])
          setIsLogin(false)
          setUserContext()
          router.push("/")
        })
        .catch((error) => {
          setLoader(0);
          setError(1);
        });
    }
  }

  return (
    <>
      {showModalLogout == 1 && (
        <div className="logout_modal">
          {error == 1 && (
            <div className="parent_error">
              <span>اتصال اینترنت وجود ندارد.</span>
            </div>
          )}

          <div ref={modalLogout} className="inner_logout_modal">
            <div className="logout_close_modal">
              <span onClick={() => handleLogOutModal()}>&#215;</span>
            </div>
            <span className="title">خروج از حساب کاربری</span>
            <span className="text">
              آیا با اطمینان قصد خروج از حساب کاربری خود را دارید؟
            </span>
            <div className="btns">
              <div className="cansel">
                <div onClick={() => handleLogOutModal()}>انصراف</div>
              </div>
              <div className="ok">
                <div onClick={() => handleLogout()}>خروج</div>
              </div>

              {loader == 1 && <div className="lds-dual-ring"></div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}