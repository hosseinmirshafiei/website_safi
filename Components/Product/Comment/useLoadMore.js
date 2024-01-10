import { post } from "@/http/http"


export default function useLoadMore({
  comments,
  setComments,
  product,
  setLoadMoreCount,
  setLoad,
  load,
  setError
}) {
  function handleLoadMore() {
    if(load == 0){
        setLoad(1)
    var last_comment = comments[comments.length - 1];
    var request = { product_id: product.id, last_id: last_comment.id };
    post("/api/market/comment/load-more", request)
      .then((response) => {
        if (response.comments) {
          response.comments.map((comment) =>
            setComments((comments) => [...comments, comment])
          );
        }
        setLoad(0)
        setError(0);
        setLoadMoreCount(response.comments.length);
      })
      .catch((error) => {
        setLoad(0)
        setError(1)
      });
    }
  }
  return [handleLoadMore];
}