import UrlBase from "@/http/UrlHttp";
import { post, get } from "@/http/http";
import React, { useState, useRef, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageProduct from "@/Components/Products/ImageProduct";

export default function Search() {
  const [response, setResponse] = useState();
  const [search , setSearch] = useState()
  const [searching, setSearching] = useState(0);
  const [error, setError] = useState(0);
  const [modal, setModal] = useState(0);
  const searchInput = useRef()
  const iconSearchRef = useRef();
  const responseRef = useRef()
  const clearSearchRef = useRef();
  const abortController = useRef(null)
  const [width , setWidth] = useState()
  const [isMobile , setIsMobile] = useState(0)
  const [classNameSearch, setclassNameSearch] = useState("search_parent")
  const router = useRouter()

  function handelSearch(e) {
    if(e.length <= 1){
      setModal(0);
    }
    setSearch(e);
  }
  function handleSelectInputSearch(e){
    if(e.length > 1){
      setModal(1)
    }else{
      setModal(0);
    }
  }
  function handleOpenSearchMobile(){
    if (width <= 960) {
      setIsMobile(1);
      setclassNameSearch("search_parent mobile_search_parent");
    }
  }

  useEffect(()=>{
    if(search){
      abortController.current = new AbortController(); //for cancel request
      setSearching(1);
      var request = { search: search };
      post("/api/market/search/products", request, {
        signal: abortController.current.signal,
      })
        .then((response) => {
          if (response) {
            if(search.length > 1){
            setResponse(response);
            setModal(1)
            }else{
            setModal(0); 
            }
            setSearching(0);
            setError(0);
          }
        })
        .catch((error) => {
          if (error && error.response && error.code != "ERR_CANCELED") {
            setError(1);
            setSearching(0);
          }
        });
    }
    return () => {
      abortController.current && abortController.current.abort();
    }

  },[search])

  function handleClearSearch(){
    abortController.current && abortController.current.abort();
    setResponse()
    setError(0)
    setSearching(0)
    setSearch()
    setModal(0)
    searchInput.current.value = ""

  }

  useEffect(() => {
     document.addEventListener("click",outsideClick,true)
    return () => {
      document.removeEventListener("click",outsideClick,true)
    }
    
  } ,[modal])

  function outsideClick(e){
    if(search && search.length > 1 && modal == 1){
      if (
        !responseRef.current.contains(e.target) &&
        !searchInput.current.contains(e.target) &&
        !iconSearchRef.current.contains(e.target) &&
        !clearSearchRef.current.contains(e.target)
      ) {
        setModal(0);
      }
    }
  }
  function handleBackOfSearch(){
    setIsMobile(0)
    setModal(0)
    setclassNameSearch("search_parent");
  }
    const updateMedia = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });

  return (
    <div
      className={
        modal == 0
          ? classNameSearch
          : modal == 1 && classNameSearch + " " + "search_parent_select"
      }
    >
      {isMobile == 1 || width > 960 ? (
        <div className="search">
          {isMobile == 1 && (
            <div className="back_parent">
              <button onClick={() => handleBackOfSearch()}>
                <img src="/back.svg" />
              </button>
            </div>
          )}
          <input
            type="text"
            placeholder="جستجو"
            onKeyUp={(e) => handelSearch(e.target.value)}
            onClick={(e) => handleSelectInputSearch(e.target.value)}
            ref={searchInput}
            className={modal == 1 ? "input_focus" : "input"}
            autoFocus={isMobile == 1 && "true"}
          />
          <div className="search_icon" ref={iconSearchRef}>
            <img src="/search_icon.svg" />
          </div>
          {search && searching == 0 && modal == 1 && (
            <div className="clear_search">
              <button ref={clearSearchRef} onClick={() => handleClearSearch()}>
                &#215;
              </button>
            </div>
          )}

          {searching == 1 && search && (
            <div className="searching">
              <div className="content">
                <img src="/loading.svg" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="search_menu">
          <button onClick={() => handleOpenSearchMobile()}>
            جستجو
            <div className="search_icon">
              <img src="/search_icon.svg" className="search_icon" />
            </div>
          </button>
        </div>
      )}

      <div ref={responseRef}>
        {search && search.length > 1 && modal == 1 && (
          <div className="search_response">
            <div className="inner">
              {response && response.length > 0
                ? response.map((item, index) => (
                    <Link
                      href={{
                        pathname: "/product/[slug]",
                        query: { slug: item.slug },
                      }}
                    >
                      <div className="item" key={index}>
                        <ImageProduct
                          image={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                        />
                        <span className="name">{item.name}</span>
                      </div>
                    </Link>
                  ))
                : response &&
                  response.length == 0 && (
                    <div className="notfound">
                      <span>متأسفانه موردی پیدا نشد.</span>
                    </div>
                  )}

              {error == 1 && search && (
                <div className="error_search">
                  <span>متأسفانه مشکلی رخ داده.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
