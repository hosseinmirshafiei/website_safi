import React, { useState, useEffect } from "react";
export function useProperty(properties, setPropertiesFinal) {
  var run = 0;

  useEffect(() => {
    if (run == 0 && properties && properties.length > 0) {
      var final_property = [];
      properties.forEach((property) => {
        var find = final_property.find((item) => {
          return (
            item.id == property.parent.id && property.parent.property_id == null
          );
        });
        if (!find) {
          final_property = [
            ...final_property,
            {
              id: property.parent.id,
              key: property.parent.name,
              value: [
                {
                  id: property.id,
                  name: property.property_product.custom
                    ? property.property_product.custom
                    : property.name,
                },
              ],
            },
          ];
        } else {
          var find_property_added = final_property.find((item) => {
            return item.id == property.parent.id;
          });
          if (find_property_added) {
            find_property_added.value = [
              ...find_property_added.value,
              {
                id: property.id,
                name: property.property_product.custom
                  ? property.property_product.custom
                  : property.name,
              },
            ];
          }
        }
      });
      setPropertiesFinal(final_property);
    }
    run = 1;
  }, []);
  return [];
}
