import { Context } from "@/Components/Filter/Context/Context";
import React, { useContext } from "react";
export default function FilterBtn(){
  
   const { showFilters, setShowFilters } = useContext(Context);
    const handleShowFilters =()=>{
        if(showFilters==0){
            setShowFilters(1)
        }else{
            setShowFilters(0)
        }
    }
    return (
      <div className="filter_btn_parent">
        <img src="/filter.svg" onClick={() => handleShowFilters()} />
        <button onClick={() => handleShowFilters()}>فیلتر</button>
      </div>
    );
}