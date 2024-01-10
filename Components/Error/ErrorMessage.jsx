import React, { useEffect, useState } from "react";

export default function ErrorMessgae({setError}) {

   useEffect(() => {
     let timer1 = setTimeout(() => {
       setError(0);
     }, 8000);
   return () => {
       clearTimeout(timer1);
    }
   } ,[])

  return (
    <div className="parent_message">
      <div className="message error">
      <span>خطا در برقراری ارتباط</span>
      </div>
    </div>
  );
}