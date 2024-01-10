import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Products from "@/Components/Products/Products";
import { post } from "@/http/http";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import SpinnerLoading from "@/Components/Spinner/SpinnerLoading";
import Sort from "@/Components/Products/Tab/Sort";
import { Context } from "@/Components/Filter/Context/Context";

export default function index({ response }) {
  const { ref: bottomListRef, inView: bottomListVisible } = useInView();
  const router = useRouter();
  const [products, setProducts] = useState(response.products);
  const [delivery, setDelivery] = useState(response.delivery);
  const [generalDiscount, setGeneralDiscount] = useState(
    response.general_discount
  );
  const [lastId, setLastId] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(0);
  const [sortType, setSortType] = useState(1);
  const [productsId, setProductsId] = useState([]);

  useEffect(() => {
    if (bottomListVisible == true) {
      console.log(bottomListVisible);
      getData();
    }
  }, [bottomListVisible]);

  function getData() {
    var last_id = 0;
    if (products && products.length > 0) {
      last_id = products[products.length - 1].id;
      setLastId(last_id);
    }
    if (loading == 0 && lastId != last_id && products.length >= 20) {
      var page_number = page + 1;
      setPage(page_number);
      const request = {
        page: page_number,
        sort_type: sortType,
        products_id_list:productsId
      };
      setLoading(1);
      post("/api/market/offers-products/", request)
        .then((response) => {
          if (products) {
            updateProducts(response);
            setLoading(0);
          }
        })
        .catch((error) => {
          setLoading(0);
        });
    }
  }

  function updateProducts(response) {
    var dataUpdated = products;
    dataUpdated = [...products, ...response.products];
    setProducts(dataUpdated);
  }

    function handleProductsId(products) {
      var products_id_list = [];
      if (products && products.length > 0) {
        products.map((el) => {
          products_id_list = [...products_id_list, el.id];
        });
      }
      setProductsId(products_id_list);
    }
      useEffect(() => {
        handleProductsId(products);
      }, [products]);

  return (
    <div className="offers_page">
      <Context.Provider value={{products , delivery , generalDiscount}}>
        <Products/>
      </Context.Provider>
      <div className="bottom_list_products" ref={bottomListRef}></div>
      {loading == 1 && <SpinnerLoading />}
    </div>
  );
}
export async function getServerSideProps(router) {
  const request = {page: 0, sort_type: 1 , products_id_list:{}};
  const res = await post("/api/market/offers-products/index", request);

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
