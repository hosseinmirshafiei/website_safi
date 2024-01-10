import { post } from "@/http/http";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef , useContext} from "react";
import { Context } from "../Context/Context";
import SpinnerLoading from "../Spinner/SpinnerLoading";

export default function AddToCart({
  product,
  productColors,
  count,
  setCount,
  number,
  selectColor,
  selectSize,
  added,
  setAdded,
  countFinal,
  setCountFinal,
}) {
  const [limit, setLimit] = useState(0);
  const [productAttributeId, setProductAttributeId] = useState(0);
  const [loader, setLoader] = useState(0);
  const [changeCount, setChangeCount] = useState(0);
  const { cartContext, setCartContext } = useContext(Context);
  const router = useRouter()
  useEffect(() => {
    
    if (cartContext) {
      cartContext.forEach((element) => {
        setAdded((added) => [...added, parseInt(element.product_attribute_id)]);
        setCount((count) => [...count, {"product_attribute_id": parseInt(element.product_attribute_id) , "count" : parseInt(element.number)}]);
      });
      console.log(cartContext)
    }else{
      setCartContext()
      setAdded([])
      setCount([])
    }
  }, [cartContext]);

  useEffect(() => {
    var count_find = count.find(
      ({ product_attribute_id }) => product_attribute_id === productAttributeId
    );
    console.log(productAttributeId)
    if (count_find) {
      setCountFinal(count_find.count);
    } else {
      setCountFinal(1);
    }
  }, [changeCount, productAttributeId , count]);

  useEffect(() => {
    handleProductAttributeId();
    setLimit(0);
  }, [selectSize, selectColor]);

  function handleProductAttributeId() {
    var product_attribute_id = 0;
    if (selectColor || selectSize) {
      if (selectSize && selectColor == "noColors") {
        product_attribute_id = selectSize.id;
      } else if (selectSize && !selectColor) {
        product_attribute_id = selectSize.id;
      } else if (selectColor && selectColor != "noColors") {
        product_attribute_id = selectColor.id;
      } else{
        productColors.forEach((element) => {
          if (
            element.color_id == null &&
            element.size_id == null &&
            element.status == 1
          ) {
            product_attribute_id = element.id;
          }
        });
      }
    } 
    setProductAttributeId(parseInt(product_attribute_id));
  }

  function handleCount(type, add_to_cart) {
    var count_plus = count;
    var count_find = count_plus.find(
      ({ product_attribute_id }) => product_attribute_id === productAttributeId
    );
    if (count_find && !add_to_cart) {
      count_plus.forEach((element) => {
        if (element.product_attribute_id == count_find.product_attribute_id) {
          if (type == "plus" && count_find.count < number) {
            handleRemoveOfAddedList();
            element.count = element.count + 1;
          } else if (type == "down" && count_find.count > 1) {
            handleRemoveOfAddedList();
            element.count = element.count - 1;
          }
        }
      });
      setCount(count_plus);
      setChangeCount(changeCount + 1);
    } else {
      if (type == "plus" && number >= 2) {
        setCount((count) => [
          ...count,
          {
            product_attribute_id: productAttributeId,
            count: add_to_cart ? 1 : 2,
          },
        ]);
        setChangeCount(changeCount + 1);
      }
    }
    if (countFinal == number && !add_to_cart) {
      setLimit(1);
    }
  }

  function handleRemoveOfAddedList() {
    if (added.includes(productAttributeId)) {
      var added_filtered = added.filter(function (item) {
        return item !== productAttributeId;
      });
      setAdded(added_filtered);
    }
  }

  function handlePlus() {
    handleCount("plus");
  }
  function handleDown() {
    handleCount("down");
  }

  function handleAddtoCart() {
    if (!added.includes(productAttributeId) && loader == 0) {
      setLoader(1);
      var request = {
        product_id: product.id,
        product_attribute_id: productAttributeId,
        number: countFinal,
      };
      post("/api/market/cart/create", request)
        .then((response) => {
          if (!added.includes(productAttributeId)) {
            var new_added = added;
            new_added = [...new_added, productAttributeId];
            setAdded(new_added);
          }
          handleCount("plus", "add_to_cart");
          setLoader(0);
          setCartContext(response.cart)
        })
        .catch((error) => {
          setLoader(0);
        });
    } else if(added.includes(productAttributeId) && loader == 0){

      router.push("/cart")
    }
  }
  useEffect(()=>{
    console.log(selectColor)
     console.log(selectSize);
  },[])

  return (
    <>
      <div className="add_to_cart_parent">
        <button className="plus" onClick={() => handlePlus()}>
          +
        </button>
        <div className="count">{countFinal}</div>
        <button className="down" onClick={() => handleDown()}>
          -
        </button>
        <button
          className={
            !added.includes(productAttributeId)
              ? "add_to_cart_btn"
              : "add_to_cart_btn added"
          }
          onClick={() => handleAddtoCart()}
        >
          {!added.includes(productAttributeId)
            ? "افزودن به سبد خرید"
            : "در سبد خرید شما"}
        </button>
        {limit == 1 && (
          <div className="limit_number">
            حداکثر {number} عدد از این محصول قابل خرید است.
          </div>
        )}
      </div>

      {loader == 1 && <SpinnerLoading />}
    </>
  );
}
