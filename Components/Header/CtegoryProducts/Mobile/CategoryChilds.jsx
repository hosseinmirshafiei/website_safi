import { useRouter } from "next/router";
import CategoryMobileItem from "./CategoryMobileItem";

export default function CategoryChilds({item , categoryChilds}){

    const router = useRouter()

    function handleGoToLink(){
     router.push("/products/"+item.slug)
    }
    return (
      <>
        <div className="childes_content">
            <button className="item all" onClick={()=>handleGoToLink()}>همه موارد در این دسته</button>
            {
            categoryChilds.map((item, index) => (
              <CategoryMobileItem item={item} />
            ))}
        </div>
      </>
    );
}