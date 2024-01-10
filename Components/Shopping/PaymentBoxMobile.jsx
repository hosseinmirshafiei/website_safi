

export default function PaymentBoxMobile({paymentWay , paymentPrice , handleSubmitShopping , handleWalletPayment}){
    return (
      <div className="payment_box_mobile">
        <div className="info_parent">
          {" "}
          <div className="title">
            <span>قابل پرداخت</span>
          </div>
          <div className="price_parent">
            <span className="price">
              {paymentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="toman">تومان</span>
          </div>
        </div>
        <div className="btn">
          {paymentWay == 1 && (
            <button onClick={() => handleSubmitShopping()}>پرداخت</button>
          )}
          {paymentWay == 2 && (
            <button onClick={() => handleWalletPayment()}>تأیید</button>
          )}
        </div>
      </div>
    );
}