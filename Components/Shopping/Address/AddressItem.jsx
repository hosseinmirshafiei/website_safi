import { post } from '@/http/http';
import React, { useRef, useState , useEffect } from 'react';
import ErrorMessgae from '../../Error/ErrorMessage';
import SpinnerLoading from '../../Spinner/SpinnerLoading';
export default function AddressItem({item , itemUpdate , setItemUpdate ,showUpdateAddress , setShowUpdateAddress , setShowAllAddress ,setShowCreateAddress , setAddressActive, setAddress}) {

    const [load , setLoad] = useState(0)
    const [errorConnection , setErrorConnection] = useState(0)

    function handleUpdateAddress(){
    
     setShowUpdateAddress(1)
     setShowCreateAddress(0)
     setShowAllAddress(0)
     setItemUpdate(item)
    
    }

    function handleSwitchAddress(){

        if(load==0){
        setLoad(1)
        var request = {"id": item.id}
        post("/api/market/address/switch" , request)
        .then(response=>{
         setLoad(0)
         setErrorConnection(0)
         setAddress(response.address)
         setAddressActive(response.address_active)
         setShowAllAddress(0)
        })
        .catch(error=>{
         setLoad(0)
         setErrorConnection(1)
        })

    }
    }

    return (
      <div>
        <div className="item_parent">
          <div className="item">
            <div className="address_parent">
              <div className="active_address">
                {item.active == 1 ? (
                  <button className="active"></button>
                ) : (
                  <button
                    className="no_active"
                    onClick={() => handleSwitchAddress()}
                  ></button>
                )}
              </div>
              <div className="address">
                <p>{item.address}</p>
              </div>
            </div>
            <div className="mobile">
              <span>{item.mobile}</span>
            </div>
            <div className="name">
              <span>{item.first_name}</span> <span>{item.last_name}</span>
            </div>

            <div className="update_btn">
              <button onClick={() => handleUpdateAddress()}>ویرایش</button>
            </div>
          </div>
        </div>
        {errorConnection == 1 && <ErrorMessgae setError={setErrorConnection} />}
        {load == 1 && <SpinnerLoading />}
      </div>
    );
}


