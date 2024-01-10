
import UrlBase from "@/http/UrlHttp";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ImageCategory from "./ImageCategory";

export default function CategoryOffer({ categoriesOffer }) {
  const [categories, setCategories] = useState(categoriesOffer);
  const router = useRouter()
  
  function handleLink(slug) {
    router.push("/products/" + slug);
  }
  return (
    <>
      {categories && categories.length > 0 && (
        <div className="category_offer">
          <h2 className="title">دسته بندی محصولات</h2>
          <div className="items">
            {categories.map((item, index) => (
              <>
                <div
                  className="item"
                  key={item.id}
                  onClick={() => handleLink(item.slug)}
                >
                  <div className="inner_item">
                    <div className="image_parent">
                      <ImageCategory
                        image={item.image}
                        alt={item.name}
                        width={150}
                        height={150}
                      />
                    </div>
                    <p className="name">{item.name}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
