import { Context } from "@/Components/Filter/Context/Context";
import { post } from "@/http/http";
import UrlBase from "@/http/UrlHttp";
import { useRouter } from "next/router";
import React, { useState , useEffect , useContext } from "react";

export default function Sort() {
  const router = useRouter();
  const {
    sortType,
    setSortType,
    setProducts,
    setLoading,
    loading,
    totalChecked,
    available,
    brandsSelected,
    setPage,
  } = useContext(Context);
  const [sortItems , setSortItems] = useState([{"id":1 , "name":"جدیدترین"} , {"id":2, "name":"گران ترین"} , {"id":3, "name":"ارزان ترین"}])
  const [sortCurrent , setSortCurrent]= useState()
  const [showSortItems , setShowSortItems] = useState(0)
  var sort_id = sortType
  useEffect(()=>{
    setSortCurrent(sortItems[0])
  },[])
  function handleSortProducts(e) {
    sort_id = parseInt(e.target.id);
    var s = sortItems.find((el)=>{
       return el.id == sort_id;
    })
    setSortCurrent(s)
    setSortType(sort_id);
    getSortedData(sort_id);
  }
  function getSortedData(sort_id) {
    if (loading == 0 && sortType != sort_id) {
      const request = {
        slug: router.query.slug,
        page: 0,
        sort_type: sort_id,
        filters: totalChecked,
        available: available,
        brands_selected: brandsSelected,
        products_id_list: {},
      };
      setLoading(1);
      setPage(0);
      post("/api/market/product/index", request)
        .then((response) => {
          setProducts(response.products);
          setLoading(0);
        })
        .catch((error) => {
          setLoading(0);
        });
    }
  }

  const handleShowSortItems = ()=>{
    if(showSortItems==0){
      setShowSortItems(1);
    }else{
      setShowSortItems(0);
    }
  }


  return (
    <div className="sort_parent">
      <img
        src={"../sort.svg"}
        className="svg"
        onClick={() => handleShowSortItems()}
      />
      <div className="sort_inner">
        <label className="sort_title">مرتب سازی:</label>
        <label className="sort_current" onClick={() => handleShowSortItems()}>
          {sortCurrent && sortCurrent.name}
        </label>
        <div
          className={
            showSortItems == 0
              ? "items_parent"
              : "items_parent show_items_parent"
          }
        >
          {sortItems && (
            <div className={showSortItems == 0 ? "items" : "items show_items"}>
              <div className="title_parent"> 
                <button className="close" onClick={() => handleShowSortItems()}>&#10006;</button>
                <label className="title">مرتب سازی بر اساس</label>
              </div>
              {sortItems.map((item, index) => (
                <button
                  id={item.id}
                  onClick={(e) => handleSortProducts(e)}
                  className={sortType == item.id ? "button selected" : "button"}
                >
                  {item.name}
                  {sort_id == item.id &&
                    <img className="icon_sort_selected" src="/tick2.svg"/>
                  }
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}