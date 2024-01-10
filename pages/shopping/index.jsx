import Shopping from "@/Components/Shopping/Shopping";
import axios from "axios";
import dynamic from "next/dynamic";

function index({response}){
    return(
        <>
          <Shopping response={response}/>
        </>
    )
}
export default dynamic(() => Promise.resolve(index), {
  ssr: false,
});

export async function getServerSideProps(router) {
  const request = {};
  const res = await axios
    .post("/api/market/shopping/index", request, {
      withCredentials: true,
      headers: {
        Cookie: router.req.headers.cookie,
      },
    })
    .then((resposne) => resposne.data);

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      response: res,
    },
  };
}