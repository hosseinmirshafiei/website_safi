import React, { useState, useEffect, useRef } from "react";
import UrlBase from "@/http/UrlHttp";
import { post } from "@/http/http";
import SpinnerLoading from "../Spinner/SpinnerLoading";
import ImageUpload from "./ImageUpload";

export default function FileUpload({
  id,
  url,
  keyRequest,
  keyResponse,
  updateFile,
  ImageNameResponse,
  setImageNameResponse,
  placeholder,
  errorValidation,
  error,
}) {
  const [previewImage, setPreviewImage] = useState();
  const [imageLoader, setImageLoader] = useState(0); //0 => no upload , 1=> uploaded
  const [loaderDeleteImage, setLoaderDeleteImage] = useState(0);
  const [progressUpload, setProgressUpload] = useState(null);
  const [retryUpload, setRetryUpload] = useState(0);
  const [fileSave, setFileSave] = useState();
  const [errorValidationUploadFile, setErrorValidationUploadFile] = useState();
  const [showFileUpdated, setShowFileUpdated] = useState(1);

  const abortController = useRef(null);

  function handleUploadImage(file) {
    abortController.current = new AbortController(); //for cancel request
    var imageUpload = file[0];
    setFileSave(file);
    setProgressUpload(null);
    setPreviewImage(URL.createObjectURL(imageUpload));
    const formData = new FormData();
    formData.append(keyRequest, imageUpload);
    setImageLoader(1);
    setRetryUpload(0);
    setShowFileUpdated(0);
    post(url, formData, {
      signal: abortController.current.signal,
      withCredentials:true,
      onUploadProgress: (data) => {
        setProgressUpload(Math.round((data.loaded / data.total) * 100));
      },
    })
      .then((response) => {
        setImageLoader(0);
        setImageNameResponse(response[keyResponse]);
      })
      .catch((error) => {
        if (error.response && error.response.status == 422) {
          setErrorValidationUploadFile(error.response.data.errors);
        } else {
          setRetryUpload(1);
        }
      });
  }

  function handleDeleteImage() {
    abortController.current && abortController.current.abort();
    setPreviewImage();
    setLoaderDeleteImage(0);
    setErrorValidationUploadFile();
    setShowFileUpdated(1);
    if (updateFile) {
      setImageNameResponse(updateFile);
    } else {
      setImageNameResponse();
    }
  }
  return (
    <div className="file_upload_parent">
      <div className="input_parent">
        <label>{placeholder}</label>
        {previewImage && (
          <div>
            <div className="image_parent">
              {imageLoader == 0 && (
                <div className="success_upload_image_messgae">
                  <img src="success.svg" />
                </div>
              )}
              {retryUpload == 1 && (
                <div className="retry_upload_image">
                  <button onClick={() => handleUploadImage(fileSave)}>
                    تلاش دوباره
                  </button>
                </div>
              )}
              <img
                src={previewImage}
                className={
                  imageLoader == 0
                    ? "image_product_uploaded"
                    : "image_product_uploading"
                }
              />
              {progressUpload && imageLoader == 1 && retryUpload == 0 && (
                <div className="progress_upload_image_parent">
                  <div
                    className="progress_upload_image"
                    style={{ width: `${progressUpload}%` }}
                  >
                    {/* {progressUpload}% */}
                  </div>
                </div>
              )}
              <div className="delete_image_btn">
                <button onClick={() => handleDeleteImage()}>
                  <img src="delete3.svg" />
                </button>
              </div>
            </div>
          </div>
        )}
        {updateFile && showFileUpdated == 1 && (
          <div className="image_edit_uploaded_parent">
            <ImageUpload
              image={UrlBase + updateFile}
              alt={""}
              width={300}
              height={300}
            />
          </div>
        )}
        {!previewImage && (
          <div className="input_file_parent">
            <label htmlFor="input_file_upload" className="image_select">
              {placeholder}
            </label>
            <input
              accept="image/jpeg,image/png,image/jpeg"
              id="input_file_upload"
              className="input_image_upload"
              type="file"
              name="image"
              onChange={(e) => handleUploadImage(e.target.files)}
            />
          </div>
        )}

        {errorValidation &&
          error != null &&
          !ImageNameResponse &&
          error.map((item, index) => (
            <div id={id} className="error" key={index}>
              <span>{item}</span>
            </div>
          ))}

        {errorValidationUploadFile &&
          !ImageNameResponse &&
          errorValidationUploadFile.image.map((item, index) => (
            <div id={id} className="error" key={index}>
              <span>{item}</span>
            </div>
          ))}

        {loaderDeleteImage == 1 && <SpinnerLoading />}
      </div>
    </div>
  );
}
