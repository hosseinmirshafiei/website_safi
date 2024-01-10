import { post } from "@/http/http";
import React, { useRef, useState, useEffect } from "react";
import SpinnerLoading from "../../Spinner/SpinnerLoading";
import City from "./City";

export default function UpdateAddress({
  item,
  setShowUpdateAddress,
  setAddressActive,
  setAddress,
  provinceCities,
}) {
  const [Item, setItem] = useState(item);
  const [errorValidation, setErrorValidation] = useState();
  const [errorConnection, setErrorConnection] = useState(0);
  const [load, setLoad] = useState(0);
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  /////
  const nameInput = useRef();
  const familyInput = useRef();
  const mobileInput = useRef();
  const phoneInput = useRef();
  const addressInput = useRef();
  const postalCodeInput = useRef();
  

  /////

  function handleRequest() {
    var id = Item.id;
    var first_name = nameInput.current.value;
    var last_name = familyInput.current.value;
    var mobile = mobileInput.current.value;
    var phone = phoneInput.current.value;
    var address = addressInput.current.value;
    var postal_code = postalCodeInput.current.value;
    var request = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      phone: phone,
      address: address,
      postal_code: postal_code,
      province: province,
      city: city,
    };
    return request;
  }

  ////
  function handleUpdateAddress(e) {
    if (load == 0) {
      setLoad(1);
      e.preventDefault();

      var request = handleRequest();

      post("/api/market/address/update", request)
        .then((response) => {
          setLoad(0);
          setShowUpdateAddress(0);
          setAddressActive(response.address_active);
          setAddress(response.address);
          setErrorConnection(0);
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            setErrorValidation(error.response.data.errors);
            setErrorConnection(0);
          } else {
            setErrorConnection(1);
          }
          setLoad(0);
        });
    }
  }

  useEffect(() => {
    if (errorValidation && errorValidation.length > 0) {
      handleScrolltoErrorElement();
    }
  }, [errorValidation]);

  function handleScrolltoErrorElement() {
    // var container= document.getElementById('form_profile')
    var error_validation_element = document.getElementById("error_validation");
    if (error_validation_element) {
      error_validation_element.scrollIntoView();
    }
    // container.scrollBy({top:-100});
  }

  return (
    <div className="item_parent">
      {errorConnection == 1 && (
        <div className="parent_error">
          <div className="error_inner">
            <p className="title">لطفا اتصال اینترنت خود را بررسی نمایید.</p>
            <button type="submit" form="form">
              تلاش دوباره
            </button>
          </div>
        </div>
      )}

      {load == 1 && <SpinnerLoading />}
      <div className="profile_create_parent">
        <div className="profile_inner">
          <div className="close_profile_create">
            <div className="close_profile_create">
              <span className="title_modal">ویرایش آدرس</span>
              <button onClick={() => setShowUpdateAddress(0)}>&#x2715;</button>
            </div>
          </div>
          <div className="form_profile" id="form_profile">
            <form id="form" onSubmit={handleUpdateAddress} method="post">
              <div className="name">
                <label htmlFor="name">نام : </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="نام"
                  ref={nameInput}
                  defaultValue={Item && Item.first_name}
                />

                {errorValidation && errorValidation.first_name && (
                  <div className="error" id="error_validation">
                    <span>{errorValidation.first_name}</span>
                  </div>
                )}
              </div>

              <div className="family">
                <label htmlFor="family">نام خانوادگی : </label>
                <input
                  id="family"
                  name="family"
                  type="text"
                  placeholder="نام خانوادگی"
                  ref={familyInput}
                  defaultValue={Item && Item.last_name}
                />

                {errorValidation && errorValidation.last_name && (
                  <div className="error" id="error_validation">
                    <span>{errorValidation.last_name}</span>
                  </div>
                )}
              </div>

              <div className="mobile">
                <label htmlFor="mobile"> تلفن همراه : </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="تلفن همراه"
                  ref={mobileInput}
                  defaultValue={Item && Item.mobile}
                />
                {errorValidation && errorValidation.mobile && (
                  <div className="error" id="error_validation">
                    <span>{errorValidation.mobile}</span>
                  </div>
                )}
              </div>

              <div className="phone">
                <label htmlFor="phone">تلفن ثابت : </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="تلفن ثابت"
                  ref={phoneInput}
                  defaultValue={Item && Item.phone}
                />
                {errorValidation && errorValidation.phone && (
                  <div className="error" id="error_validation">
                    <span>{errorValidation.phone}</span>
                  </div>
                )}
              </div>

              <div className="postal_code">
                <label htmlFor="postal_code"> کد پستی : </label>
                <input
                  id="postal_code"
                  name="postal_code"
                  type="tel"
                  placeholder="کد پستی"
                  ref={postalCodeInput}
                  defaultValue={Item && Item.postal_code}
                />
                {errorValidation && errorValidation.postal_code && (
                  <div className="error" id="error_validation">
                    <span>{errorValidation.postal_code}</span>
                  </div>
                )}
              </div>

              <City
                item={Item}
                province={province}
                setCity={setCity}
                setProvince={setProvince}
                provinceCities={provinceCities}
                city={city}
                errorValidation={errorValidation}
              />

              <div className="address">
                <label htmlFor="address">آدرس : </label>
                <textarea
                  id="address"
                  name="address"
                  type="text"
                  placeholder="آدرس"
                  ref={addressInput}
                  defaultValue={Item && Item.address}
                />
                {errorValidation && errorValidation.address && (
                  <div className="error" id="error_validation">
                    <span>{errorValidation.address}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
          <section className="submit">
            <button type="submit" form="form">
              ویرایش
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
