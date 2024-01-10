

export default function Entesharat({product}){



    return(
    <div className="entesharat">
     <div className="row">
          <label>
            ناشر: 
          </label>
          <span>{product.entesharat && product.entesharat != null && product.entesharat}</span>
     </div>

     <div className="row">
          <label>
            مؤلّف: 
          </label>
          <span>حضرت آیت اللّه العظمی صافی گلپایگانی</span>
     </div>
    </div>
    )
}