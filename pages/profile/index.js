import { useRouter } from "next/router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { post } from "@/http/http";

import axios from "axios";
import Profile from "@/Components/Profile/Profile";
import dynamic from "next/dynamic";

function index({ response }) {

  return (
    <>
      {response && response.user &&
      <Profile response={response}/>
      }
    </>
  );
}

export default dynamic(() => Promise.resolve(index), {
  ssr: false,
});

export async function getServerSideProps(router) {
  const request = {};
  const res = await axios
    .post("/api/market/profile/index", request, {
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
