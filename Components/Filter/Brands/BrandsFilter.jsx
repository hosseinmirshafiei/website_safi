import { Context } from "../Context/Context"
import React, { useState, useEffect, useContext } from "react";
import BrandItem from "./BrandItem";
export default function BrandsFilter(){

    const {brands} = useContext(Context)
    const [showBrands , setShowBrands] = useState(0)
    const handleShowBrands = ()=>{
        if(showBrands == 1){
            setShowBrands(0)
        }else{
            setShowBrands(1)
        }
    }

    return (
      <>
        {brands && brands.length > 0 && (
          <div className="brands_parent">
            <div className="property_parent" onClick={() => handleShowBrands()}>
              <div className="property_name">انتخاب براساس برند</div>
              <button class="values_btn_show">
                <img class="down" src="/dropdown2.svg" />
              </button>
            </div>
            {showBrands == 1 && (
              <div className="brands">
                <div className={showBrands == 0 ? "values" : "values visisble"}>
                  {brands.map((item, index) => (
                    <BrandItem item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
}