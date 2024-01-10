import { useRouter } from "next/router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Attributes from "@/Components/Product/Attributes";
import Info from "@/Components/Product/Info";
import ProductImage from "@/Components/Product/ProductImage";
import Description from "@/Components/Product/Description";
import MenuProduct from "@/Components/Product/MenuProduct";
import Comments from "@/Components/Product/Comment/Comments";
import PriceProduct from "@/Components/Product/PriceProduct";
import Features from "@/Components/Product/Features";
import Colors from "@/Components/Product/Colors";
import Sizes from "@/Components/Product/Sizes";
import axios from "axios";
import CarouselGallery from "@/Components/Product/Gallery/CarouselGallery";
import useWidth from "./useWidth";
import Entesharat from "@/Components/Product/Entesharat";

export default function Product({response}) {
  const [product , setProduct] = useState(response.product)
  const [delivery, setDelivery] = useState(response.delivery);
  const [brand, setBrand] = useState(response.brand);
  const [properties, setProperties] = useState(response.properties);
  const [comments, setComments] = useState(response.comments);
  const [generalDiscount , setGeneralDiscount] = useState(response.general_discount)
  const [gallery , setGallery] = useState(response.gallery)
  const [cartProduct, setCartProduct] = useState(response.cart_product);
  const [selectColor, setSelectColor] = useState();
  const [selectSize, setSelectSize] = useState();

  const [width] = useWidth();

  return (
    <>
      {response && (
        <div className="product_parent">
          <div className="product">
            {width > 960 ? (
              <ProductImage product={product} gallery={gallery} />
            ) : (
              <CarouselGallery product={product} gallery={gallery} />
            )}

            <div className="content">
              <Info product={product} brand={brand} />

              <PriceProduct
                product={product}
                generalDiscount={generalDiscount}
                delivery={delivery}
                selectColor={selectColor}
                setSelectColor={setSelectColor}
                selectSize={selectSize}
                cartProduct={cartProduct}
                setCartProduct={setCartProduct}
              />
              <div className="attributes">
              <Entesharat product={product}/>
                <Colors
                  product={product}
                  selectColor={selectColor}
                  setSelectColor={setSelectColor}
                  selectSize={selectSize}
                />
                <Sizes
                  selectSize={selectSize}
                  setSelectSize={setSelectSize}
                  setSelectColor={setSelectColor}
                  product={product}
                />
              </div>
              <Attributes properties={properties} />
            </div>
            <Description product={product} />
            <Features properties={properties} />

            {/* <MenuProduct/> */}
            <Comments
              comments={comments}
              setComments={setComments}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(router) {
  const request = { slug: router.query.slug };
  // const res = await post("/api/market/product/show" , request);
   
    const res = await axios
      .post("/api/market/product/show", request, {
        withCredentials: true,
        headers: {
          Cookie: router.req.headers.cookie,
        },
      })
      .then((resposne) => resposne.data);

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      response: res,
    },
  };
}
