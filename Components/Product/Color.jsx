
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Color({ item, selectColor, setSelectColor }) {
  const [hover, setHover] = useState(0);
  function handleHoverColor() {
    setHover(1);
  }
  function handleLeaveColor() {
    setHover(0);
  }
  function handleSelectColor(item) {
    setSelectColor(item);
  }

  return (
    <div className="item" key={item.id}>
      <div
        className={
          selectColor && selectColor.color && selectColor.id == item.id
            ? "color select"
            : "color"
        }
        style={item.color && { background: item.color.color }}
        onMouseOver={handleHoverColor}
        onMouseLeave={handleLeaveColor}
        onClick={() => handleSelectColor(item)}
      ></div>
      {hover == 1 &&
        item.color &&(
          <div className="name">
            <span>{item.color.name}</span>
          </div>
        )}
    </div>
  );
}