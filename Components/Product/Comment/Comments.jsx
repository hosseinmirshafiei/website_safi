import ErrorMessgae from "@/Components/Error/ErrorMessage";
import UrlBase from "@/http/UrlHttp";
import React, { useState, useEffect, useLayoutEffect } from "react";
import NewCommentBtn from "./NewCommentBtn";
import useLoadMore from "./useLoadMore";
import dynamic from "next/dynamic";
import CommentItem from "./CommentItem";

  function Comments({ comments , setComments , product}) {
  const [productId , setProductId] = useState(0)
  const [loadMoreCount , setLoadMoreCount] = useState(comments.length)
  const [load , setLoad] = useState(0)
  const [error , setError] = useState(0)
  const [updateList , setUpdateList] = useState(0)

  useEffect(()=>{
    if(product){
      setProductId(product.id)
    }
  },[product])

  const [handleLoadMore] = useLoadMore({comments,setComments,product , setLoadMoreCount , setLoad , load ,setError})

  return (
    <>
      <div className="comments_parent">
        <h2 className="title">دیدگاه ها</h2>
        <NewCommentBtn
          product_id={productId}
          comments={comments}
          setComments={setComments}
        />
        {comments && comments.length > 0 ? (
          comments.map((item, index) => (
            <div className="comment_parent" key={item.id}>
              <CommentItem
                item={item}
                product_id={productId}
                comments={comments}
                setComments={setComments}
                updateList={updateList}
                setUpdateList={setUpdateList}
              />
            </div>
          ))
        ) : (
          <div className="no_comments">دیدگاهی وجود ندارد.</div>
        )}
        {loadMoreCount >= 20 && (
          <div className="load_more_parent">
            <button onClick={() => handleLoadMore()}>
              مشاهده بیشتر
              <img className="next_icon" src="/next_more2.svg" />
              {load == 1 && (
                <div className="searching">
                  <div className="content">
                    <img src="/loading.svg" />
                  </div>
                </div>
              )}
            </button>
          </div>
        )}
        {error == 1 && <ErrorMessgae setError={setError} />}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Comments), {
  ssr: false,
});

