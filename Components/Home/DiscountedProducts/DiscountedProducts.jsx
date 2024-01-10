import ProductItem from "../ProductItem/ProductItem";
export default function DiscountedProducts({ response }) {
  return (
    <>
      {response.productsDiscounted.length > 0 && (
      <div className="products">
        <div className="label_products">
          <h2>تألیفات همراه با تخفیف</h2>
        </div>
        {response.productsDiscounted.map((item, index) => (
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
