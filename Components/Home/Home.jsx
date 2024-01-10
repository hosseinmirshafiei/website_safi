import CategoryOffer from "./CategoryOffer/CategoryOffer";
import DiscountedProducts from "./DiscountedProducts/DiscountedProducts";
import NewProducts from "./NewProducts/NewProducts";
import SliderCarousel from "./Slider/SliderCarousel";

export default function Home({response}){
  
    return (
      <div className="home">
        {response && (
          <div>
            <h1>سامانه فروش آثار و تألیفات حضرت آیت اللّه العظمی صافی گلپایگانی</h1>
            <SliderCarousel slides={response.slider} />
            <NewProducts response={response} />
            <DiscountedProducts response={response} />
          </div>
        )}
      </div>
    );
}