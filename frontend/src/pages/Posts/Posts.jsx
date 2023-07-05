import React, { useEffect } from "react";
import PostService from "../../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import { storeAllPosts } from "../../store/postsSlice";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import SearchPost from "../../components/SearchPost/SearchPost";
import CreatePost from "../../components/CreatePost/CreatePost";

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { posts, addRemoveLike, removePost, createNewPost } = useSelector(
    (state) => state.storePosts
  );

  let page = searchParams.get("page") ? searchParams.get("page") : 2;
  let limit = searchParams.get("limit") ? searchParams.get("limit") : 9;
  let search = searchParams.get("q") ? searchParams.get("q") : null;

  useEffect(() => {
    if (search) {
      console.log("search, page, limit");
      console.log(search, page, limit);
      PostService.searchPost(search, page, limit)
        .then((res) => {
          console.log(res);
          dispatch(storeAllPosts({ posts: res.data, count: res.data.length }));
        })
        .catch((error) => console.log(error));
    } else {
      PostService.getAllPosts(page, limit)
        .then((res) => dispatch(storeAllPosts(res.data)))
        .catch((err) => console.log(err));
    }
  }, [addRemoveLike, removePost, createNewPost, searchParams]);

  return (
    <div className="flex flex-col 2xl:flex 2xl:flex-row  mt-[30px] gap-[20px]">
      <div className="w-[400px] md:w-[700px] md:flex flex flex-col">
        <div className="grid grid-cols-3 gap-3">
          {posts?.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
        <Pagination />
      </div>
      <div className="w-[565px]  ">
        <SearchPost />
        <CreatePost />
      </div>
    </div>
  );
};

export default Posts;
