import { post } from "@/http/http";
import React, { useRef, useState, useEffect } from "react";
import ErrorMessgae from "../../Error/ErrorMessage";
import SpinnerLoading from "../../Spinner/SpinnerLoading";
import City from "./City";

export default function CreateAddress({
  setShowCreateAddress,
  address,
  emptyAddress,
  setEmptyAddress,
  setAddress,
  addressActive,
  setAddressActive,
  provinceCities,
}) {
  const [load, setLoad] = useState(0);
  const [errorValidation, setErrorValidation] = useState();
  const [errorConnection, setErrorConnection] = useState(0);
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  //////////
  const name = useRef();
  const familyInput = useRef();
  const mobileInput = useRef();
  const phoneInput = useRef();
  const addressInput = useRef();
  const postalCodeInput = useRef();

  //////
  function handleRequest() {
    var first_name = name.current.value;
    var last_name = familyInput.current.value;
    var mobile = mobileInput.current.value;
    var phone = phoneInput.current.value;
    var address = addressInput.current.value;
    var postal_code = postalCodeInput.current.value;
    var request = {
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      phone: phone,
      postal_code: postal_code,
      address: address,
      province: province,
      city: city,
    };
    return request;
  }
  function handleCreateAddress(e) {
    if (load == 0) {
      setLoad(1);
      e.preventDefault();
      var request = handleRequest();
      post("/api/market/address/create", request)
        .then((response) => {
          if (response) {
            setAddressActive(response.address_active);
            setEmptyAddress(null);
            setAddress(response.address);
            setShowCreateAddress(0);
            setLoad(0);
            setErrorConnection(0);
            setErrorValidation();
          }
        })
        .catch((error) => {
          setLoad(0);
          if (error.response && error.response.status == 422) {
            setErrorValidation(error.response.data.errors);
            setErrorConnection(0);
          } else {
            setErrorConnection(1);
          }
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
    if(error_validation_element){
    error_validation_element.scrollIntoView();
    }
    // container.scrollBy({top:-100});
  }

  return (
    <div>
      <div className="profile_inner">
        <div className="close_profile_create">
          <span className="title_modal">ثبت آدرس جدید</span>
          {addressActive != null && emptyAddress != 1 && (
            <button onClick={() => setShowCreateAddress(0)}>&#x2715;</button>
          )}
        </div>

        <div className="form_profile" id="form_profile">
          <form id="form1" onSubmit={handleCreateAddress} method="post">
            <div className="name">
              <label htmlFor="name">نام : </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="نام"
                ref={name}
                defaultValue={address && address.name}
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
                defaultValue={address && address.last_name}
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
                defaultValue={address && address.mobile}
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
                defaultValue={address && address.phone}
              />
              {errorValidation && errorValidation.phone && (
                <div className="error" id="error_validation">
                  <span>{errorValidation.phone}</span>
                </div>
              )}
            </div>

            <div className="postal_code">
              <label htmlFor="postal_code">کد پستی : </label>
              <input
                id="postal_code"
                name="postal_code"
                type="tel"
                placeholder="کد پستی"
                ref={postalCodeInput}
              />
              {errorValidation && errorValidation.postal_code && (
                <div className="error" id="error_validation">
                  <span>{errorValidation.postal_code}</span>
                </div>
              )}
            </div>

            <City
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
                defaultValue={address && address.address}
              />
              {errorValidation && errorValidation.address && (
                <div className="error" id="error_validation">
                  <span>{errorValidation.address}</span>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="submit">
          <button type="submit" form="form1">
            ثبت آدرس
          </button>
        </div>
      </div>
      {load == 1 && <SpinnerLoading />}
      {errorConnection == 1 && <ErrorMessgae setError={setErrorConnection} />}
    </div>
  );
}
