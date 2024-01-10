import UrlBase from "@/http/UrlHttp";

export default function Info({ product , brand }) {
  return (
    <>
      {product && (
        <div className="info">
          {brand && (
            <div className="brand">
              {brand.logo && (
                <div className="brand_image">
                  <img src={UrlBase + brand.logo} alt={brand.persian_name} />
                </div>
              )}
            </div>
          )}
          <div className="name_parent">
            <h1 className="name">{product.name}</h1>
          </div>
        </div>
      )}
    </>
  );
}
