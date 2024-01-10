import React, { useState, useEffect, useLayoutEffect } from "react";
import Home from "@/Components/Home/Home";
import { get, post } from "@/http/http";
import HeadTag from "@/Components/HeadTag/HeadTag";
import Image from "next/image";

export default function ContactUs({ response }) {
  return (
    <>
      <HeadTag
        title={
            "ارتباط با ما"
        }
        metaDescription={
             "ارتباط با ما"
        }
      />
      {response && (
        <div>
          {/* <div className="banner_contact_us">
            <h1>ارتباط با ما</h1>
          </div> */}
        <div className="contact_us_parent">
          <div className="inner">
            {/* <div className="image_contact">
              <Image src="/images/contact.jpg" width={550} height={366} loading="lazy" quality={100}/>
            </div> */}
            <div className="info">
            <img src="/images/contact.svg"/>
            <h1>راه های ارتباطی</h1>
            {response.phone != null && 
            <div className="item">
             <label>شماره ثابت : </label>
             <div>{response.phone}</div>
            </div>
            }
            {response.mobile_one != null && 
            <div className="item">
             <label>شماره همراه : </label>
             <div>{response.mobile_one}</div>
            </div>
            }
            {response.mobile_two != null && 
            <div className="item">
             <label>شماره همراه : </label>
             <div>{response.mobile_two}</div>
            </div>
            }
            {response.mail != null &&
            <div className="item">
              <label> پست الکترونیکی : </label>
              <div>{response.mail}</div>
             </div>
             }
            {response.address != null && 
            <div className="item">
              <label> نشانی : </label>
              <div>{response.address}</div>
            </div>
            }
          </div>
        </div>
        </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const res = await post("/api/market/contact-us/index");

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
