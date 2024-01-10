export function useErrorCatch({setErrorRes, setErrorCatch , setLoadSpinner , error , setLoginLimit , type}){

    setErrorRes(null);
    setErrorCatch([]);
    setLoadSpinner(0);

    var errorText = "";
    if(type == "login"){
       errorText = "شماره همراه باید شامل عدد باشد";
    }else if(type == "confirm"){
       errorText = "کد ورود باید شامل عدد باشد";
    }else if(type == "resend-otp"){
       errorText = "شماره همراه باید شامل عدد باشد";
    }

    if (error.response && error.response.status == 422) {
        setErrorCatch((errorCatch) => [...errorCatch, errorText]);
    } else {
      setErrorCatch(["لطفا اتصال اینترنت خود را بررسی نمایید."]);
    }
    if(type == "login" || type == "resend-otp"){
      setLoginLimit(0);
    }
}