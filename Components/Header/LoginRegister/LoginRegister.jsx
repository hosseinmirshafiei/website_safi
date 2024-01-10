import { useState, useEffect, useRef , useContext } from "react";
import { post, get } from "@/http/http";
import { Context } from "@/Components/Context/Context";
import { useErrorCatch } from "./useErrorCatch";
import { useRouter } from "next/router";
export default function LoginRegister({ modal, setModal, target, loginSuccessCart, setLoginSuccessCart }) {
  const [loginToConfirm, setLoginToConfirm] = useState(0);
  const [phone, setPhone] = useState();
  const [timerTotal, setTimerTotal] = useState();
  const [seconds, setSeconds] = useState();
  const [token, setToken] = useState(null);
  const [errorRes, setErrorRes] = useState(null);
  const [errorCatch, setErrorCatch] = useState([]);
  const [empty, setEmpty] = useState(0);
  const [loadSpinner, setLoadSpinner] = useState(0);
  const [loginLimit, setLoginLimit] = useState(0);
  const [success, setSuccess] = useState();
  const router = useRouter();
  const phoneInput = useRef();
  const otpInput = useRef();
  const loginModalRef = useRef();

  const { isLogin, setIsLogin, cartContext, setCartContext, setUserContext } =
    useContext(Context);

  //////

  useEffect(() => {
    document.addEventListener("click", outsideClick, true);
    return () => {
      //cleanup
      document.removeEventListener("click", outsideClick, true);
    };
  }, [modal]);

  function handleSuccessLogin(response) {
    setModal(0);
    setModal(0);
    setIsLogin(true);
    setCartContext(response.cart);
    setUserContext(response.user);
    setLoginSuccessCart(loginSuccessCart + 1);
    router.push(target);
  }

  //////////////// for login to confirm

  useEffect(() => {
    if (token != null) {
      setLoginToConfirm(1);
    }
    return () => {};
  }, [token]);
  ///////////////// for timer
  useEffect(() => {
    if (timerTotal != null) {
      setSeconds(timerTotal);
      var s = timerTotal;
      var x = setInterval(function () {
        if (s > 0) {
          s = s - 1;
          setSeconds(s);
        }

        if (s == 0) {
          clearInterval(x);
          setTimerTotal(null);
        }
      }, 1000);
    }

    return () => {
      clearInterval(x);
      //cleanup
    };
  }, [timerTotal]);
  ///////////////

  function handleLogin(e) {
    e.preventDefault();
    if (loginLimit == 0) {
      setLoginLimit(1);
      setLoadSpinner(1);

      const phonenumber = phoneInput.current.value;

      if (phonenumber.length == 11) {
        const requests = { id: phonenumber };
        post("/api/market/login-register/login-register", requests)
          .then((response) => {
            setToken(response["token"]);
            setPhone(phonenumber);
            setLoadSpinner(0);
            setTimerTotal(response["timer"]);
            setErrorCatch([]);
            setErrorRes(response["error"]);
            setLoginLimit(0);
          })
          .catch((error) => {
            var type = "login";
            useErrorCatch({
              setErrorRes,
              setErrorCatch,
              setLoadSpinner,
              error,
              setLoginLimit,
              type,
            });
          });
      } else {
        setErrorCatch(["لطفا شماره تلفن خود را صحیح وارد نمایید."]);
        setLoadSpinner(0);
        setLoginLimit(0);
      }
    }
  }

  function handleConfirm(e) {
    e.preventDefault();
    setLoadSpinner(1);
    var otpCode = otpInput.current.value;
    const requests = { otp: otpCode, token: token };
    post("/api/market/login-register/login-confirm", requests)
      .then((response) => {
        setSuccess(response);
        setLoadSpinner(0);
        setErrorCatch([]);
        setErrorRes(response["error"]);
        if (response.success == "success") {
          handleSuccessLogin(response);
        }
      })
      .catch((error) => {
        var type = "confirm";
        useErrorCatch({
          setErrorRes,
          setErrorCatch,
          setLoadSpinner,
          error,
          setLoginLimit,
          type,
        });
      });
  }

  function handleResendOtp(e) {
    e.preventDefault();
    if (loginLimit == 0) {
      setLoginLimit(1);
      setLoadSpinner(1);
      const requests = { token: token };
      post("/api/market/login-register/login-resend-otp", requests)
        .then((response) => {
          setEmpty(1);
          setToken(response["token"]);
          setLoadSpinner(0);
          setTimerTotal(response["timer"]);
          setErrorCatch([]);
          setErrorRes(response["error"]);
          setLoginLimit(0);
        })
        .catch((error) => {
          var type = "resend-otp";
          useErrorCatch({
            setErrorRes,
            setErrorCatch,
            setLoadSpinner,
            error,
            setLoginLimit,
            type,
          });
        });
    }
  }

  function handleCloseModal() {
    setModal(0);
  }

  function outsideClick(e) {
    if (modal == 1) {
      if (!loginModalRef.current.contains(e.target)) {
        setModal(0);
      }
    }
  }

  return (
    <div div className="parent_login">
      <div>
        {loginToConfirm == 0 && (
          <div>
            {errorRes != null && (
              <div className="parent_error">
                <span>{errorRes}</span>
              </div>
            )}

            <div className="parent_error">
              {errorCatch != null &&
                errorCatch.map((item, index) => (
                  <div key={index}>
                    <span>{item}</span>
                  </div>
                ))}
            </div>

            <div className="parent" ref={loginModalRef}>
              <div className="login_close">
                <span onClick={() => handleCloseModal()}>&#215;</span>
              </div>
              <div className="login">
                <div className="login-logo">
                  <img src="" alt="" />
                </div>

                <form onSubmit={handleLogin} method="post">
                  <div className="login-title">ورود / ثبت نام</div>
                  <div className="login-info">
                    شماره موبایل خود را وارد کنید.
                  </div>
                  <div className="login-input-text">
                    <input
                      type="tel"
                      name="id"
                      placeholder="09*********"
                      ref={phoneInput}
                      maxLength={11}
                      pattern="\d*"
                      utocomplete="off"
                      autoFocus
                    />
                  </div>

                  <div className="login_btn">
                    <button type="submit" className="btn">
                      {loadSpinner == 1 && (
                        <div className="lds-dual-ring"></div>
                      )}
                      دریافت کد ورود
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {loginToConfirm == 1 && (
          <div className="parent_login">
            {errorRes != null && (
              <div className="parent_error">
                <span>{errorRes}</span>
              </div>
            )}

            <div className="parent_error">
              {errorCatch != null &&
                errorCatch.map((item, index) => (
                  <div key={index}>
                    <span>{item}</span>
                  </div>
                ))}
            </div>

            <div className="parent" ref={loginModalRef}>
              <div className="login_close">
                <span onClick={() => handleCloseModal()}>&#215;</span>
              </div>
              <div className="login">
                <div className="login-logo">
                  <img src="#" alt="" />
                </div>

                <div className="login-title">کد تایید را وارد نمایید</div>

                <div className="login-info">
                  کد تایید برای شماره موبایل {phone} ارسال گردید
                </div>

                <form
                  id="confirm-form"
                  onSubmit={seconds <= 0 ? handleResendOtp : handleConfirm}
                  method="post"
                >
                  <div className="login-input-text">
                    <input
                      type="tel"
                      maxLength={5}
                      name="otp"
                      ref={otpInput}
                      pattern="\d*"
                      autoFocus
                    />
                  </div>
                </form>

                <div className="footer_login">
                  {seconds <= 0 ? (
                    <div className="login_btn">
                      <button form="confirm-form" type="submit" className="btn">
                        {loadSpinner == 1 && (
                          <div className="lds-dual-ring"></div>
                        )}
                        دریافت مجدد کد
                      </button>
                    </div>
                  ) : (
                    <div className="login_btn">
                      <button form="confirm-form" type="submit" className="btn">
                        {loadSpinner == 1 && (
                          <div className="lds-dual-ring"></div>
                        )}
                        تأیید
                      </button>
                    </div>
                  )}

                  {seconds > 0 && (
                    <div className="timer" id="timer">
                      <span className="text">ارسال مجدد کد بعد از </span>
                      <span className="seconds">{seconds}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
