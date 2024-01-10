import { Context } from "@/Components/Context/Context";
import Wallet from "@/Components/Wallet/Wallet";
import UrlBase from "@/http/UrlHttp";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import ImageProfile from "./ImageProfile";
import adminUrl from "@/http/adminUrl";


export default function MiniProfile({handleLogOutModal , profile, setProfile}) {
  const { userContext} = useContext(Context);
  const [showWallet, setShowWallet ]= useState(0);

  function handleShowWallet(){
    if(showWallet == 0){
      setShowWallet(1)
      setProfile(0)
    }else{
      setShowWallet(0)
    }
  }

  return (
    <>
      {profile == 1 && (
        <div className="profile_user">
          {userContext && userContext.mobile && (
            <>
              <button>
                <ImageProfile
                  image={
                    userContext.image && userContext.image != null
                      ? UrlBase + userContext.image
                      : "/images/avatar.png"
                  }
                  alt={""}
                  width={200}
                  height={200}
                />
                
                <div className="mobile">{userContext.mobile}</div>
                <Link href="/profile">
                  <button className="edit_profile">ویرایش حساب کاربری</button>
                </Link>
              </button>
            </>
          )}
          <Link href="/cart">
            <button>
              <img src="../cart-menu.svg" />
              <div>سبد خرید</div>
            </button>
          </Link>
          <Link href="/orders">
            <button>
              <img src="../orders-menu2.svg" />
              <div>سفارشات</div>
            </button>
          </Link>
          <button onClick={() => handleShowWallet()}>
            <img src="../wallet-menu.svg" />
            <div>کیف پول</div>
          </button>
          {userContext && userContext.is_admin == 1 && (
            <Link href={adminUrl}>
            <button>
              <img src="../admin-menu.svg" />
              <div>پنل مدیریت</div>
            </button>
            </Link>
          )}
          <button onClick={() => handleLogOutModal()}>
            <img src="../logout-menu.svg" />
            <div>خروج از حساب کاربری</div>
          </button>
        </div>
      )}

      <Wallet
        showWallet={showWallet}
        setShowWallet={setShowWallet}
        handleShowWallet={handleShowWallet}
      />
    </>
  );
}