import React, { useEffect, useState } from "react";

export default function Success({ setSuccess }) {
  useEffect(() => {
    let timer1 = setTimeout(() => {
      setSuccess(0);
    }, 8000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="parent_message">
      <div className="message success">
        <span>تغییرات با موفقیت انجام شد</span>
      </div>
    </div>
  );
}
