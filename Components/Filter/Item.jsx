
import React, { useState, useEffect, useRef, useContext } from "react";
import Property from "./Property";
export function Item({ parents, property , setFilterable}) {

  return (
    <>
      {parents && (
        <>
          <div className="item">
            {property &&
              parents.property.map((item_property) => (
                <div key={item_property.id}>
                  {item_property.property_id == null && (
                    <Property
                      properties={parents.property}
                      item_property={item_property}
                      setFilterable={setFilterable}
                    />
                  )}
                </div>
              ))}
          </div>
          {parents.parents && (
            <Item
              parents={parents.parents}
              property={parents.property}
              setFilterable={setFilterable}
            />
          )}
        </>
      )}
    </>
  );
}
