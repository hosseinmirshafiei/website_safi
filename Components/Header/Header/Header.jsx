
import React, { useState, useEffect, useContext } from "react";
import Search from "../../Home/Search/Search";
import Menu from "../Menu/Menu";
import Category from "../CtegoryProducts/DeskTop/Category";
import Logo from "../../Home/Logo/Logo";
import { get, post } from "@/http/http";
import UrlBase from "@/http/UrlHttp";
import Link from "next/link";
import CartIcon from "@/Components/Header/CartIcon/CartIcon";
import LoginRegisterBtn from "@/Components/Header/LoginRegister/LoginRegisterBtn";
import { Context } from "@/Components/Context/Context";
import WalletIcon from "../WalletIcon/WalletIcon";
import MenuIcon from "../Menu/MenuIcon";
import MenuMobile from "../Menu/MenuMobile";

export default function Header() {

  const [showCategories, setShowCategories] = useState(0);
  const {info , setInfo} = useContext(Context)
  
  useEffect(()=>{
    if(showCategories == 0){
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
    }else{
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "6.5px";
    }
  },[showCategories])

  function handleShowCategories() {
    setShowCategories(1);
  }
  function handleHideCategories() {
    setShowCategories(0);
  }

  return (
    <>
        <header className="header">
          <div className="header_inner">
            <div className="row_one">
              <Link href={"/"}>
                <Logo settings={info && info.settings} />
              </Link>
              <Search />
              <div className="menu_icons">
                <WalletIcon />
                <LoginRegisterBtn />
                <CartIcon response={info} />
              </div>
            </div>
            <MenuMobile/>
            <Menu
              showCategories={showCategories}
              setShowCategories={setShowCategories}
              handleShowCategories={handleShowCategories}
              handleHideCategories={handleHideCategories}
            />
            {showCategories == 1 && (
              <div className="categories_parent">
                <Category
                  handleShowCategories={handleShowCategories}
                  handleHideCategories={handleHideCategories}
                  response={info}
                />
              </div>
            )}
          </div>
        </header>
    </>
  );
}
