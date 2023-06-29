import React from "react";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Card = ({ post }) => {
  let user = JSON.parse(localStorage.getItem("sa_user"));
  return (
    <div className="flex flex-col rounded-md overflow-hidden border border-primary">
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-20" />
        <img
          src={post.image}
          alt="img"
          className="h-[150px] w-full object-cover"
        />
        <div className="text-white absolute left-2 top-2">
          <p>
            {post.user.firstName} {post.user.lastName}
          </p>
          <p>{moment(post.createdAt).format("MMM Do YY")}</p>
        </div>
      </div>
      <div className="p-[2px] grow flex flex-col justify-between">
        <ul className="flex gap-1">
          {post.tags.map((tag, i) => (
            <li key={i} className="text-gray-600">
              #{tag.name}
            </li>
          ))}
        </ul>
        <h4 className="font-bold">{post.title}</h4>
        <p>{post.body.substring(0, 50)}...</p>
        <div className="flex justify-between p-1">
          <div className="flex gap-2 items-center text-primary">
            <AiOutlineLike className="text-xl" />
            {post.likeInfo?.userId.length}
          </div>
          {post._id === user._id ? (
            <div className="flex items-center gap-2 text-red-600">
              REMOVE
              <RiDeleteBin6Line className="text-xl" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
