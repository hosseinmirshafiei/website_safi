
import React, { useState , useRef , useContext } from "react";
import { Context } from "@/Components/Context/Context";
import LoginRegister from "@/Components/Header/LoginRegister/LoginRegister";
import CreateComment from "./CreateComment";

export default function ReplyCommentBtn({
  item,
  product_id,
  comment_id,
  comments,
  setComments,
  updateList,
  setUpdateList,
}) {
  const [openCreateComment, setOpenCreateComment] = useState(0);
  const [openLogin, setOpenLogin] = useState(0);
  const { isLogin } = useContext(Context);

  function handleOpenCreateComment() {
    if (isLogin == 1) {
      if (openCreateComment == 0) {
        setOpenCreateComment(1);
      } else {
        setOpenCreateComment(0);
      }
    } else {
      if (openLogin == 0) {
        setOpenLogin(1);
      } else {
        setOpenLogin(0);
      }
    }
  }

  return (
    <>
      <div className="replyComment">
        <button
          className="btn_open_reply_comment"
          onClick={() => handleOpenCreateComment()}
        >
          پاسخ
        </button>
        {openCreateComment == 1 && (
          <CreateComment
            item={item}
            comment_id={comment_id}
            product_id={product_id}
            comments={comments}
            setComments={setComments}
            setOpenCreateComment={setOpenCreateComment}
            handleOpenCreateComment={handleOpenCreateComment}
            updateList={updateList}
            setUpdateList={setUpdateList}
          />
        )}
      </div>
      {openLogin == 1 && (
        <LoginRegister modal={openLogin} setModal={setOpenLogin} />
      )}
    </>
  );
}
