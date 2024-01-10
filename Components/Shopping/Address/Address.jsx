import { post } from "@/http/http";
import React, { useRef, useState, useEffect } from "react";
import ErrorMessgae from "../../Error/ErrorMessage";
import SpinnerLoading from "../../Spinner/SpinnerLoading";
import AddressItem from "./AddressItem";
import CreateAddress from "./CreateAddress";
import UpdateAddress from "./UpdateAddress";

export default function Address({
  address,
  setAddress,
  addressActive,
  setAddressActive,
  provinceCities,
}) {
  const [load, setLoad] = useState(0);
  const [showAllAddress, setShowAllAddress] = useState(0);
  const [showCreateAddress, setShowCreateAddress] = useState(0);
  const [showUpdateAddress, setShowUpdateAddress] = useState();
  const [emptyAddress, setEmptyAddress] = useState(null);
  const [itemUpdate, setItemUpdate] = useState(0);

  useEffect(() => {
    if (address && address.length <= 0) {
      setShowCreateAddress(1);
    }
  }, []);

  function handleShowCreateProfile() {
    setShowAllAddress(0);
    setShowCreateAddress(1);
  }

  function handleShowAllProfile() {
    setShowAllAddress(1);
    document.body.style["overflow-y"] = "hidden";
  }

  //////////
  useEffect(() => {
    if (
      showAllAddress == 1 ||
      showCreateAddress == 1 ||
      showUpdateAddress == 1
    ) {
      document.body.style["overflow-y"] = "hidden";
    } else {
      document.body.style["overflow-y"] = "scroll";
    }
  }, [showAllAddress, showCreateAddress, showUpdateAddress]);

  //////////
  return (
    <div className="profile_parent">
      {addressActive == null && emptyAddress == 1 && (
        <div>
          <div className="profile_create_parent">
            <CreateAddress
              address={address}
              emptyAddress={emptyAddress}
              setEmptyAddress={setEmptyAddress}
              setAddress={setAddress}
              addressActive={addressActive}
              setAddressActive={setAddressActive}
              setShowCreateAddress={setShowCreateAddress}
            />
          </div>
        </div>
      )}

      {addressActive && (
        <div className="profile_active_parent">
          <div className="profile_active_inner">
            <div className="title">
              <span>آدرس تحویل سفارش</span>
            </div>
            <div className="update">
              <button onClick={() => handleShowAllProfile()}>
                تغییر و ویرایش
              </button>
            </div>

            <div className="address">
              <span>{addressActive.address}</span>
            </div>
            <div className="name">
              <span>{addressActive.first_name}</span>{" "}
              <span>{addressActive.last_name}</span>
            </div>
          </div>
        </div>
      )}

      {address && showAllAddress == 1 && (
        <div className="profile_all_parent">
          <div className="profile_all_inner">
            <div className="tab">
              <div className="title">
                <span>انتخاب آدرس</span>
              </div>

              <button
                className="close_profile"
                onClick={() => setShowAllAddress(0)}
              >
                &#x2715;
              </button>
            </div>

            <div className="list">
              <div className="create">
                <button onClick={() => handleShowCreateProfile()}>
                  افزودن آدرس جدید
                </button>
              </div>

              <div className="list_profile">
                {address &&
                  address.map((item, index) => (
                    <div key={index}>
                      <AddressItem
                        item={item}
                        itemUpdate={itemUpdate}
                        setItemUpdate={setItemUpdate}
                        setShowUpdateAddress={setShowUpdateAddress}
                        setShowAllAddress={setShowAllAddress}
                        setShowCreateAddress={setShowCreateAddress}
                        setAddressActive={setAddressActive}
                        setAddress={setAddress}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateAddress == 1 && (
        <div className="profile_create_parent">
          <CreateAddress
            address={address}
            emptyAddress={emptyAddress}
            setEmptyAddress={setEmptyAddress}
            setAddress={setAddress}
            addressActive={addressActive}
            setAddressActive={setAddressActive}
            setShowCreateAddress={setShowCreateAddress}
            provinceCities={provinceCities}
          />
        </div>
      )}

      {showUpdateAddress == 1 && (
        <UpdateAddress
          item={itemUpdate}
          showUpdateAddress={showUpdateAddress}
          setShowUpdateAddress={setShowUpdateAddress}
          setAddressActive={setAddressActive}
          setAddress={setAddress}
          provinceCities={provinceCities}
        />
      )}
    </div>
  );
}
