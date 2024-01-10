import CartIcon from "@/Components/Header/CartIcon/CartIcon";
import { Context } from "@/Components/Context/Context";
import Header from "@/Components/Header/Header/Header";
import LoadingPages from "@/Components/Spinner/LoadingPages";
import { post } from "@/http/http";
import "@/styles/style.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/Components/Footer/Footer";
import Head from "next/head";

export default function App({ Component, pageProps, infoWebSite}) {
  const [cartContext, setCartContext] = useState([]);
  const [userContext, setUserContext] = useState(0);
  const [isLogin, setIsLogin] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [info, setInfo] = useState();
  const [contact, setContact] = useState();
  const router = useRouter();

  useEffect(()=>{
     setInfo(infoWebSite);
     setUserContext(infoWebSite.user);
     setIsLogin(infoWebSite.is_login);
     setCartContext(infoWebSite.cart);
     setWalletAmount(infoWebSite.wallet_amount);
     setContact(infoWebSite.contact);
  },[])

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#283340" />
      </Head>
      <Context.Provider
        value={{
          info,
          setInfo,
          cartContext,
          setCartContext,
          userContext,
          setUserContext,
          isLogin,
          setIsLogin,
          walletAmount,
          setWalletAmount,
          contact,
        }}
      >
        <>
          <div key={router.asPath} className="page">
            <LoadingPages />
            <Header />
            <div className="main">
              <Component {...pageProps} />
            </div>
            <Footer/>
          </div>
        </>
      </Context.Provider>
    </>
  );
}

//////

App.getInitialProps = async ({ctx ,info}) => {
      var request = {};
      var header = undefined;
      if (ctx.req) {
        header = ctx.req.headers.cookie;
      }
      const res = await axios
        .post("/api/market/info-website/index", request, {
          withCredentials: true,
          headers: { cookie: header },
        })
        .then((resposne) => resposne.data);

      const infoWebSite = res;
      return { infoWebSite };
}

