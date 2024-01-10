
import React, { useState, useEffect, useLayoutEffect } from "react";
import Home from "@/Components/Home/Home";
import { get, post } from "@/http/http";
import UrlBase from "@/http/UrlHttp";
import HeadTag from "@/Components/HeadTag/HeadTag";
import Link from "next/link";
import Head from "next/head";

export default function Index({ response }) {
 
  return (
    <>
        <HeadTag
          title={"سامانه فروش آثار و تألیفات حضرت آیت اللّه العظمی صافی گلپایگانی"}
          metaDescription={"سامانه فروش آثار و تألیفات حضرت آیت اللّه العظمی صافی گلپایگانی"}
        />
      <Home response={response} />
    </>
  );
}

export async function getServerSideProps() {
  const res = await post("/api/market/home/index");

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
