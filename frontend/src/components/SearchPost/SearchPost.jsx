import React, { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeAllPosts } from "../../store/postsSlice";

const SearchPost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleSearchTerm = (e) => {
    setSearchParams({ q: e.target.value });
    setSearchTerm(e.target.value);
  };

  const handleSubmitSearch = () => {
    PostService.searchPost(searchTerm)
      .then((res) => {
        console.log(res);
        dispatch(storeAllPosts({ posts: res.data, count: res.data.count }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col gap-3 p-5 border border-primary rounded-md">
      <input
        className="p-2 h-[50px] border border-gray-500 rounded-md"
        type="text"
        name="searchPost"
        placeholder="Search Memories"
        onChange={handleSearchTerm}
        value={searchTerm}
      ></input>
      <button
        onClick={handleSubmitSearch}
        className="bg-primary text-white p-1 rounded-md text-lg"
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchPost;
