import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

export default function Category({
  response,
  handleShowCategories,
  handleHideCategories,
}) {
  const [menu, setMenu] = useState(response.menu);
  const [IdHover, setIdHover] = useState(0);
  const runMenu = useRef(true);

  useEffect(() => {
    if (runMenu.current == true) {
      handleGetDefaultIdParentCategory();
      runMenu.current = false;
    }
  }, []);

  function handleGetDefaultIdParentCategory() {
    if (menu.length > 0) {
      var first = 1;
      menu.map((element, i) => {
        if (element.category_id == 0 || element.category_id == null) {
          if (first == 1) {
            setIdHover(element.id);
            first = 0;
          }
        }
      });
    }
  }

  function handleOnMouseOver(id) {
    setIdHover(id);
  }

  return (
    <>
      {menu && menu.length > 0 && (
        <div
          className="categories"
          onMouseOver={handleShowCategories}
          onMouseOut={handleHideCategories}
        >
          <div className="category_parent">
            {menu.map((item, key) => (
              <>
                {(item.category_id == 0 || item.category_id == null) && (
                  <Link href={"/products/" + item.slug}>
                    <div>
                      <button
                        className={
                          item.id == IdHover ? "button hovered" : "button"
                        }
                        key={key}
                        onMouseOver={(id) => handleOnMouseOver(item.id)}
                      >
                        {item.name}
                      </button>
                    </div>
                  </Link>
                )}
              </>
            ))}
          </div>

          <div className="parent_sub_category">
            <div className="sub_categories">
              {menu &&
                menu.length > 0 &&
                menu.map((item, index) => (
                  <>
                    {item.id == IdHover && (
                      <Item item={item} IdHover={IdHover} key={item.id} />
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Item({ item, IdHover }) {
  return (
    <>
      {item.childes &&
        item.childes.length > 0 &&
        item.childes.map((item, i) => (
          <>
            <Link href={"/products/"+item.slug}>
              <div className="button">
                <button
                  className={
                    item.category_id == IdHover || item.childes.length > 0
                      ? "parent"
                      : "child"
                  }
                >
                  {item.name}
                </button>
              </div>
            </Link>
            <Item item={item} />
          </>
        ))}
    </>
  );
}
