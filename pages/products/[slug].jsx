import React, { useState, useEffect ,useContext } from "react";
import Products from "@/Components/Products/Products";
import { post } from "@/http/http";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import SpinnerLoading from "@/Components/Spinner/SpinnerLoading";
import Filters from "@/Components/Filter/Filters";
import { Context } from "@/Components/Filter/Context/Context";
import Tab from "@/Components/Products/Tab/Tab";
import ErrorMessgae from "@/Components/Error/ErrorMessage";
import HeadTag from "@/Components/HeadTag/HeadTag";

export default function slug({ response }) {

  const { ref: bottomListRef, inView: bottomListVisible } = useInView();
  const router = useRouter()
  const [products , setProducts] = useState(response.products)
  // const [properties , setProperties] = useState(response.properties)
  // const [brands , setBrands] = useState(response.brands)
  const [delivery , setDelivery] = useState(response.delivery)
  const [generalDiscount, setGeneralDiscount] = useState(response.general_discount);
  const [lastId , setLastId] = useState(0)
  const [page , setPage] = useState(0)
  const [loading , setLoading] = useState(0)
  const [sortType , setSortType] = useState(1)
  const [available, setAvailable] = useState(0);
  const [showFilters , setShowFilters] = useState(0)
  const [filtered, setFiltered] = useState(0);
  const [totalChecked, setTotalChecked] = useState([]);
  const [brandsSelected, setBrandSelected] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [error , setError] = useState(0)
  
  useEffect(() => {
    if (bottomListVisible == true) {
      console.log(bottomListVisible);
      getData();
    }
  }, [bottomListVisible]);

  useEffect(()=>{
     handleProductsId(products)
  } , [products])

  function getData(){
    var last_id = 0;
    if(products && products.length > 0){
     last_id = products[products.length - 1].id;
     setLastId(last_id);
    }
    if (loading == 0 && lastId != last_id && products.length >= 70){
      var page_number = page + 1;
      setPage(page_number)

      const request = {
        slug: router.query.slug,
        page: page_number,
        last_id: last_id,
        filters: totalChecked,
        sort_type: sortType,
        available: available,
        brands_selected: brandsSelected,
        products_id_list:productsId
      };
      setLoading(1)
      post("/api/market/product/index", request)
        .then((response) => {
          if (products) {
            updateProducts(response)
            setLoading(0)
            setError(0)
          }
        })
        .catch((error) => {
          setLoading(0)
          setError(1)
        });
      }
  }

  function updateProducts(response){
    var dataUpdated = products;
    dataUpdated = [...products, ...response.products];
    setProducts(dataUpdated);
  }
  function handleProductsId(products){
    var products_id_list = [];
    if (products && products.length > 0) {
        products.map((el) => {
        products_id_list = [...products_id_list, el.id];
      });
    }
    setProductsId(products_id_list);
  }
  
  return (
    <>
    <HeadTag
    title={"تألیفات حضرت آیت اللّه العظمی صافی گلپایگانی"}
    metaDescription={"تألیفات حضرت آیت اللّه العظمی صافی گلپایگانی"}
    />
    <div className="products_page">
      <h1>تألیفات حضرت آیت اللّه العظمی صافی گلپایگانی</h1>
      <Context.Provider
        value={{
          products,
          setProducts,
          loading,
          setLoading,
          delivery,
          generalDiscount,
          setProducts,
          totalChecked,
          setTotalChecked,
          setPage,
        }}
      >
        {/* <Tab/> */}
        <div className="content">
          {/* <Filters /> */}
          <Products/>
        </div>
      </Context.Provider>

      <div className="bottom_list_products" ref={bottomListRef}></div>
      {loading == 1 && <SpinnerLoading />}
      {error == 1 && <ErrorMessgae setError={setError}/>}
    </div>
    </>
  );
}
export async function getServerSideProps(router) {
  const request = {"page": 0 ,'products_id_list':{}};
  const res = await post("/api/market/product/index", request);

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
