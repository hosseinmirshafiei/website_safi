import React, { useRef, useState, useEffect } from "react";
export default function City({
  item,
  province,
  city,
  setCity,
  setProvince,
  provinceCities,
  errorValidation,
}) {
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [cityProvince, setCityProvince] = useState([]);
  var run = 0;

  useEffect(()=>{
    if (provinceCities) {
        if(item){
        setProvince(item.province)
        setCity(item.city);
        }
    };
  },[provinceCities])

  function handleListProvinceCity() {
    if (provinceCities && provinceCities.length > 0) {
      provinceCities.forEach((element) => {
        if (element.parent == 0) {
          setProvinceList((provinceList) => [...provinceList, element]);
        } else if (element.parent > 0) {
          setCityList((cityList) => [...cityList, element]);
        }
      });
    }
  }
  useEffect(() => {
    if (run == 0) {
      handleListProvinceCity();
      run = 1;
    }
  }, []);
  function handleSelectProvince(e) {
    setCityProvince([]);
    setProvince(e.target.value);
  }
  function handleSelectCity(e) {
    setCity(e.target.value);
  }

  useEffect(() => {
    handleSelectCitiesProvince();
  }, [province]);

  function handleSelectCitiesProvince() {

    if (cityList && cityList.length > 0) {
      cityList.forEach((element) => {
        if (element.parent == province) {
          setCityProvince((cityProvine) => [...cityProvine, element]);
        }
      });
    }
  }

  return (
    <>
      <div>
        <label for="province">استان : </label>
        <select
          id="province"
          className="province"
          onChange={(e) => handleSelectProvince(e)}
        >
          <option selected="selected" disabled={"disabled"}>
            استان
          </option>
          {provinceList &&
            provinceList.length > 0 &&
            provinceList.map((i, index) => (
              <option selected={i.id == province} value={i.id}>
                {i.parent == 0 && i.title}
              </option>
            ))}
        </select>
        {errorValidation && errorValidation.province && (
          <div className="error" id="error_validation">
            <span>{errorValidation.province}</span>
          </div>
        )}
      </div>

      <div>
        <label for="city">شهر : </label>
        <select
          disabled={province == 0 ? "disabled" : ""}
          id="city"
          className="city"
          onChange={(e) => handleSelectCity(e)}
        >
          <option selected disabled>
            شهر
          </option>
          {cityProvince &&
            cityProvince.length > 0 &&
            cityProvince.map((i, index) => (
              <option selected={i.id == city} value={i.id}>
                {i.parent != 0 && i.title}
              </option>
            ))}
        </select>
        {errorValidation && errorValidation.city && (
          <div className="error" id="error_validation">
            <span>{errorValidation.city}</span>
          </div>
        )}
      </div>
    </>
  );
}
