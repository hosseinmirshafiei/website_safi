import React, { useState } from "react";
import { useProperty } from "./useProperty";
export default function Features({ properties }) {

  const [propertiesFinal , setPropertiesFinal]= useState([])
  useProperty(properties, setPropertiesFinal)

  return (
    <>
      {propertiesFinal && propertiesFinal.length > 0 && (
        <div className="features">
          <h2>مشخصات</h2>
          <div className="content">
            <div className="title">
              <p>مشخصات</p>
            </div>
            <div className="items">
              {propertiesFinal.map((item, index) => (
                <div className="item">
                  <div className="key">
                    <p>{item.key}</p>
                  </div>
                  <div className="value">
                    <ul>
                      {item.value &&
                        item.value.map((item_value) => (
                          <li>{item_value.name}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
