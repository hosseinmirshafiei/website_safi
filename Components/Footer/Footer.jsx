import { Context } from "../Context/Context";
import { useEffect, useState, useContext } from "react";
import UrlBase from "@/http/UrlHttp";
import { useRouter } from "next/router";
import Enamad from "./Enamad";

export default function Footer() {
  const { contact } = useContext(Context);
  return (
    <>
      {contact && (
        <footer className="footer">
          <div className="footer_inner">
            <div className="logo_footer">
              <img src="/images/logo2.png" />
            </div>
            <div className="content">
              <div className="address">
                <div className="label">آدرس :</div>
                <div className="value">{contact.address}</div>
              </div>
              <div className="phone">
                <div className="label">تلفن ثابت:</div>
                <div className="value">{contact.phone}</div>
              </div>
              <div className="mobile">
                <div className="label">تلفن همراه:</div>
                <div className="value">{contact.mobile_one}</div>
              </div>

                <Enamad/>
            </div>
          </div>
          {/* <div className="creator">
          <a href="https://homayeiran.ir" className="part1">این سایت توسط مرکز برنامه نویسی 
          <span className="name_site">همای ایران</span>
           طراحی شده است.
           </a>
           <div className="contact_creator">
          <a href="https://homayeiran.ir" className="link">
            <img src="/images/internet.svg"/>
            <span>homayeiran.ir</span>
          </a>
          <div className="phone">
            <img src="/images/phone.svg"/>
            <div className="phone_number">09382804657</div>
          </div>
          </div>
        </div> */}
        </footer>
      )}
    </>
  );
}
