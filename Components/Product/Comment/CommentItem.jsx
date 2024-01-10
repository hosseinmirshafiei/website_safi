import ErrorMessgae from "@/Components/Error/ErrorMessage";
import UrlBase from "@/http/UrlHttp";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ReplyCommentBtn from "./ReplyCommentBtn";

export default function CommentItem({
  item,
  parent,
  product_id,
  comments,
  setComments,
  updateList,
  setUpdateList,
}) {
  const [showAnswers, setShowAnswers] = useState(0);

  function commentBody() {
    if (item) {
      return { __html: item.body };
    }
  }
  function handleShowAnswers() {
    if (showAnswers == 0) {
      setShowAnswers(1);
    } else {
      setShowAnswers(0);
    }
  }
  return (
    <div>
      {item && (
        <div className="comment">
          {item.status == 0 && (
            <div className="status">
              <span>در انتظار تأیید</span>
            </div>
          )}
          <span className="date">
            {new Date(item.updated_at).toLocaleDateString("fa-IR")}
          </span>
          <img
            className={
              item.comment_id == null
                ? "image_comment_parent"
                : "image_comment_child"
            }
            src={
              item.user && item.user.image
                ? UrlBase + item.user.image
                : "/images/avatar.png"
            }
          />
          <div
            className={
              item.comment_id == null ? "user_name_parent" : "user_name_child"
            }
          >
            {item.user && item.user.name != null && item.user.name}
          </div>

          <div className="body_comment_parent">
            {parent && (
              <div className="parent_name_comment">{parent.user.name}@</div>
            )}
            <div className="body" dangerouslySetInnerHTML={commentBody()}></div>
          </div>

          {item.childs.length > 0 && (
            <div className="replies">
              <button
                className="bnt_show_answers"
                onClick={() => handleShowAnswers()}
              >
                {showAnswers == 0 ? (
                  <span> مشاهده پاسخ ها</span>
                ) : (
                  <span> مخفی کردن پاسخ ها</span>
                )}
              </button>
            </div>
          )}
          <ReplyCommentBtn
            comments={comments}
            setComments={setComments}
            item={item}
            comment_id={item.id}
            product_id={product_id}
            updateList={updateList}
            setUpdateList={setUpdateList}
          />
        </div>
      )}

      {item && item.childs && item.childs.length > 0 && (
        <div className="childs">
          {item.childs.map((item_child, index) => (
            <div
              className={showAnswers == 0 ? "hidden" : "show"}
              key={item_child.id}
            >
              <CommentItem
                item={item_child}
                parent={item}
                product_id={product_id}
                comments={comments}
                setComments={setComments}
                updateList={updateList}
                setUpdateList={setUpdateList}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
