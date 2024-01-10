import ProductItem from "../ProductItem/ProductItem";
export default function NewProducts({ response }) {
  return (
    <>
      {response.products.length > 0 && (
        <div className="products">
          <div className="label_products">
            <img src="/images/icon-book2.svg" alt=""  className="icon"/>
            <h2>آثار و تألیفات</h2>
          </div>
          {response.products.map((item, index) => (
            <ProductItem
              item={item}
              generalDiscount={response.general_discount}
              key={index}
              delivery={response.delivery}
            />
          ))}
        </div>
      )}
    </>
  );
}
