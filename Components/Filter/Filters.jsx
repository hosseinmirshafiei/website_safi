import React, { useState, useEffect, useContext } from "react";
import { Item } from "./Item";
import Property from "./Property";
import { Context } from "./Context/Context";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import ErrorMessgae from "../Error/ErrorMessage";
import { useRouter } from "next/router";
import { post } from "@/http/http";
import AvailableFilter from "./AvailableFilter/AvailableFilter";
import BrandsFilter from "./Brands/BrandsFilter";

export default function Filters() {
  const [filterable , setFilterable] = useState(0)
  const [load, setLoad] = useState(0);
  const [error, setError] = useState(0);
  const router = useRouter();
  const {
    properties,
    filtered,
    setFiltered,
    totalChecked,
    setTotalChecked,
    sortType,
    available,
    setAvailable,
    setProducts,
    brandsSelected,
    setBrandSelected,
    showFilters,
    setShowFilters,
    setPage,
  } = useContext(Context);
 
    useEffect(() => {
      if (filtered != 0) {
        handleFilter();
      }
    }, [filtered]);

    function handleFilter() {
      if (load == 0) {
        setShowFilters(0);
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
        setLoad(1);
        setPage(0);
        var request = {
          filters: totalChecked,
          sort_type: sortType,
          page: 0,
          available: available,
          brands_selected: brandsSelected,
          slug: router.query.slug,
          products_id_list: {},
        };
        post("/api/market/product/index", request)
          .then((response) => {
            setLoad(0);
            setError(0);
            setProducts(response.products);
          })
          .catch((error) => {
            setError(1);
            setLoad(0);
          });
      }
    }
  const handleClearFilters = ()=>{
    setTotalChecked([])
    setAvailable(0)
    setBrandSelected([])
    setFiltered(filtered+1)
  }

  const handleCloseFilters = ()=>{
    setShowFilters(0)
  }

  return (
    <>
      <div className={showFilters == 0 ? "filters" : "filters show_filters"}>
        <div className="properties_product">
          <div>
            <div className="filters_tab">
              <div className="close">
                <button onClick={() => handleCloseFilters()}>&#10006;</button>
              </div>
              <div className="title">فیلترها</div>
              <button
                className="clear_filters_btn"
                onClick={() => handleClearFilters()}
              >
                حذف فیلتر ها
              </button>
            </div>
            <AvailableFilter
              handleFilter={handleFilter}
              available={available}
              setAvailable={setAvailable}
            />
            <BrandsFilter />
          </div>
          {properties && properties.map((item, index) => (
            <div className="item" key={item.id}>
              {item.property &&
                item.property.map((item_property) => (
                  <div key={item_property.id}>
                    {item_property.property_id == null && (
                      <Property
                        properties={item.property}
                        item_property={item_property}
                        setFilterable={setFilterable}
                      />
                    )}
                  </div>
                ))}
              <Item
                parents={item.parents}
                property={item.property}
                setFilterable={setFilterable}
              />
            </div>
          ))}
        </div>
      </div>
      {load == 1 && <SpinnerLoading />}
      {error == 1 && <ErrorMessgae setError={setError} />}
    </>
  );
}

