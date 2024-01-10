

export default function CartBoxMobile({totalCartPrice , handleSubmitCart}){
    return (
      <>
        <div className="payment_box_mobile">
          <div className="info_parent">
            <div className="title">
              <span>جمع سبد خرید</span>
            </div>
            <div className="price_parent">
              <span className="price">
                {totalCartPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span className="toman">تومان</span>
            </div>
          </div>
          <div className="btn">
            <button onClick={() => handleSubmitCart()}>ثبت سفارش</button>
          </div>
        </div>
      </>
    );
}