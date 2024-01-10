import { useProperty } from "./useProperty";
import React, { useState } from "react";
export default function Attributes({ properties }) {
  const [propertiesFinal, setPropertiesFinal] = useState([]);
  useProperty(properties, setPropertiesFinal)
  return (
    <>
      {propertiesFinal && propertiesFinal.length > 0 && (
        <div className="attributes_parent">
          <p className="title">ویژگی ها</p>
          {propertiesFinal.map((item, index) => (
            <>
              {index <= 4 && (
                <div className="attribute">
                  <div className="key">
                    <p> {item.key} : </p>
                  </div>
                  <div className="value">
                    <ul>
                      {item.value &&
                        item.value.map((item_value) => (
                          <li>{item_value ? item_value.name : "-"}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
}