import Logout from "@/Components/Logout/Logout";
import React, { useState, useEffect, useRef , useContext } from "react";
import { Context } from "../../Context/Context";
import MiniProfile from "../Profile/MiniProfile";
import LoginRegister from "./LoginRegister";

export default function LoginRegisterBtn() {
  const [modal, setModal] = useState(0);
  const [profile , setProfile]= useState(0)
  const {isLogin , setIsLogin} = useContext(Context)
  const [showModalLogout, setShowModalLogOut] = useState(0);

  const profileRef = useRef()

  useEffect(() => {
    document.addEventListener("click", outsideClick, true);
    return () => {
      //cleanup
      document.removeEventListener("click", outsideClick, true);
    };
  }, [profile]);

  function handleShowLoginRegister() {
    if(modal == 0){
      setModal(1)
    }else{
      setModal(0)
    }
  }

  function handleProfile(){
    if(profile==0){
      setProfile(1)
    }else{
      setProfile(0)
    }
  }

    function outsideClick(e) {
      if (profile == 1) {
        if (!profileRef.current.contains(e.target)) {
          setProfile(0);
        }
      }
    }

    function handleLogOutModal() {
      if (showModalLogout == 0) {
        setShowModalLogOut(1);
        setProfile(0)
      } else {
        setShowModalLogOut(0);
      }
    }

  return (
    <>
      {isLogin == false ? (
        <div
          className="login_register_parent"
          onClick={() => handleShowLoginRegister()}
        >
          <button className="login_register_btn">ورود | ثبت نام</button>
        </div>
      ) : (
        <div className="avatar_parent" ref={profileRef}>
          <button className="avatar" onClick={() => handleProfile()}>
            <img src="../avatar-menu.svg" alt="" />
          </button>

          <MiniProfile handleLogOutModal={handleLogOutModal} profile={profile} setProfile={setProfile}/>

        </div>
      )}
      {modal == 1 && (
        <LoginRegister
          modal={modal}
          setModal={setModal}
        />
      )}
      {showModalLogout == 1 && (
        <Logout
          handleLogOutModal={handleLogOutModal}
          showModalLogout={showModalLogout}
          setShowModalLogOut={setShowModalLogOut}
        />
      )}
    </>
  );
}
