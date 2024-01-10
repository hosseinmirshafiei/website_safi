import ErrorMessgae from "@/Components/Error/ErrorMessage";
import SpinnerLoading from "@/Components/Spinner/SpinnerLoading";
import { post } from "@/http/http";
import useCreateComment from "./useCreateComment";
import React, { useState , useContext } from "react";
import { Context }   from "@/Components/Context/Context";
import LoginRegister from "@/Components/Header/LoginRegister/LoginRegister";
import CreateComment from "./CreateComment";

export default function NewCommentBtn({ product_id, comments, setComments }) {
  const [openCreateComment, setOpenCreateComment] = useState(0);
  const [openLogin , setOpenLogin] = useState(0)
  const { isLogin } = useContext(Context);
  var comment_id = null;

  function handleOpenCreateComment() {
    if(isLogin == 1){
      if (openCreateComment == 0) {
        setOpenCreateComment(1);
      } else {
        setOpenCreateComment(0);
      }
    }else{
      if(openLogin == 0){
         setOpenLogin(1);
      }else{
         setOpenLogin(0);
      }
    }
  }
  return (
    <>
      <div className="new_comment">
        <button
          className="btn_open_new_comment"
          onClick={() => handleOpenCreateComment()}
        >
          ثبت دیدگاه جدید
        </button>
        {openCreateComment == 1 && (
          <CreateComment
            comment_id={comment_id}
            product_id={product_id}
            setComments={setComments}
            comments={comments}
            setOpenCreateComment={setOpenCreateComment}
            handleOpenCreateComment={handleOpenCreateComment}
          />
        )}
      </div>

      {openLogin == 1 && (
        <LoginRegister modal={openLogin} setModal={setOpenLogin} />
      )}
    </>
  );
}
