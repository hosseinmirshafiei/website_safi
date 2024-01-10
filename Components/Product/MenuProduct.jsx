import React, { useState, useEffect, useLayoutEffect } from "react";
export default function MenuProduct() {
  const [menu , setMenu] = useState(["معرفی" , "نظرات کاربران"]);
  return (
    <>
      <div className="menu_product">
        {menu.map((item ,index) => (
          <div className="item">{item}</div>
        ))}
      </div>
    </>
  );
}
