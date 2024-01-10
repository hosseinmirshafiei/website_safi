import HeadTag from "@/Components/HeadTag/HeadTag";
import { post } from "@/http/http";

export default function biography({ response }) {
  function description() {
    if (response) {
      return { __html: response.description };
    }
  }
  return (
    <>
      <HeadTag title={response.title} metaDescription={response.title} />
      <div className="biography">
        <h1>{response.title}</h1>
        <h2>{response.title}</h2>
        <div
          className="description"
          dangerouslySetInnerHTML={description()}
        ></div>
      </div>
    </>
  );
}

export async function getServerSideProps(router) {
  const request = {};
  const res = await post("/api/market/biography/index", request);

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
