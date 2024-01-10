import { post } from "@/http/http";
import React, { useState, useEffect, useLayoutEffect } from "react";
export default function useCreateComment({
  item,
  setError,
  loading,
  setLoading,
  product_id,
  comment_id,
  setComments,
  comments,
  comment,
  setOpenCreateComment,
  updateList,
  setUpdateList
}) {

  function create() {
    if (loading == 0 && comment && comment.length > 0) {
      setLoading(1);
      var request = {
        product_id: product_id,
        comment_id: comment_id,
        comment: comment,
      };
      post("/api/market/comment/create", request)
        .then((response) => {
          setError(0);
          setLoading(0);
          if(response.comment.comment_id != null){
            item.childs = [...item.childs , response.comment]
            setUpdateList(updateList+1)
          }else{
            setComments((comments)=>[response.comment , ...comments])
          }
          setOpenCreateComment(0);

        })
        // .catch((error) => {
        //   setLoading(0);
        //   setError(1);
        // });
    }

  }

  return [create];
}

