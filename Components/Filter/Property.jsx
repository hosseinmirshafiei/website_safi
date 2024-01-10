import React, { useState, useEffect } from "react";
import Values from "./Values";
export default function Property({
  properties,
  item_property,
}) {
  const [showValues, setShowValues] = useState(0);
  const [values, setValues] = useState([]);

  var run = 0;
  function handleShowValues() {
    if (showValues == 0) {
      setShowValues(1);
    } else {
      setShowValues(0);
    }
  }

  useEffect(() => {
    handleValues();
  }, []);

  function handleValues() {
    if (run == 0) {
      if (properties) {
        properties.map((el) => {
          if (el.property_id == item_property.id) {
            setValues((values) => [...values, el]);
          }
        });
      }
      run = 1;
    }
  }

  return (
    <div className="item_property_parent">
      <div className="property_parent" onClick={() => handleShowValues()}>
        <div className="property_name">{item_property.name}</div>
        <button className="values_btn_show">
          <img className="down" src="/dropdown2.svg" />
        </button>
      </div>
      <div className={showValues == 0 ? "values" : "values visisble"}>
        <Values
          key={item_property.id}
          values={values}
          property={item_property}
        />
      </div>
    </div>
  );
}
