import useCreateComment from "./useCreateComment";
import React, { useState, useRef, useContext } from "react";
import SpinnerLoading from "@/Components/Spinner/SpinnerLoading";
import ErrorMessgae from "@/Components/Error/ErrorMessage";
export default function CreateComment({
  item,
  product_id,
  comment_id,
  comments,
  setComments,
  setOpenCreateComment,
  handleOpenCreateComment,
  updateList,
  setUpdateList
}) {
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState(0);
  const [create] = useCreateComment({
    item,
    product_id,
    comment_id,
    comments,
    setComments,
    comment,
    setOpenCreateComment,
    setError,
    loading,
    setLoading,
    updateList,
    setUpdateList,
  });

  function handleComment(e) {
    setComment(e.target.value);
  }
  function commentBody() {
    if (item) {
      return { __html: item.body };
    }
  }

  return (
    <>
      <div className="create_comment_parent">
        <div className="create_comment">
          <div className="content">
            <h3 className="title">ارسال دیدگاه</h3>
            <div className="body" dangerouslySetInnerHTML={commentBody()}></div>
            <textarea
              placeholder="دیدگاه شما"
              onChange={(e) => handleComment(e)}
            />
            <div className="btns">
              <button
                className="close_btn"
                onClick={() => handleOpenCreateComment()}
              >
                انصراف
              </button>
              <button
                className={
                  comment && comment.length > 0
                    ? "create_btn"
                    : "create_btn disabled"
                }
                onClick={() => create()}
              >
                ثبت دیدگاه
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading == 1 && <SpinnerLoading />}
      {error == 1 && <ErrorMessgae setError={setError} />}
    </>
  );
}