import React, { useState } from "react";

const SearchPost = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitSearch = () => {
    console.log(searchTerm);
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
