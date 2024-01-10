import { Context } from "@/Components/Context/Context";
import Wallet from "@/Components/Wallet/Wallet";
import React, { useState, useEffect, useContext } from "react";

export default function WalletIcon() {
  const [showWallet, setShowWallet] = useState(0);
  const {isLogin} = useContext(Context)
  function handleShowWallet() {
    if(showWallet == 1){
      setShowWallet(0);
    }else{
      setShowWallet(1);
    }
  }
  return (
    <>
      {isLogin == true && (
        <>
          <div className="wallet_icon" onClick={() => handleShowWallet()}>
            <img src="../wallet-menu.svg" />
          </div>
          {showWallet == 1 && (
            <Wallet
              showWallet={showWallet}
              setShowWallet={setShowWallet}
              handleShowWallet={handleShowWallet}
            />
          )}
        </>
      )}
    </>
  );
}
