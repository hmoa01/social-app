import React, { useEffect } from "react";
import PostService from "../../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import { storeAllPosts } from "../../store/postsSlice";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { posts, addRemoveLike, removePost } = useSelector(
    (state) => state.storePosts
  );

  let page = searchParams.get("page") ? searchParams.get("page") : 2;
  let limit = searchParams.get("limit") ? searchParams.get("limit") : 9;

  useEffect(() => {
    PostService.getAllPosts(page, limit)
      .then((res) => dispatch(storeAllPosts(res.data)))
      .catch((err) => console.log(err));
  }, [addRemoveLike, removePost, searchParams]);

  return (
    <div className="flex mt-[30px]">
      <div className="w-[700px] flex flex-col">
        <div className="grid grid-cols-3 gap-3">
          {posts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
        <Pagination />
      </div>
      <div className="w-[565px]  ">
        <div>SEARCH</div>
        <div>CREATE POST</div>
      </div>
    </div>
  );
};

export default Posts;
