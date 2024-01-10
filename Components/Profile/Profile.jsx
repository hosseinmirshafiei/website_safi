
import React, { useState, useContext, useRef, useEffect } from "react";
import UrlBase from "@/http/UrlHttp";
import { Context } from "../Context/Context";
import ErrorMessgae from "../Error/ErrorMessage";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import FileUpload from "../FileUpload/FileUpload";
import { post } from "@/http/http";
import Success from "../Success/Success";

export default function Profile({response}) {
  const [profile , setProfile]=useState()
  const { userContext, setUserContext } = useContext(Context);
  const [ImageNameResponse, setImageNameResponse] = useState();
  const [errorValidation, setErrorValidation] = useState();
  const [error , setError] = useState(0)
  const [success , setSuccess] = useState(0)
  const [load, setLoad] = useState(0);

  const name = useRef();

  useEffect(() => {
    if (response && response.user) {
      setImageNameResponse(response.user.image);
      setProfile(response.user);
      setUserContext(response.user)
    }
  }, [response]);

  function handleEdit() {
    if (load == 0) {
      setLoad(1);
      var request = { name: name.current.value, image: ImageNameResponse };
      post("/api/market/profile/edit", request)
        .then((response) => {
          setLoad(0);
          setErrorValidation();
          setError(0)
          if(userContext){
            var user = response.user;
            setUserContext(user);
          }
          setSuccess(1)
        })
        .catch((error) => {
          setLoad(0);
          setSuccess(0);
          if (error.response.status == 422) {
            setErrorValidation(error.response.data.errors);
            console.log(error.response.data.errors);
            setError(0)
          }else{
            setError(1)
          }
        });
    }
  }
  return (
    <>
      <div className="form_page">
        <div className="profile">
          <div className="content">
            {profile && (
              <div className="info">
                <div className="name_mobile_parent">
                  {userContext && userContext.name && (
                    <div className="name_parent">
                      <span className="title">نام کاربری: </span>
                      <span className="name">{userContext.name}</span>
                    </div>
                  )}
                  <div className="mobile_parent">
                    <span className="title">شماره همراه: </span>
                    <span className="mobile">{profile.mobile}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="file_upload">
              <FileUpload
                id={"error_validation"}
                url={"/api/market/profile/upload-image"}
                keyRequest={"image"}
                keyResponse={"image"}
                updateFile={profile && profile.image && profile.image}
                ImageNameResponse={ImageNameResponse}
                setImageNameResponse={setImageNameResponse}
                placeholder={"ویرایش تصویر پروفایل"}
                setErrorValidation={setErrorValidation}
                errorValidation={errorValidation}
                error={
                  errorValidation && errorValidation.image
                    ? errorValidation.image
                    : null
                }
              />
            </div>
            <div className="name_input">
              <label>نام کاربری</label>
              <label className="notic">
                (شما می توانید از حروف انگلیسی و اعداد و آندرلاین و نقطه استفاده
                نمایید.)
              </label>
              <input
                type="text"
                name="name"
                placeholder="نام کاربری"
                ref={name}
                defaultValue={profile && profile.name && profile.name}
              />
              {errorValidation &&
                errorValidation.name &&
                errorValidation.name.map((item, index) => (
                  <div className="error_validation" key={index}>
                    {item}
                  </div>
                ))}
            </div>
          </div>
          <div className="btn">
            <button onClick={() => handleEdit()}>ثبت تغییرات</button>
          </div>
        </div>
      </div>
      {load == 1 && <SpinnerLoading />}
      {error == 1 &&
       <ErrorMessgae setError={setError}/>
      }
      {success == 1 && 
      <Success setSuccess={setSuccess}/>
      }
    </>
  );
}
