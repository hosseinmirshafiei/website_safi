import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
export default function Menu({ handleShowCategories, handleHideCategories }) {
  return (
    <>
      <div className="menu">
        <div className="inner">
          <div className="category_content">
            {/* <button
              onMouseOver={() => handleShowCategories()}
              onMouseOut={() => handleHideCategories()}
            >
              دسته بندی کالاها
            </button> */}
            <Link href="/">
              <button>
                صفحه اصلی
              </button>
            </Link>
            <Link href="/products/تألیفات">
              <button>
                تألیفات
              </button>
            </Link>
            <Link href="/offers">
              <button>تخفیف ها و پیشنهاد ها</button>
            </Link>
            <Link href="/biography">
              <button>زندگی نامه</button>
            </Link>
            <Link href="/contact-us">
              <button>ارتباط با ما</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
