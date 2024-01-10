import React, { useState, useEffect, useRef } from "react";

export default function useSelectAttribute({
  productColors,
  setSelectColor,
  selectColor,
  selectSize,
  setSelectSize,
}) {
  useEffect(() => {
    handleSelectColor();
    handleSelectSize();
  }, []);

  function handleSelectColor() {
    if (productColors) {
      var stop = false;
      productColors.forEach((record) => {
        if (stop == false && record.color && record.number > 0) {
          setSelectColor(record);
          stop = true;
        }
      });
    }
  }
    function handleSelectSize() {
      var stop = false;
      if (productColors) {
        productColors.forEach((record) => {
          if (stop == false && record.size && record.number > 0) {
            setSelectSize(record);
            stop = true;
          }
        });
      }
    }
}
