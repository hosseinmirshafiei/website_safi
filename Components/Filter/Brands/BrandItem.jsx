import React, { useState , useEffect, useContext } from "react";
import { Context } from "../Context/Context";

export default function BrandItem({ item }) {

  const {brandsSelected , setBrandSelected , setFiltered , filtered} = useContext(Context) 
  const [checked , setChecked] = useState()
  const handleChecked = () => {
     if(checked){
       setChecked()
       var brandsSelectedUpdated = brandsSelected.filter((el)=>{
        return el != item.brand.id;
       })
       setBrandSelected(brandsSelectedUpdated)
     }else{
       setChecked(item)
       setBrandSelected((brandsSelected)=>[...brandsSelected , item.brand.id])
     }
     setFiltered(filtered+1)  
  };
    useEffect(() => {
      if (brandsSelected.length == 0) {
        handleClearChecked();
      }
    }, [brandsSelected]);
    function handleClearChecked() {
      setChecked();
    }

  return (
    <div className="value_item">
      <div className="check_box">
        <div
          className={checked && item.id == checked.id ? "check" : "uncheck"}
          onClick={() => handleChecked()}
        ></div>
      </div>
      <div className="label_parent">
        <label className="label" onClick={() => handleChecked()}>
          {item.brand.persian_name}
        </label>
      </div>
    </div>
  );
}
