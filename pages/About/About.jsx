import { useRouter } from "next/router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { post, get } from "../../http/http.js";
import { useQuery , QueryClient , QueryClientProvider } from "@tanstack/react-query";

export default function about() {
  useEffect(() => {
    var request ={name : "" , page:1}
    post("/api/admin/category/index" , request)
    .then(response=>{

    }).catch(error=>{

    });
  }, []);

  return (
    <div>
      <p>about</p>
    </div>
  );
}
