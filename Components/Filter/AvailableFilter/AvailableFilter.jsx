import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context/Context";
export default function AvailableFilter({ handleFilter, available, setAvailable }) {
  const {filtered , setFiltered} = useContext(Context)
  const handleAvailable = () => {
    if(available == 0){
        setAvailable(1);
    }else{
        setAvailable(0)
    }
    setFiltered(filtered + 1);
  };
  return (
    <>
      <div>
        <div className="property_parent">
          <div className="property_name">فقط کالاهای موجود</div>
          <label class="toggle" for="myToggle">
            <input
              class="toggle__input"
              name=""
              type="checkbox"
              id="myToggle"
              onClick={() => handleAvailable()}
            />
            <div
              class={available == 0 ? "toggle__fill" : "toggle__fill checked"}
            ></div>
          </label>
        </div>
      </div>
    </>
  );
}
