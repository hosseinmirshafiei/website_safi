import React, { useState } from "react";
export default function ErrorLoadData({ func }) {
  return (
    <div className="parent_error_connection">
      <div className="error_inner">
        <p className="title">لطفا اتصال اینترنت خود را بررسی نمایید.</p>
        <button onClick={() => func()}>تلاش دوباره</button>
      </div>
    </div>
  );
}
