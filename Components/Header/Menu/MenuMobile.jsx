
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import CategoryMobile from "../CtegoryProducts/Mobile/CategoryMobile";
import MenuIcon from "./MenuIcon";

export default function MenuMobile({ handleShowCategories, handleHideCategories }) {
  const [stateMenu, setStateMenu] = useState(0);
  const [categoryMobileShow, setCategoryMobileShow] = useState(0);
  function handleOpenMenu() {
    if (stateMenu == 1) {
      setStateMenu(0);
    } else {
      setStateMenu(1);
    }
  }
  function handleShowCategory(){

    if(categoryMobileShow == 0){
        setCategoryMobileShow(1)
    }else{
        setCategoryMobileShow(0)
    }
  }

  function handleCloseMenuMobile(){
    setStateMenu(0)
  }
  return (
    <>
      <MenuIcon handleOpenMenu={handleOpenMenu} />
      {stateMenu == 1 && (
        <div className="menu_mobile">
          <button className="close" onClick={() => handleOpenMenu()}>
            <img src="/back.svg" />
          </button>
          <div className="inner">
            <div className="pages_btn_parent">
             <Link href="/">
                <button className="menu_item" onClick={()=>handleCloseMenuMobile()}>صفحه اصلی</button>
              </Link>
              <Link href="/products/کتاب">
                <button className="menu_item" onClick={()=>handleCloseMenuMobile()}>تألیفات</button>
              </Link>
              <Link href="/offers">
                <button className="menu_item" onClick={()=>handleCloseMenuMobile()}>تخفیف ها و پیشنهاد ها</button>
              </Link>
              <Link href="/biography">
                <button className="menu_item" onClick={()=>handleCloseMenuMobile()}>زندگی نامه</button>
              </Link>
              <Link href="/contact-us">
                <button className="menu_item" onClick={()=>handleCloseMenuMobile()}>ارتباط با ما</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
