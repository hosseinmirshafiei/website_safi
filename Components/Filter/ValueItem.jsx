
import { Router, useRouter } from "next/router";
import React, { useState, useEffect ,useContext} from "react";
import { Context } from "./Context/Context";

export default function ValueItem({
  item,
  property
}) {
  
  const [checked, setChecked] = useState();
  const { filtered, setFiltered, totalChecked, setTotalChecked } =
    useContext(Context);

  function addToTotalChecked() {
    setTotalChecked((totalChecked) => [
      ...totalChecked,
      { id: item.id , property_id: item.property_id},
    ]);
  }
  function removeOfTotalChecked() {
    var total_checked_filtered = totalChecked.filter(
      (el) => el.id != item.id
    );
    setTotalChecked(total_checked_filtered);
  }

  function handleChecked() {
    if(checked){
      setChecked()
      removeOfTotalChecked()
    }else{
      setChecked(item)
      addToTotalChecked()
    }
    setFiltered(filtered + 1)
  }

  useEffect(()=>{
    if(totalChecked.length == 0){
    handleClearChecked();
    }
  },[totalChecked])
  function handleClearChecked(){
    setChecked()
  }

  return (
    <>
      <div className="value_item">
        <div className="check_box">
          <div
            className={checked && item.id == checked.id ? "check" : "uncheck"}
            onClick={() => handleChecked()}
          ></div>
        </div>
        <div className="label_parent">
          <label className="label" onClick={() => handleChecked()}>
            {item.name}
          </label>
        </div>
      </div>
    </>
  );
}
