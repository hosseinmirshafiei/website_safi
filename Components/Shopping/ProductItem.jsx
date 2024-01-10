import UrlBase from "@/http/UrlHttp";
import ImageProduct from "./ImageProduct";


export default function ProductItem({item}){

    return (
      <>
        <div className="item">
          <div className="image">
            <ImageProduct
              image={item.product.image}
              alt={item.name}
              width={100}
              height={100}
            />
          </div>

          <div className="number">
            <span>{item.number}</span>
          </div>

          {item.attribute.color && (
            <div className="color_parent">
              <div
                className="color"
                style={{ background: item.attribute.color.color }}
              ></div>
              <div className="color_name">
                <span>{item.attribute.color.name}</span>
              </div>
            </div>
          )}
          {item.attribute.size && (
            <div className="size_parent">
              <div className="title">
                <span>سایز</span>
              </div>
              <div className="size">
                <span>{item.attribute.size.size}</span>
              </div>
            </div>
          )}
        </div>
      </>
    );
}