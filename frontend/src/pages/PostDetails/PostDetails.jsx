import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../services/PostService";
import moment from "moment";
import CommentService from "../../services/CommentService";
import { toast } from "react-toastify";

const PostDetails = () => {
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState({
    isEdit: false,
    commentId: "",
  });
  const [post, setPost] = useState({});
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("sa_user"));

  useEffect(() => {
    PostService.getSinglePost(id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => console.log(error));
  });

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitNewComment = () => {
    CommentService.addNewComment(
      {
        body: newComment,
        user: user,
      },
      id
    )
      .then((res) => {
        toast.success("Comment successfully added!");
        setNewComment("");
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteComment = (id) => {
    CommentService.deleteComment(id)
      .then((res) => {
        toast.success("Comment deleted!");
      })
      .catch((error) => console.log(error));
  };

  const handleEditComment = (comment) => {
    setNewComment(comment.body);
    setEditComment({
      isEdit: true,
      commentId: comment._id,
    });
  };

  const handleSubmitEditComment = () => {
    CommentService.editComment(
      {
        body: newComment,
      },
      editComment.commentId
    )
      .then((res) => {
        console.log(res);
        setNewComment("");
        setEditComment({ isEdit: false });
        toast.success("Comment edited successfully!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex gap-4 p-5 border border-primary mt-[30px] md:w-[1380px] rounded-md">
      <div className="w-[50%]">
        <h1 className="text-3xl mt-[10px]">{post.title}</h1>
        <ul className="flex gap-2 mt-3 text-gray-500">
          {post.tags?.map((tag, i) => {
            return <li key={i}>#{tag.name}</li>;
          })}
        </ul>
        <p className="w-[600px] text-lg mt-5">{post.body}</p>
        <p className="mt-[10px] text-xl">
          Created by: {post.user?.firstName} {post.user?.lastName[0]}.
        </p>
        <span>{moment(post.createdAt).format("dddd, hA")}</span>
        <hr className="border border-gray-400 mt-3" />
        <h2 className="text-2xl mt-4">Write A Comment</h2>
        <div className="flex flex-col gap-5 mt-2">
          <input
            type="text"
            name="comment"
            onChange={handleComment}
            value={newComment}
            placeholder="Comment"
            className="h-[40px] p-2 text-xl border border-gray-500 rounded-md outline-none"
          />
          {!editComment.isEdit ? (
            <button
              type="button"
              onClick={handleSubmitNewComment}
              className="h-[35px] bg-primary text-white text-xl rounded-md"
            >
              Add Comment
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitEditComment}
              className="h-[35px] bg-primary text-white text-xl rounded-md"
            >
              Update comment
            </button>
          )}
          <div className="flex flex-col gap-3 overflow-y-scroll h-[300px]">
            {post.comments?.map((comment, i) => (
              <div
                key={i}
                className="border border-primary rounded-md p-[10px] w-[530px]"
              >
                <h1 className="font-bold text-lg">
                  {comment.user?.firstName} {comment.user?.lastName[0]}
                </h1>
                <p className="text-gray-500">
                  Posted:{" "}
                  <span className="text-primary">
                    {moment(comment.createdAt).format("dddd, hA")}
                  </span>
                </p>
                <p className="h-[50px] p-2 bg-gray-300 mb-[10px]">
                  {comment.body}
                </p>
                {comment.user.id === user._id ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-white bg-red-600 text-sm p-[5px] rounded-md"
                    >
                      DELETE
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditComment(comment)}
                      className="text-white bg-orange-500 text-sm p-[5px]  rounded-md"
                    >
                      EDIT
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <img className="rounded-lg" src={post.image} alt="imagePost"></img>
      </div>
    </div>
  );
};

export default PostDetails;
