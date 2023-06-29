import React, { useEffect } from "react";
import PostService from "../../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import { storeAllPosts } from "../../store/postsSlice";
import Card from "../../components/Card/Card";

const Posts = () => {
  const dispatch = useDispatch();

  const { posts, addRemoveLike } = useSelector((state) => state.storePosts);
  console.log(posts);

  useEffect(() => {
    PostService.getAllPosts()
      .then((res) => dispatch(storeAllPosts(res.data)))
      .catch((err) => console.log(err));
  }, [addRemoveLike]);

  return (
    <div className="flex mt-[30px]">
      <div className="w-[700px] flex flex-col">
        <div className="grid grid-cols-3 gap-3">
          {posts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
        <div>PAGINATION</div>
      </div>
      <div className="w-[565px]  ">
        <div>SEARCH</div>
        <div>CREATE POST</div>
      </div>
    </div>
  );
};

export default Posts;
